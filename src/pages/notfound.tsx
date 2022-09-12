import {Link} from 'react-router-dom'

export const NotFound = () => {
    return (
        <div>
            <h1>Acesso negado !</h1>

            <Link to={'/'}>Voltar para o inicio</Link>
        </div>

        
    )
}