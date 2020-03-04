import * as _ from "lodash";
import {createObjectCsvStringifier} from "csv-writer";

const csvWriterInstance = createObjectCsvStringifier({
	header: [
		{id: "ticker", title: "Ticker"},
		{id: "volAvg", title: "Quantity"},
		{id: "price", title: "Current Price"},
		{id: "hi", title: "High"},
		{id: "low", title: "Low"},
		{id: "mktCap", title: "Current Value"}
	],
});

export const csvWriter = (records: {[key: string]: string}[], sum: number) => {
	// Append the last row
	const formattedRecords = records.map(x => ({
			...x,
			mktCap: `$${x["mktCap"]}`,
			price: `$${x["price"]}`,
			volAvg: `$${x["volAvg"]}`,
			low: `$`,
			hi: `$${_.chain(x).get("range", "").split("-").last().value()}`,
		}));

	const recordsSum: string[] = _.range(0, _.chain(records).head().size().value() - 1)
		.map(() => "")
		.concat([sum.toString()]);

	return [
		csvWriterInstance.getHeaderString(),
		csvWriterInstance.stringifyRecords(formattedRecords),
		csvWriterInstance.stringifyRecords([recordsSum])
	].join("");
};
