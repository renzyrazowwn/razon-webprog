import React from 'react';
import Button from '../components/Button';

function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="space-y-2">
        <p className="text-[14px] font-black uppercase tracking-[0.4em] text-violet-600">
          Error 404
        </p>
        <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl">
          Lost in the <span className="text-violet-600">Vibe?</span>
        </h1>
        <p className="mx-auto max-w-md text-sm leading-7 text-zinc-600 sm:text-base">
          The page you are looking for doesn't exist. Let's get you back to your workout.
        </p>
      </div>
      
      <div className="flex gap-4">
        <Button to="/" variant="primary">
          Back to Home
        </Button>
        <Button to="/articles">
          View Blog
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;