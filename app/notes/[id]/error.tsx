"use client";

import { useEffect } from "react";

interface NotesErrorProps {
  error: Error;
  reset: () => void;
}

export default function NotesError({ error, reset }: NotesErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
      <p>Could not fetch the list of notes. {error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}