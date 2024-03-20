import { trackInteraction } from "./utils/matomo.ts";
import React from "react";

export const ExampleButtonTracking: React.FC = () => {
	return <button onClick={() => trackInteraction("click")}>Click me</button>;
};
