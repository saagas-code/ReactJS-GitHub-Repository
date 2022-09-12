import css from './template.module.css'
import { LoginItem } from '../components/login/index';
import { useEffect } from 'react';



export const Login = () => {

    useEffect(() => {
        // localStorage.removeItem('token')
    }, [])
    

    return (
        <div className={css.Login}>
            <LoginItem/>
        </div>
    )
}