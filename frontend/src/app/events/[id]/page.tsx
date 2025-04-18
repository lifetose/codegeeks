"use client";

import { useParams } from "next/navigation";
import useEvent from "@/hooks/useEvent";
import useSimilarEvents from "@/hooks/useSimilarEvents";

import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Grid,
  Box,
} from "@mui/material";

export default function EventDetail() {
  const { id } = useParams<{ id?: string }>();

  const { data: event, loading, error } = useEvent(id, { skip: !id });
  const {
    data: similarEvents,
    loading: similarLoading,
    error: similarError,
  } = useSimilarEvents(id, { skip: !id });

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
    <Container sx={{ mt: 6 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant='h3' gutterBottom>
            {event?.title}
          </Typography>
          <Typography variant='body1' gutterBottom>
            {event?.description}
          </Typography>
          <Typography variant='subtitle1' color='text.secondary' gutterBottom>
            <strong>Date:</strong> {event?.date}
          </Typography>
          <Typography variant='subtitle1' color='text.secondary'>
            <strong>Location:</strong> {event?.location}
          </Typography>
        </CardContent>
      </Card>
      <Box mt={5}>
        <Typography variant='h4' gutterBottom>
          Similar Events
        </Typography>

        {similarLoading && (
          <Box textAlign='center' mt={3}>
            <CircularProgress />
          </Box>
        )}

        {similarError && (
          <Alert severity='error' sx={{ mt: 2 }}>
            {similarError}
          </Alert>
        )}

        {similarEvents && similarEvents.length > 0 ? (
          <Grid container spacing={3} mt={1}>
            {similarEvents.map((e) => (
              <Grid size={{ xs: 12, md: 6 }} key={e.id}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant='h6' gutterBottom>
                      {e.title}
                    </Typography>
                    <Typography variant='body2' gutterBottom>
                      {e.description}
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      color='text.secondary'
                      gutterBottom
                    >
                      <strong>Date:</strong> {event?.date}
                    </Typography>
                    <Typography variant='subtitle1' color='text.secondary'>
                      <strong>Location:</strong> {event?.location}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          !similarLoading &&
          !similarError && (
            <Typography variant='body1' color='text.secondary'>
              No similar events found.
            </Typography>
          )
        )}
      </Box>
    </Container>
  );
}
