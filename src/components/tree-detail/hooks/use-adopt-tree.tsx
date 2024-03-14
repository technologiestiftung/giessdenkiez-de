import { useEffect, useState } from "react";
import { useAuthStore } from "../../../auth/auth-store";
import { useErrorStore } from "../../../error/error-store";
import { useI18nStore } from "../../../i18n/i18n-store";

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

  const abortController = new AbortController();
  const [adoptLoading, setAdoptLoading] = useState(false);
  const [isAdopted, setIsAdopted] = useState(false);
  const [adoptedByOthers, setAdoptedByOthers] = useState(false);

  const adoptTree = async () => {
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
      setIsAdopted(true);
      setAdoptLoading(false);
    } catch (error) {
      handleError(i18n.treeDetail.adoptErrorMessage, error);
      setAdoptLoading(false);
    }
  };

  const unadoptTree = async () => {
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
      setIsAdopted(false);
      setAdoptLoading(false);
    } catch (error) {
      handleError(i18n.treeDetail.adoptErrorMessage, error);
      setAdoptLoading(false);
    }
  };

  useEffect(() => {
    setIsAdopted(false);
    setAdoptLoading(false);
    setAdoptedByOthers(false);

    const isTreeAdoptedByUser = async (treeId: string) => {
      try {
        const adoptUrl = `${import.meta.env.VITE_API_ENDPOINT}/get/istreeadopted?uuid=${user?.id}&id=${treeId}`;
        const res = await fetch(adoptUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          signal: abortController.signal,
        });
        if (!res.ok) {
          handleError(i18n.treeDetail.adoptErrorMessage);
          return;
        }
        const json = await res.json();
        setIsAdopted(json.data);
      } catch (error) {
        handleError(i18n.treeDetail.adoptErrorMessage, error);
      }
    };

    const isTreeAdoptedByOthers = async () => {
      try {
        const adoptUrl = `${import.meta.env.VITE_API_ENDPOINT}/get/wateredandadopted`;
        const res = await fetch(adoptUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          signal: abortController.signal,
        });
        if (!res.ok) {
          handleError(i18n.treeDetail.adoptErrorMessage);
          return;
        }
        const json = await res.json();
        const adoptedByOthers =
          json.data.filter(
            (tree: any) => tree.tree_id === treeId && tree.adopted > 1,
          ).length > 0;
        setAdoptedByOthers(adoptedByOthers);
      } catch (error) {
        handleError(i18n.treeDetail.adoptErrorMessage, error);
      }
    };

    const fetchData = async () => {
      await isTreeAdoptedByUser(treeId);
      await isTreeAdoptedByOthers();
    };

    fetchData();
  }, [treeId]);

  return {
    isLoading: adoptLoading,
    isAdopted,
    adoptTree,
    unadoptTree,
    adoptedByOthers,
  };
}
