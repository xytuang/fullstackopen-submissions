import { useSelector, useDispatch } from 'react-redux'
import { voting } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({anecdotes, filter}) => anecdotes.filter(a => a.content.includes(filter)))
    const byVotes = (a1, a2) => a2.votes - a1.votes 
    return (
        anecdotes.sort(byVotes).map(a => <Anecdote key={a.id} anecdote={a} 
            handleClick={() => {
                dispatch(voting(a))
                dispatch(notificationChange(`you voted for ${a.content}`, 5))
            }}/>)
    )
}

const Anecdote = ({anecdote, handleClick}) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
          </div>
        </div>
    )
}

export default AnecdoteList