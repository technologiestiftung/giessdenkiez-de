import resolveConfig from "tailwindcss/resolveConfig";
//@ts-expect-error tailwindConfig has no type definition
import tailwindConfig from "../../../tailwind.config.js";
const fullConfig = resolveConfig(tailwindConfig);

export const densityLowColor = fullConfig.theme.colors["gdk-blue"];
export const densityHighColor = fullConfig.theme.colors["gdk-dark-blue"];
export const defaultLabelColor = fullConfig.theme.colors["gdk-dark-blue"];
export const indicatorLineColor = fullConfig.theme.colors["gdk-light-gray"];
export const defaultWaterFillColor = fullConfig.theme.colors["gdk-dark-blue"];
export const hoverWaterFillColor = fullConfig.theme.colors["gdk-light-blue"];
export const temperatureFillColor = fullConfig.theme.colors["gdk-dark-red"];
export const adoptionsFillColor = fullConfig.theme.colors["gdk-purple"];
export const speciesLabelColor = fullConfig.theme.colors["gdk-dark-green"];
export const speciesColors = [
	"#07964E",
	"#B6DD83",
	"#45AC95",
	"#237B5A",
	"#DEE25E",
	"#99B766",
	"#8E982C",
	"#7E7B22",
	"#CFB739",
	"#B1B89C",
	"#C3CC71",
	"#92B30E",
	"#B2A31B",
	"#DCBE72",
	"#879871",
	"#99B766",
	"#8E982C",
	"#7E7B22",
	"#CFB739",
	"#96A491",
];
