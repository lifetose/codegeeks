import { getEvent } from "../../../utils/api";

export default async function EventDetail({
  params,
}: {
  params: { id: string };
}) {
  const event = await getEvent(params.id);

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
