import * as _ from "lodash";
import request from "request-promise";
import {marketDataUrl} from "../config/statisticsConstants";


export const resolveMarketStatistics = async (tickers: string[]) => {
	const requests = _.chain(tickers || "")
		.split(/(\r\n|\r|\n|,)+/g)
		.map(_.trim)
		.filter(_.identity)
		.uniq()
		.map(ticker => request(`${marketDataUrl}/${ticker}`, {json: true}))
		.value();

	return _.chain(await Promise.all(requests))
		.filter(_.identity)
		.filter(x => _.has(x, "symbol") && _.has(x, "profile"))
		.map(x => ({
			...x["profile"],
			ticker: x["symbol"]
		}))
		.map(x => _.pick(x, "ticker", "price", "companyName", "mktCap", "industry"))
		.value();
};
