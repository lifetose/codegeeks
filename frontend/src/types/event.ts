export interface Event {
  id: string;
  title: string;
  description?: string;
  category: string;
  date: string;
  location: string;
  created?: string;
  updated?: string;
}

export interface EventListResDto {
  data: Event[];
  total: number;
  page: number;
  limit: number;
}
