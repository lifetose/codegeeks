// app/events/create/page.tsx
"use client";

import { useRouter } from "next/navigation";
import EventForm from "../../../components/EventForm";

export default function CreateEventPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    await fetch("http://localhost:5000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    router.push("/");
  };

  return (
    <div>
      <h1>Create Event</h1>
      <EventForm onSubmit={handleSubmit} />
    </div>
  );
}
