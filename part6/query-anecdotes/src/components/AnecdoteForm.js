import { createAnecdote } from "../requests"
import { useQueryClient, useMutation } from "react-query"

import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('anecdotes')
      dispatch({
        type: 'CREATE',
        payload: data.content
      })
      setTimeout(() => {
        dispatch({ type: 'REMOVE' })
      }, 2000)
    },
    onError: (error) => {
      dispatch({type: 'LENGTH_ERROR'})
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
