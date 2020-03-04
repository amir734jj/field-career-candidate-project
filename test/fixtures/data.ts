declare global {
	interface String {
		// auto-fixture library built-in method
		asNumber(): string;
	}
}

export const fixtureMarketData = (factory: { define: (arg0: string, arg1: string[]) => void }) => factory.define("MarketData", [
	"symbol",
	"profile",
	"price".asNumber(),
	"ticker",
	"companyName",
	"mktCap".asNumber(),
	"industry"
]);
