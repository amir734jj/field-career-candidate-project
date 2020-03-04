import {createObjectCsvStringifier} from "csv-writer";

const csvWriterInstance = createObjectCsvStringifier({
	header: [
		{ id: "ticker", title: "Ticker"},
		{ id: "volAvg", title: "Quantity"},
		{ id: "price", title: "Current Price"},
		{ id: "hi", title: "High"},
		{ id: "low", title: "Low"},
		{ id: "mktCap", title: "Current Value"},
		{ id: "companyName", title: "Company Name"},
		{ id: "industry", title: "Industry"}
	],
});

export const csvWriter = (records: {}[]) => [csvWriterInstance.getHeaderString(), csvWriterInstance.stringifyRecords(records)].join("");
