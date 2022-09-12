import css from './template.module.css'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { NavItem } from './../components/nav/index';
import { SearchItem } from '../components/search/index';
import { NewRepoItem } from './../components/newRepo/index';
import { API } from './../api';
import {Link} from 'react-router-dom'



export type repository = {
    _id: string,
    name: string,
    url: string,
    userId: string
}

    

export const Home = () => {
    const auth = useContext(AuthContext)
    const[query, setQuery] = useState('')
    // const[loading, setLoading] = useState(false)
    const[loadingError, setLoadingError] = useState(false)
    const[repository, setRepository] = useState<repository[]>([])


    useEffect(() => {
      try {
        let loadData = async () => {
       
            // setLoading(true)
            let response = await API.getRepositories(auth.user?._id as string, query)
        
            setRepository(response)
            // setLoading(false)
        }
        loadData()
      } catch (error) {
        console.error(error)
        setLoadingError(true)
      }
      
      
    }, [auth.user, repository, query])

    const handleDelete = async (key: number) => {
        let tmpRepository = [...repository]
        let user_id = tmpRepository[key].userId
        let id = tmpRepository[key]._id

        if(window.confirm('Deseja mesmo excluir este repositório ?')) {
            let json = await API.DeleteRepositories(user_id, id)
            if(json) {
                alert('Repositório excluido com sucesso.')
            }
        }

        
    }


    if (loadingError) {
        return(
            <div className={css.loading}>
                Erro ao carregar os dados. <Link to='/'>Voltar</Link>
            </div>
        )
    }
    /*
    if (loading) {
        return (
            <div className={css.loading}>
                Carregando...
            </div>
        )
    }
    */

    return (
        <div id={css.HOME} className={css.Home}>
            
            <NavItem/>

            <main>
                <SearchItem query={query} setQuery={setQuery} setRepository={setRepository}/>

                <div className={css.repository}>
                    <h2>Repositórios</h2>
                    <div className={css.repoList}>
                       {repository.map((item, key) => (

                         <div key={key} className={css.repo}>
                            <div className={css.leftREPO}>
                                <h3>{item.name.substring(0, item.name.indexOf('/'))}</h3>
                                <h2>{item.name.substring(item.name.indexOf('/') + 1)}</h2>
                            </div>
                            <div className={css.rightREPO}>
                                <button onClick={()=> handleDelete(key)}>Apagar</button>
                            </div>
                        </div>

                       ))}
                    </div>
                </div>

                <div className={css.createREPO}>
                    <NewRepoItem/>
                </div>

            </main>
        </div>
    )
}