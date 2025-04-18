"use client";

import { useEffect, useState } from "react";
import { getEvents } from "../utils/api";
import Link from "next/link";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import type { Event } from "../types/event";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [category, setCategory] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  useEffect(() => {
    async function fetchEvents() {
      const { data } = await getEvents();
      setEvents(data);
    }

    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = [...events];

    if (category !== "All") {
      filtered = filtered.filter((e) => e.category === category);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredEvents(filtered);
  }, [category, sortOrder, events]);

  const categories = Array.from(new Set(events.map((e) => e.category)));

  return (
    <Stack spacing={2} p={4}>
      <Link href='/events/new'>
        <Button variant='contained'>Create New Event</Button>
      </Link>

      <Stack direction='row' spacing={2}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label='Category'
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value='All'>All</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Sort by Date</InputLabel>
          <Select
            value={sortOrder}
            label='Sort by Date'
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <MenuItem value='asc'>Oldest First</MenuItem>
            <MenuItem value='desc'>Newest First</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {filteredEvents.map((event) => (
        <Card key={event.id}>
          <CardContent>
            <Typography variant='h6'>{event.title}</Typography>
            <Typography variant='body2'>{event.date}</Typography>
            <Typography variant='body2' color='text.secondary'>
              {event.category}
            </Typography>
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
