import useFetch from "./useFetch";
import { getEvents } from "../utils/api";
import { EventListResDto } from "@/types/event";

const useEvents = () => {
  const { data, loading, error, refetch } =
    useFetch<EventListResDto>(getEvents);

  return { data, loading, error, refetch };
};

export default useEvents;
