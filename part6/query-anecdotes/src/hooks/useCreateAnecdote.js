import { useQueryClient, useMutation } from 'react-query';
import { createAnecdote } from '../request';
import { useNotificationDispatch } from '../NotificationContext';

export default function useCreateAnecdote() {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  return useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      // queryClient.invalidateQueries('anecdotes');
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      notificationDispatch({ type: 'SET', payload: `anecdote "${newAnecdote.content}" created` })
    },
    onError: (err) => {
      const errorMessage = err?.response?.data?.error;
      if (errorMessage) {
        notificationDispatch({ type: 'SET', payload: errorMessage });
      }
    },
  });
}
