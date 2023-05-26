import { useReducer, createContext, useContext } from "react"

const userReducer = (state, action) => {
    switch (action.type) {
        case "USER":
            return action.payload
        default:
            return state
    }
}

const UserContext = createContext()

export const useUserValue = () => {
    const userAndDispatch = useContext(UserContext)
    return userAndDispatch[0]
}

export const useUserDispatch = () => {
    const userAndDispatch = useContext(UserContext)
    const dispatch = userAndDispatch[1]
    return (payload) => {
        dispatch({
            type: 'USER',
            payload
        })
    }
}

export const UserContextProvider = (props) => {
    const [user, userDispatch] = useReducer(userReducer, null)

    return (
        <UserContext.Provider value={[user, userDispatch]}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext