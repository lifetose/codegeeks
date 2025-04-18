import { Event, EventListResDto } from "@/types/event";

const BASE_URL = "http://localhost:5000/events";

export async function getEvents(): Promise<EventListResDto> {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch events: ${res.status}`);
  }
  const data: EventListResDto = await res.json();
  return data;
}

export async function getEvent(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch event: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
}

export async function createEvent(
  data: Omit<Event, "id" | "created" | "updated">,
): Promise<Response> {
  return await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateEvent(
  id: string,
  data: Omit<Event, "id" | "created" | "updated">,
): Promise<Response> {
  return await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteEvent(id: string) {
  return await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
}
