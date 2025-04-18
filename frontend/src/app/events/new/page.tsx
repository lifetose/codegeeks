"use client";

import EventForm from "@/components/EventForm";
import { createEvent } from "../../../utils/api";
import { useRouter } from "next/navigation";
import { Event } from "@/types/event";

export default function NewEventPage() {
  const router = useRouter();

  const handleSubmit = async (
    data: Omit<Event, "id" | "created" | "updated">,
  ) => {
    await createEvent(data);
    router.push("/");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Create New Event</h2>
      <EventForm onSubmit={handleSubmit} />
    </div>
  );
}
