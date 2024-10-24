import { useEffect } from 'react';

export const ErrorHandler = () => {
  useEffect(function graphQlErrorHandler() {
    const handler = (e: CustomEvent) => {
      switch (e.detail.statusCode) {
        case 504: {
          return alert('Bad request');
        }
        default: {
          return alert('Internal error');
        }
      }
    };

    window.addEventListener('graphql-error', handler);

    return () => {
      window.removeEventListener('graphql-error', handler);
    };
  }, []);

  return null;
};
