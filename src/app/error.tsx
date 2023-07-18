'use client';

// Error components must be Client Components

// import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   console.log(14, error);
  // }, [error]);

  return (
    <div>
      <button
        onClick={() => {
          window && window.location.replace('/');
        }}
      >
        {error?.message ?? 'Something went wrong'} <br />
        Go Home
      </button>
      {/* <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button> */}
    </div>
  );
}
