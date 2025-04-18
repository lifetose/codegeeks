import { getEvents } from "../utils/api";
import Link from "next/link";
import { Button, Card, CardContent, Typography, Stack } from "@mui/material";

export default async function EventsPage() {
  const { data } = await getEvents();

  return (
    <Stack spacing={2} p={4}>
      <Link href='/events/new'>
        <Button variant='contained'>Create New Event</Button>
      </Link>
      {data.map((event) => (
        <Card key={event.id}>
          <CardContent>
            <Typography variant='h6'>{event.title}</Typography>
            <Typography variant='body2'>{event.date}</Typography>
            <Stack direction='row' spacing={1} mt={1}>
              <Link href={`/events/${event.id}`}>
                <Button size='small'>View</Button>
              </Link>
              <Link href={`/events/${event.id}/edit`}>
                <Button size='small'>Edit</Button>
              </Link>
              <form action={`/events/${event.id}/delete`} method='post'>
                <Button type='submit' size='small' color='error'>
                  Delete
                </Button>
              </form>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
