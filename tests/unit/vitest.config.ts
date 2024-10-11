import { defineConfig } from "vitest/config";

// eslint-disable-next-line @technologiestiftung/no-default-export
export default defineConfig({
	test: {
		include: ["./tests/unit/**/*.test.ts"],
	},
});
