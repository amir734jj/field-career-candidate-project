import _ from "lodash";
import {createObjectCsvStringifier, createArrayCsvStringifier} from "csv-writer";

const header = [
	{id: "ticker", title: "Ticker"},
	{id: "volAvg", title: "Quantity"},
	{id: "price", title: "Current Price"},
	{id: "hi", title: "High"},
	{id: "low", title: "Low"},
	{id: "mktCap", title: "Current Value"}
];

const recordsToCsv = createObjectCsvStringifier({ header });
const arrayToCsv = createArrayCsvStringifier({ header: _.map(header, "id") });

export const csvWriter = (records: { [key: string]: string }[], sum: number) => {
	// Append the last row
	const formattedRecords = records.map(x => ({
		...x,
		mktCap: `$${x["mktCap"]}`,
		price: `$${x["price"]}`,
		volAvg: `$${x["volAvg"]}`,
		low: `$${x["low"]}`,
		hi: `$${x["hi"]}`
	}));

	const recordsSum: string[] = _.range(0, _.size(header) - 1)
		.map(() => "")
		.concat([`$${sum}`]);

	return [
		recordsToCsv.getHeaderString(),
		recordsToCsv.stringifyRecords(formattedRecords),
		arrayToCsv.stringifyRecords([recordsSum])
	].join("");
};
