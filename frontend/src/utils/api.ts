import { Event, EventListResDto } from "@/types/event";

const BASE_URL = "http://localhost:5000/events";

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const getEvents = async (): Promise<EventListResDto> => {
  try {
    const response = await fetch(BASE_URL);
    return await handleResponse<EventListResDto>(response);
  } catch (error) {
    throw new Error(`Failed to fetch events: ${error}`);
  }
};

export const getEventById = async (id: string): Promise<Event> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    return await handleResponse<Event>(response);
  } catch (error) {
    throw new Error(`Failed to fetch event with id ${id}: ${error}`);
  }
};

export const createEvent = async (
  book: Omit<Event, "id" | "created" | "updated">,
): Promise<Event | null> => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    return await handleResponse<Event>(response);
  } catch (error) {
    throw new Error(`Failed to add event: ${error}`);
  }
};

export const updateEvent = async (
  id: string,
  book: Omit<Event, "id" | "created" | "updated">,
): Promise<Event | null> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    return await handleResponse<Event>(response);
  } catch (error) {
    throw new Error(`Failed to update book: ${error}`);
  }
};

export const deleteEvent = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    return await handleResponse<boolean>(response);
  } catch (error) {
    throw new Error(`Failed to delete event: ${error}`);
  }
};

export const getSimilarEvents = async (id: string): Promise<Event[]> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}/similar`);
    return await handleResponse<Event[]>(response);
  } catch (error) {
    throw new Error(`Failed to fetch event with id ${id}: ${error}`);
  }
};
