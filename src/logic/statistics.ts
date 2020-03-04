import * as _ from "lodash";
import {marketDataUrl} from "../config/statisticsConstants";
import request from "request-promise";
import {MarketStatisticsResultType} from "market.statistics";


export const resolveMarketStatistics = async (tickers: string): Promise<MarketStatisticsResultType> => {
	const requests = _.chain(tickers || "")
		.split(/(\r\n|\r|\n|,)+/g)
		.map(_.trim)
		.filter(_.identity)
		.uniq()
		.map(ticker => request(`${marketDataUrl}/${ticker}`, {json: true}))
		.value();

	// Await for all requests to finish
	const records = _.chain(await Promise.all(requests))
		.flatten()
		.filter(_.identity)
		.filter(x => _.has(x, "symbol") && _.has(x, "profile"))
		.map(x => ({
			...x["profile"],
			ticker: x["symbol"]
		}))
		.map(x => _.pick(x, "range", "volAvg", "ticker", "price", "companyName", "mktCap", "industry"))
		.map(x => ({
			...x,
			// Create low and hi columns from range
			low: _.chain(x).get("range", "").split("-").head().value(),
			hi: _.chain(x).get("range", "").split("-").last().value()
		}))
		.value();

	// Calculate total market cap
	const totalMarketCap = _.sum(_.map(records, "mktCap"));

	return [records, totalMarketCap];
};
