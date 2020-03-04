import * as _ from "lodash";
import {marketDataUrl} from "../config/statisticsConstants";
import request from "request-promise";


export const resolveMarketStatistics = async (tickers: string) => {
	const requests = _.chain(tickers || "")
		.split(/(\r\n|\r|\n|,)+/g)
		.map(_.trim)
		.filter(_.identity)
		.uniq()
		.map(ticker => request(`${marketDataUrl}/${ticker}`, {json: true}))
		.value();

	return _.chain(await Promise.all(requests))
		.flatten()
		.filter(_.identity)
		.filter(x => _.has(x, "symbol") && _.has(x, "profile"))
		.map(x => ({
			...x["profile"],
			ticker: x["symbol"]
		}))
		.map(x => ({
			...x,
			low: _.chain(x).get("range", "").split("-").head().value(),
		  hi: _.chain(x).get("range", "").split("-").last().value(),
		}))
		.map(x => _.pick(x, "low", "hi", "volAvg", "ticker", "price", "companyName", "mktCap", "industry"))
		.value();
};
