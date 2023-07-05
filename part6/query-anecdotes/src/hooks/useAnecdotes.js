import { useQuery } from 'react-query';
import { getAll } from '../request';

export default function useAnecdotes() {
  return useQuery('anecdotes', getAll, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
