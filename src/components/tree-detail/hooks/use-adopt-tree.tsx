import { useState } from "react";
import { TreeAdoptState } from "../tree-types";

export function useAdoptTree(): TreeAdoptState {
  const abortController = new AbortController();
  const [adoptLoading, setAdoptLoading] = useState(false);
  const [isAdopted, setIsAdopted] = useState(false);

  const adoptTree = async (userId: string, treeId: string, token: string) => {
    try {
      setAdoptLoading(true);
      const adoptUrl = `${import.meta.env.VITE_API_ENDPOINT}/post/adopt`;
      const res = await fetch(adoptUrl, {
        method: "POST",
        body: JSON.stringify({ uuid: userId, tree_id: treeId }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        signal: abortController.signal,
      });
      if (!res.ok) {
        setAdoptLoading(false);
        return false;
      }
      const json = await res.json();
      console.log(json);
      setIsAdopted(true);
      return true;
    } catch (_) {
      setAdoptLoading(false);
      return false;
    }
  };

  const unadoptTree = async (userId: string, treeId: string, token: string) => {
    try {
      setAdoptLoading(true);
      const adoptUrl = `${import.meta.env.VITE_API_ENDPOINT}/delete/unadopt`;
      const res = await fetch(adoptUrl, {
        method: "DELETE",
        body: JSON.stringify({ uuid: userId, tree_id: treeId }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        signal: abortController.signal,
      });
      console.log(res);
      if (!res.ok) {
        console.log("res not ok");
        setAdoptLoading(false);
        return false;
      }
      console.log("unadopted ok");
      setIsAdopted(false);
      return true;
    } catch (_) {
      setAdoptLoading(false);
      return false;
    }
  };

  return { isLoading: adoptLoading, isAdopted, adoptTree, unadoptTree };
}
