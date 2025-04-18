"use client";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function Header() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          Event Manager
        </Typography>
        <Button color='inherit' component={Link} href='/'>
          Home
        </Button>
        <Button color='inherit' component={Link} href='/events/new'>
          Add Event
        </Button>
      </Toolbar>
    </AppBar>
  );
}
