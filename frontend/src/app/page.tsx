"use client";

import { useMemo, useState } from "react";
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
  Container,
  CircularProgress,
  Alert,
} from "@mui/material";
import useEvents from "@/hooks/useEvents";

export default function EventsPage() {
  const { data, loading, error } = useEvents();
  const [category, setCategory] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const filteredEvents = useMemo(() => {
    if (!data?.data) return [];

    let filtered = [...data.data];

    if (category !== "All") {
      filtered = filtered.filter((e) => e.category === category);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  }, [category, sortOrder, data?.data]);

  const categories = Array.from(new Set(data?.data.map((e) => e.category)));

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

  return (
    <Stack spacing={2} p={4}>
      <NextLink href='/events/new'>
        <Button variant='contained' color='success'>
          Create New Event
        </Button>
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
      {filteredEvents.length === 0 ? (
        <Typography variant='body1'>No events found.</Typography>
      ) : (
        <>
          {filteredEvents.map((event) => (
            <Card key={event.id}>
              <CardContent>
                <Typography variant='h6'>
                  <strong>Title:</strong> {event.title}
                </Typography>
                <Typography variant='body2'>{event.date}</Typography>
                <Typography variant='body2' color='text.secondary'>
                  {event.category}
                </Typography>
                <Stack direction='row' spacing={1} mt={1}>
                  <NextLink href={`/events/${event.id}`} passHref>
                    <Button variant='contained' size='small' color='primary'>
                      View
                    </Button>
                  </NextLink>

                  <NextLink href={`/events/${event.id}/edit`} passHref>
                    <Button
                      variant='contained'
                      size='small'
                      color='secondary'
                      sx={{ ml: 1 }}
                    >
                      Edit
                    </Button>
                  </NextLink>

                  <form action={`/events/${event.id}/delete`} method='post'>
                    <Button
                      type='submit'
                      variant='contained'
                      size='small'
                      color='error'
                      sx={{ ml: 1 }}
                    >
                      Delete
                    </Button>
                  </form>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </Stack>
  );
}
