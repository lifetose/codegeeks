"use client";
import { updateEvent } from "../../../../utils/api";

import { useRouter, useParams } from "next/navigation";
import EventForm from "../../../../components/EventForm";
import { Event } from "../../../../types/event";
import useEvent from "@/hooks/useEvent";
import { Alert, CircularProgress, Container } from "@mui/material";

export default function EditEventPage() {
  const router = useRouter();
  const { id } = useParams<{ id?: string }>();

  const { data: event, loading, error } = useEvent(id, { skip: !id });

  if (loading)
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );

  if (error)
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity='error'>{error}</Alert>
      </Container>
    );

  const handleSubmit = async (
    data: Omit<Event, "id" | "created" | "updated">,
  ) => {
    if (!event) return;
    await updateEvent(event.id, data);
    router.push("/");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Edit Event</h2>
      <EventForm initialData={event || undefined} onSubmit={handleSubmit} />
    </div>
  );
}
