import { useSelector, useDispatch } from 'react-redux'
import { sendVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        const anecdotesCopy = [...anecdotes]
        return anecdotesCopy
            .sort((anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes)
            .filter(anecdote => anecdote.content.includes(filter))
    })

    const Anecdote = ({ anecdote, handleClick }) => {
        return (
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleClick(anecdote)}>Vote</button>
                </div>
            </div>
        )
    }

    const addVote = (anecdote) => {
        dispatch(sendVote(anecdote))
        dispatch(setNotification(`You voted for '${anecdote.content}'`, 3))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => addVote(anecdote)}
                />
            )}
        </div>
    )
}

export default AnecdoteList