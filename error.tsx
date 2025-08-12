
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log l'erreur pour le débogage
    console.error('Erreur dans la page anime:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#030711] text-white">
      <h1 className="text-xl font-bold text-red-500 mb-4">Une erreur est survenueeee</h1>
      <p className="mb-4 text-gray-300">{error.message}</p>
      <button 
        onClick={reset}
        className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-md transition-colors"
      >
        Réessayer
      </button>
    </div>
  );
} 
