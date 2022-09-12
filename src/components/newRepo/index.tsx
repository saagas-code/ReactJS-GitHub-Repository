import css from './template.module.css'
import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { API } from './../../api';



export const NewRepoItem = () => {
    const [url, setUrl] = useState('')
    const auth = useContext(AuthContext)

    useEffect(() => {
        
    }, [])

    
    const handleCreateRepo = async (url: string) => {

        let json = await API.createRepositories(auth.user?._id as string, url)
        
        if(json) {
            alert('Adicionado com sucesso!')
        } else {
            console.log(json)
            alert('Repositório já clonado.')
        }
        
        
    }

    return (
        <div className={css.createREPO}>
            <span>Novo Repo:</span>
            <input onChange={e => setUrl(e.target.value)} type="text" />
            <button onClick={()=> handleCreateRepo(url)}>Adicionar</button>
        </div>
    )
}

