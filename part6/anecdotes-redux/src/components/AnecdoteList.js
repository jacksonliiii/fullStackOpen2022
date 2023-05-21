import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { voteNotify, removeNotify } from '../reducers/notificationReducer'

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
        console.log('Vote for: ', anecdote.id)
        dispatch(vote(anecdote.id))
        dispatch(voteNotify(anecdote.content))
        setTimeout(() => {
            dispatch(removeNotify())
        }, 5000)
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