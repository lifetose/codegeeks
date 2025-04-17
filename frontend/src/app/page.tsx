// app/page.tsx
import Link from "next/link";

export default async function HomePage() {
  const data = await fetch("http://localhost:5000/events");
  const events = await data.json();

  return (
    <div>
      <Link href='/events/create'>Create Event</Link>
      <ul>
        {events.data.map((event) => (
          <li key={event.id}>
            <Link href={`/events/${event.id}`}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
