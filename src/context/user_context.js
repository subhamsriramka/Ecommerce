import React, { useContext, createContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0()
    const [myUser, setMyUser] = useState()

    useEffect(() => {
        setMyUser(user)
    }, [user])

    return (
        <UserContext.Provider value={{ loginWithRedirect, logout, myUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext)
}