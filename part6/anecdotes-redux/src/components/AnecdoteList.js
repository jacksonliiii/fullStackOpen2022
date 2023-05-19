import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.sort((anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes))

    const Anecdote = ({ anecdote, handleClick }) => {
        return (
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleClick(anecdote.id)}>Vote</button>
                </div>
            </div>
        )
    }

    const addVote = (id) => {
        console.log('Vote for: ', id)
        dispatch(vote(id))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => addVote(anecdote.id)}
                />
            )}
        </div>
    )
}

export default AnecdoteList