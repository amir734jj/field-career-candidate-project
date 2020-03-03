import {createObjectCsvStringifier} from "csv-writer";

const csvWriterInstance = createObjectCsvStringifier({
	header: [
		{ id: "ticker", title: "TICKER"},
		{ id: "price", title: "PRICE"},
		{ id: "mktCap", title: "MARKET-CAP"},
		{ id: "companyName", title: "COMPANY-NAME"},
		{ id: "industry", title: "INDUSTRY"}
	],

});

export const csvWriter = (records: {}[]) => [csvWriterInstance.getHeaderString(), csvWriterInstance.stringifyRecords(records)].join("");
