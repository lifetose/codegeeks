"use client";

import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { Event } from "@/types/event";

interface Props {
  initialData?: Partial<Event>;
  onSubmit: (data: Omit<Event, "id" | "created" | "updated">) => void;
}

export default function EventForm({ initialData = {}, onSubmit }: Props) {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [date, setDate] = useState(initialData.date || "");
  const [location, setLocation] = useState(initialData.location || "");
  const [category, setCategory] = useState(initialData.category || "");

  return (
    <Box
      component='form'
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ title, description, date, location, category });
      }}
      display='flex'
      flexDirection='column'
      gap={2}
      maxWidth={400}
    >
      <TextField
        label='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        label='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        required
      />
      <TextField
        label='Category'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        multiline
        required
      />
      <TextField
        label='Date'
        type='date'
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <TextField
        label='Location'
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        multiline
        required
      />
      <Button type='submit' variant='contained'>
        Submit
      </Button>
    </Box>
  );
}
