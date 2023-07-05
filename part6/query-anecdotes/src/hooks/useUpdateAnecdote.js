import { useMutation, useQueryClient } from "react-query";
import { useNotificationDispatch } from "../NotificationContext";
import { update } from "../request";


export default function useUpdateAnecdote(){
    const queryClient = useQueryClient()
    const notificationDispatch = useNotificationDispatch()

    return useMutation(update, {
        onSuccess: (updatedAnecdote) => {
            queryClient.invalidateQueries('anecdotes')
            notificationDispatch({type: 'SET', payload: `anecdote "${updatedAnecdote.content}" voted`})
        }
    })
}