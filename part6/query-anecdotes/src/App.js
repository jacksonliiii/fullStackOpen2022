import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQueryClient, useMutation, useQuery } from 'react-query'
import { getAnecdotes, makeVote } from './requests'

import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const voteAnecdoteMutation = useMutation(makeVote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch(`You voted for '${anecdote.content}'`)
  }

  const result = useQuery('anecdotes', getAnecdotes)

  if (result.isLoading) {
    return <div>Anecdotes loading...</div>
  }

  if (result.isError) {
    return <div>Anecdote service not available due to server-side problem.</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>Vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
