"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
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
import useEvents from "@/hooks/useEvents";

export default function EventsPage() {
  const { data, loading, error } = useEvents();
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [category, setCategory] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  useEffect(() => {
    if (!data?.data) return;
    let filtered = [...data.data];

    if (category !== "All") {
      filtered = filtered.filter((e) => e.category === category);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredEvents(filtered);
  }, [category, sortOrder, data?.data]);

  const categories = Array.from(new Set(data?.data.map((e) => e.category)));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Stack spacing={2} p={4}>
      <NextLink href='/events/new'>
        <Button variant='contained'>Create New Event</Button>
      </NextLink>

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
              <NextLink href={`/events/${event.id}`}>
                <Button size='small'>View</Button>
              </NextLink>
              <NextLink href={`/events/${event.id}/edit`}>
                <Button size='small'>Edit</Button>
              </NextLink>
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
