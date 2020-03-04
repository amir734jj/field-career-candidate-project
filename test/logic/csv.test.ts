// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import factory from "autofixture";

import {fixtureMarketData as configureFixtureMarketData} from "../fixtures/data";

// Configure auto-fixture instance
configureFixtureMarketData(factory);

import {csvWriter} from "../../src/logic/csv";

describe("GET /", () => {
    it("Should return 5 + 1 lines of CSV", () => {
	    // Arrange
    	const records = factory.createListOf("MarketData", 5);

    	// Act
      const csv = csvWriter(records, 10);

      // Assert
      expect(csv.length).not.toBe(0);
      expect(csv.trim().split(/\r|\n/).length).toBe(5 + 1 + 1);
    });
});
