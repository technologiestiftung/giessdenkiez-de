import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";

const PageNotFound: React.FC = () => {
	const i18n = useI18nStore().i18n();
	return <div className="mx-auto my-auto">{i18n.notFound.title}</div>;
};

export default PageNotFound;
