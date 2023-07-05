import { useSelector, useDispatch } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)
    const byVotes = (a1, a2) => a2.votes - a1.votes 
    return (
        anecdotes.sort(byVotes).map(a => <Anecdote key={a.id} anecdote={a} handleClick={() => dispatch(increaseVote(a.id))}/>)
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