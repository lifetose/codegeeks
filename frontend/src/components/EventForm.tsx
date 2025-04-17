// components/EventForm.tsx
"use client";

import { useState } from "react";
import { Event } from "../types/event";

interface Props {
  initialData?: Partial<Event>;
  onSubmit: (data: Partial<Event>) => void;
}

export default function EventForm({ initialData = {}, onSubmit }: Props) {
  const [formData, setFormData] = useState<Partial<Event>>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <input
        name='title'
        value={formData.title || ""}
        onChange={handleChange}
        placeholder='Title'
        required
      />
      <input
        name='description'
        value={formData.description || ""}
        onChange={handleChange}
        placeholder='Description'
      />
      <input
        name='category'
        value={formData.category || ""}
        onChange={handleChange}
        placeholder='Category'
        required
      />
      <input
        name='date'
        type='date'
        value={formData.date?.split("T")[0] || ""}
        onChange={handleChange}
        required
      />
      <input
        name='location'
        value={formData.location || ""}
        onChange={handleChange}
        placeholder='Location'
        required
      />
      <button type='submit'>Submit</button>
    </form>
  );
}
