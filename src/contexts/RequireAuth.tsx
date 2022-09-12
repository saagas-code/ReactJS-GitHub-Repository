
import { useContext, useEffect } from 'react';
import { AuthContext } from "./AuthContext";
import { NotFound } from '../pages/notfound'; 
import  axios  from 'axios';
import { useNavigate } from 'react-router-dom';


export const RequireAuth = ({children}: {children: JSX.Element}) => {
    const token = localStorage.getItem('token')
    const auth = useContext(AuthContext);
    const navigate = useNavigate()
    const userLogged = localStorage.getItem('userLOGGED')

    useEffect(() => {
        

        let request = async () => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            await auth.request(userLogged as string)
        }
          
        request() 
    }, [])
    
    if(!token) {
        
        return <NotFound />
    }


    return children
}