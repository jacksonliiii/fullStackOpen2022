import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        console.log('Create anecdote: ', event.target.anecdote.value)
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`New anecdote: '${content}'`, 3))
    }

    return (
        <div>
            <h1>Create a new Anecdote</h1>
            <form onSubmit={addAnecdote}>
                <input name='anecdote' placeholder='Enter anecdote here...' />
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm