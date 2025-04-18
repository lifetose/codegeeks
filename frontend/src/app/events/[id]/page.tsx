"use client";

import { useParams } from "next/navigation";
import useEvent from "@/hooks/useEvent";
import useSimilarEvents from "@/hooks/useSimilarEvents";

export default function EventDetail() {
  const { id } = useParams<{ id?: string }>();

  const { data: event, loading, error } = useEvent(id, { skip: !id });
  const {
    data: similarEvents,
    loading: similarLoading,
    error: similarError,
  } = useSimilarEvents(id, { skip: !id });

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  console.log(similarEvents);
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Event Details</h1>
      <h2>{event?.title}</h2>
      <p>{event?.description}</p>
      <p>
        <strong>Date:</strong> {event?.date}
      </p>
      {similarLoading && <div>Loading similar events...</div>}
      {similarError && <div style={{ color: "red" }}>{similarError}</div>}
      {similarEvents && similarEvents?.length > 0 ? (
        <div>
          <h2>Similar Events</h2>
          <ul>
            {similarEvents.map((e) => (
              <li key={e.id}>
                <h3>{e.title}</h3>
                <p>{e.description}</p>
                <p>
                  <strong>Date:</strong> {e.date}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>No similar events found</h2>
        </div>
      )}
    </div>
  );
}
