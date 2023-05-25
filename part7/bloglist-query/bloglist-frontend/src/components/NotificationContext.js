import { useReducer, createContext, useContext } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "NOTIFY":
            return action.payload
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
    const dispatch = notifAndDispatch[1]
    return (payload) => {
        dispatch({
            type: 'NOTIFY',
            payload
        })
        setTimeout(() => {
            dispatch({ type: 'REMOVE' })
        }, 5000)
    }
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