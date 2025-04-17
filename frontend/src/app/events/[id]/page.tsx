"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import EventForm from "../../../components/EventForm";
import api from "../../../utils/api";
import { Event } from "../../../types/event";

export default function EventDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:5000/events/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch event");
      }
      const data = await response.json();
      setEvent(data);
    }
    fetchData().catch((error) => {
      console.error("Error fetching event:", error);
      setEvent(null);
    });
  }, [id]);

  const handleUpdate = async (data: any) => {
    await fetch(`http://localhost:5000/events/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    router.push("/");
  };

  const handleDelete = async () => {
    await api.delete(`/${id}`);
    router.push("/");
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Event</h1>
      <EventForm initialData={event} onSubmit={handleUpdate} />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
