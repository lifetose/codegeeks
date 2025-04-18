"use client";

import { getEvent, updateEvent } from "../../../../utils/api";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import EventForm from "../../../../components/EventForm";
import { Event } from "../../../../types/event";

export default function EditEventPage() {
  const router = useRouter();
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    getEvent(id as string).then(setEvent);
  }, [id]);

  if (!event) return <div>Loading...</div>;

  const handleSubmit = async (
    data: Omit<Event, "id" | "created" | "updated">,
  ) => {
    await updateEvent(event.id, data);
    router.push("/");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Edit Event</h2>
      <EventForm initialData={event} onSubmit={handleSubmit} />
    </div>
  );
}
