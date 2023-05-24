import { useReducer, createContext, useContext } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "CREATE":
            return `You created '${action.payload}'`
        case "VOTE":
            return `You voted for '${action.payload}'`
        case "LENGTH_ERROR":
            return "Anecdote is too short, must be at least 5 characters or more"
        case "REMOVE":
            return ""
        default:
            return state
    }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
    const notifAndDispatch = useContext(NotificationContext)
    return notifAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notifAndDispatch = useContext(NotificationContext)
    return notifAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext