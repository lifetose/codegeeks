import { useCallback } from "react";
import useFetch from "./useFetch";
import { getEventById } from "../utils/api";
import { Event } from "@/types/event";

const useEvent = (
  id: string | undefined,
  { skip = false }: { skip?: boolean },
) => {
  const fetchEvent = useCallback(
    () => (id ? getEventById(id) : Promise.resolve(null)),
    [id],
  );

  const { data, loading, error, refetch } = useFetch<Event | null>(fetchEvent, {
    skip: skip || !id,
  });

  return { data, loading, error, refetch };
};

export default useEvent;
