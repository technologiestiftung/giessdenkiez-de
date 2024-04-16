import React from "react";
import { useUrlState } from "./store";

export const Search: React.FC = () => {
	const url = useUrlState((state) => state.url);
	return (
		<div>
			<p>current query: {url.searchParams}</p>
		</div>
	);
};
