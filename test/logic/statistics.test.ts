// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import factory from "autofixture";

import {fixtureMarketData as configureFixtureMarketData} from "../fixtures/data";

// Configure auto-fixture instance
configureFixtureMarketData(factory);

jest.mock("request-promise", () => ({
	__esModule: true,
	default: jest.fn(() => Promise.resolve(factory.createListOf("MarketData", 5)))
}));

import {resolveMarketStatistics} from "../../src/logic/statistics";

describe("Market Statistics", () => {
	it("Should return records", async () => {
		// Arrange, Act
		const [result] = await resolveMarketStatistics("GOOG");

		// Assert
		expect(result.length).toBe(5);
	});
});
