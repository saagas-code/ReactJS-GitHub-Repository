import css from './template.module.css'
import { useState, useContext } from 'react';
import { API } from './../../api';
import { AuthContext } from '../../contexts/AuthContext';

export type repository = {
    _id: string,
    name: string,
    url: string,
    userId: string
}


type Props = {
    setRepository: React.Dispatch<React.SetStateAction<repository[]>>,
    setQuery: React.Dispatch<React.SetStateAction<string>>,
    query: string
}



export const SearchItem = ({setRepository, setQuery, query}: Props) => {
    const [field, setField] = useState('')
    const auth = useContext(AuthContext)

    const handleClear = () => {
        setQuery('')
        setField('')
    }

    const handleSearch = async () => {
        setQuery(field)
        let json = await API.getRepositories(auth.user?._id as string, query)
        setRepository(json)
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setField(event.target.value)
    };

    const keyDownHandler = async (event: React.KeyboardEvent<HTMLInputElement>) => { // eslint-disable-line @typescript-eslint/no-unused-vars
        if (event.code === "Enter") {

            let handleSearch = async () => {
                setQuery(field)
                let json = await API.getRepositories(auth.user?._id as string, query)
                setRepository(json)
            }
            handleSearch() 
        } 
    }; 
    return (
        <div className={css.search}>
            <span>Procurar:</span>
            <input value={field} id='field' placeholder='Busca' onChange={handleInput} type="text" />
            <button onClick={handleClear}>Limpar</button>
            <button onClick={handleSearch}>Procurar</button>
        </div>
    )
}

