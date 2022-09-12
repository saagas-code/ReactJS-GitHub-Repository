import axios from 'axios';
import { useEffect, useState } from 'react';
import { accounts } from '../../types';
import { AuthContext } from './AuthContext';
import { API } from './../api';

export const AuthProvider = ({children}: {children: JSX.Element}) => {
    const [user, setUser] = useState<accounts | null>(null)
    const token = localStorage.getItem('token')

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          }
    }, [token])



    const setToken = (token: string) => {
        localStorage.setItem('token', token)
    }

    const signin = async (username: string, password: string) => {
        const data = await API.Login(username, password);
        console.log('data :', data.status)
        if(data.status === true) {

            setUser(data.user)
            localStorage.setItem('userLOGGED', data.user.username)
            setToken(data.token)
            // console.log('sign: ', user)
            return true
        } else {
            return false
        }
        

        
    } 

    const request = async (username: string) => {
        let data = await API.AccountREQUEST(username)

        if(data) {
            setUser(data.user)
            return true
        }
        return false

    }

    const signout = async () => {
        API.Logout()
        setUser(null)
        localStorage.clear()
    }

    

    return (
        <AuthContext.Provider value={{user, signin, request, signout}}>
            {children}
        </AuthContext.Provider>
    )
}