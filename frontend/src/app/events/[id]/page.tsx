"use client";

import { useParams } from "next/navigation";
import useEvent from "@/hooks/useEvent";

export default function EventDetail() {
  const { id } = useParams<{ id?: string }>();

  const { data: event, loading, error } = useEvent(id, { skip: !id });

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Event Details</h1>
      <h2>{event?.title}</h2>
      <p>{event?.description}</p>
      <p>
        <strong>Date:</strong> {event?.date}
      </p>
    </div>
  );
}
