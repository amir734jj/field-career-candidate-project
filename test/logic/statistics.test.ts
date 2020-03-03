import * as mockery from "mockery";
import {resolveMarketStatistics} from "../../src/logic/statistics";
import * as Bluebird from "bluebird";

describe("Market Statistics", () => {

	beforeAll(() => {
		mockery.enable({
			warnOnReplace: false,
			warnOnUnregistered: false,
			useCleanCache: true
		});

		mockery.registerMock("request-promise", function () {
			return Bluebird.resolve("");
		});
	});

	afterEach(function (done) {
		mockery.disable();
		mockery.deregisterAll();
		done();
	});

	it("Should return records", async () => {
		resolveMarketStatistics(["GOOG"]);
	});
});
