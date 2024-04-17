export function replaceUrlSearchParam(url: URL, key: string, values: string[]) {
	const searchParams = url.searchParams;
	searchParams.delete(key);
	for (const value of values) {
		searchParams.append(key, value);
	}
	return searchParams;
}
