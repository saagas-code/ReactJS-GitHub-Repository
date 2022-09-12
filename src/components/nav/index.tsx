import css from './template.module.css'
import { useEffect, useContext } from 'react';
import { API } from './../../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';



export const NavItem = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext)

    useEffect(() => {
        
    }, [])

    const handleLogout = async () => {
        await  API.Logout()
        navigate('/')
    }

    return (
        <nav>
            <div className={css.leftNAV}><h1>SaagasRepo User: {auth.user?.username}</h1></div>
            <div onClick={handleLogout} className={css.rightNAV}><button>Sair</button></div>
        </nav>
    )
}

