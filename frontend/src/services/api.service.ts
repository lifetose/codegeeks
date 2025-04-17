export const getEventsData = async (): Promise<ListResponse<Movie>> => {
  const response = await fetch(`http://localhost:5000/events`);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();
  return data;
};
