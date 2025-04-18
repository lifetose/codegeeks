"use client";

import { useEffect, useState } from "react";
import { getEvent } from "../../../utils/api";
import { useParams } from "next/navigation";
import { Event } from "@/types/event";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    getEvent(id as string).then(setEvent);
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>
        <strong>Date:</strong> {event.date}
      </p>
    </div>
  );
}
