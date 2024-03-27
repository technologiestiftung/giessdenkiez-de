/* eslint-disable max-lines */
import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "../../../auth/auth-store";
import { useErrorStore } from "../../../error/error-store";
import { useI18nStore } from "../../../i18n/i18n-store";
import { supabaseClient } from "../../../auth/supabase-client";

export interface TreeAdoptState {
	isLoading: boolean;
	isAdopted: boolean;
	adoptedByOthers: boolean;
	adoptTree: () => Promise<void>;
	unadoptTree: () => Promise<void>;
}

export function useAdoptTree(treeId: string): TreeAdoptState {
	const i18n = useI18nStore().i18n();

	const handleError = useErrorStore().handleError;

	const access_token = useAuthStore((store) => store).session?.access_token;
	const user = useAuthStore((store) => store).session?.user;
	const { adoptedTrees, refreshAdoptedTreesInfo, session } = useAuthStore();

	const abortController = new AbortController();
	const [adoptLoading, setAdoptLoading] = useState(false);

	const isAdopted = useMemo(() => {
		return adoptedTrees.includes(treeId);
	}, [adoptedTrees, treeId]);

	const [adoptedByOthers, setAdoptedByOthers] = useState(false);

	const adoptTree = async () => {
		if (!user?.id) {
			return;
		}
		try {
			setAdoptLoading(true);
			const adoptUrl = `${import.meta.env.VITE_API_ENDPOINT}/post/adopt`;
			const res = await fetch(adoptUrl, {
				method: "POST",
				body: JSON.stringify({ uuid: user?.id, tree_id: treeId }),
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
				},
				signal: abortController.signal,
			});
			if (!res.ok) {
				handleError(i18n.treeDetail.adoptErrorMessage);
				setAdoptLoading(false);
				return;
			}
			setAdoptLoading(false);
			refreshAdoptedTreesInfo();
			isTreeAdoptedByOthers();
		} catch (error) {
			handleError(i18n.treeDetail.adoptErrorMessage, error);
			setAdoptLoading(false);
		}
	};

	const unadoptTree = async () => {
		if (!user?.id) {
			return;
		}
		try {
			setAdoptLoading(true);
			const adoptUrl = `${import.meta.env.VITE_API_ENDPOINT}/delete/unadopt`;
			const res = await fetch(adoptUrl, {
				method: "DELETE",
				body: JSON.stringify({ uuid: user?.id, tree_id: treeId }),
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
				},
				signal: abortController.signal,
			});
			if (!res.ok) {
				setAdoptLoading(false);
				handleError(i18n.treeDetail.adoptErrorMessage);
				return;
			}
			setAdoptLoading(false);
			refreshAdoptedTreesInfo();
			isTreeAdoptedByOthers();
		} catch (error) {
			handleError(i18n.treeDetail.adoptErrorMessage, error);
			setAdoptLoading(false);
		}
	};

	const isTreeAdoptedByOthers = async () => {
		setAdoptedByOthers(false);
		try {
			const { data, error } = await supabaseClient
				.from("trees_adopted")
				.select(`id, uuid, tree_id`)
				.eq("tree_id", treeId)
				.neq("uuid", session?.user?.id);

			if (error) {
				handleError(i18n.treeDetail.adoptErrorMessage, error);
				return;
			}

			setAdoptedByOthers((data ?? []).length > 0);
		} catch (error) {
			handleError(i18n.treeDetail.adoptErrorMessage, error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			await isTreeAdoptedByOthers();
		};
		fetchData();
	}, []);

	return {
		isLoading: adoptLoading,
		isAdopted,
		adoptTree,
		unadoptTree,
		adoptedByOthers,
	};
}
