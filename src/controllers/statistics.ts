import express from "express";
import {resolveMarketStatistics} from "../logic/statistics";
import {csvWriter} from "../logic/csv";
import * as stream from "stream";

const router = express.Router();

router.get("/", (req, res) => {
	res.render("statistics");
});

router.post("/", async (req, res) => {
	const records = await resolveMarketStatistics(req.body["tickers"]);
	const csv = csvWriter(records);
	const fileContents = Buffer.from(csv, "utf8");

	const readStream = new stream.PassThrough();
	readStream.end(fileContents);

	res.set("Content-disposition", `attachment; filename=statistics-${new Date().toISOString()}.csv`);
	res.set("Content-Type", "text/plain");

	readStream.pipe(res);
});

export default router;
