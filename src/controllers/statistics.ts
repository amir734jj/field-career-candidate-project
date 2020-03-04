import express from "express";
import {resolveMarketStatistics} from "../logic/statistics";
import {csvWriter} from "../logic/csv";
import * as stream from "stream";
import logger from "../util/logger";

const router = express.Router();

router.get("/", (req, res) => {
	res.render("statistics");
});

router.post("/", async (req, res) => {
	const [records, sum] = await resolveMarketStatistics(req.body["tickers"]);
	const csv = csvWriter(records, sum);

	const fileContents = Buffer.from(csv, "utf8");

	const readStream = new stream.PassThrough();
	readStream.end(fileContents);

	res.set("Content-disposition", `attachment; filename=statistics-${new Date().toISOString()}.csv`);
	res.set("Content-Type", "text/plain");

	readStream.pipe(res);

	logger.info("Successfully downloaded market data");
});

export default router;
