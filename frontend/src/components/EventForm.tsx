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

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim() || title.trim().length < 3 || title.trim().length > 50) {
      newErrors.title = "Title must be 3-50 characters.";
    }

    if (description.trim().length > 300) {
      newErrors.description = "Description must be up to 300 characters.";
    }

    if (category.trim().length > 300) {
      newErrors.category = "Category must be up to 300 characters.";
    }

    if (date.trim().length > 300) {
      newErrors.date = "Date string must be up to 300 characters.";
    }

    if (location.trim().length > 300) {
      newErrors.location = "Location must be up to 300 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      date: date.trim(),
      location: location.trim(),
      category: category.trim(),
    });
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      display='flex'
      flexDirection='column'
      gap={2}
      maxWidth={400}
    >
      <TextField
        label='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={!!errors.title}
        helperText={errors.title}
        required
      />
      <TextField
        label='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        error={!!errors.description}
        helperText={errors.description}
        required
      />
      <TextField
        label='Category'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        multiline
        error={!!errors.category}
        helperText={errors.category}
        required
      />
      <TextField
        label='Date'
        type='date'
        value={date}
        onChange={(e) => setDate(e.target.value)}
        error={!!errors.date}
        helperText={errors.date}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label='Location'
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        multiline
        error={!!errors.location}
        helperText={errors.location}
        required
      />
      <Button type='submit' variant='contained'>
        Submit
      </Button>
    </Box>
  );
}
