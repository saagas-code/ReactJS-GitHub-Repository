import css from './template.module.css'
import { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'; 
import { API } from './../../api';





export const LoginItem = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false); 
    
    const [loginFAILED, setLoginFAILED] = useState(false)
    const [usernameEMPTY, setUsernameEMPTY] = useState(false)
    const [passwordEMPTY, setPasswordEMPTY] = useState(false)


    useEffect(() => {
        let user = localStorage.getItem('userRemember')
        if(user) {setUsername(user as string)}

        let pass = localStorage.getItem('passRemember')
        if(pass) {setPassword(pass as string)}

        let checked = localStorage.getItem('remember')
        if(checked === 'true') {
            setRemember(true)
        }
        localStorage.removeItem('token')
    }, [])

    const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if(!username) {
            setUsernameEMPTY(true)
        } else {
            setUsernameEMPTY(false)
        }
        if(!password) {
            setPasswordEMPTY(true)
        } else {
            setPasswordEMPTY(false)
        }
        if(username && password) {
            let json = await auth.signin(username, password)
            // console.log('json: ', json)
            if(json) {
                
                navigate(`/home`)
            
            } else {
                setLoginFAILED(true)
            }
        }
        if(remember) {
            localStorage.setItem('userRemember', username)
            localStorage.setItem('passRemember', password)
        }
    }
    
    

    const handleHome = () => {
        navigate('/')
    }

    const keyDownHandler = async (event: React.KeyboardEvent<HTMLInputElement>) => { // eslint-disable-line @typescript-eslint/no-unused-vars
        if (event.code === "Enter") {
            const handleLoginKey = async () => {

                if(!username) {
                    setUsernameEMPTY(true)
                } else {
                    setUsernameEMPTY(false)
                }
                if(!password) {
                    setPasswordEMPTY(true)
                } else {
                    setPasswordEMPTY(false)
                }
                if(username || password) {
                    let json = await auth.signin(username, password)
        
                    if(json) {
                        navigate(`/home`)
                    } else {
                        setLoginFAILED(true)
                    }
                }
                if(remember) {
                    localStorage.setItem('userRemember', username)
                    localStorage.setItem('passRemember', password)
                }
            }
            handleLoginKey()
        }
    };

    const handleChecked = () => {
        if(!remember) {
            setRemember(true)
            localStorage.setItem('userRemember', username)
            localStorage.setItem('passRemember', password)
            localStorage.setItem('remember', 'true')
        }
        if(remember) {
            setRemember(false)
            setUsername('')
            setPassword('')
            localStorage.removeItem('userRemember' )
            localStorage.removeItem('passRemember')
            localStorage.setItem('remember', 'false')

        }
    }

    const handleRegister = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if(!username) {
            setUsernameEMPTY(true)
        } else {
            setUsernameEMPTY(false)
        }
        if(!password) {
            setPasswordEMPTY(true)
        } else {
            setPasswordEMPTY(false)
        }
        if(username && password) {
            let json = await API.Register(username, password)
            if(json.status === 422) {
                return alert('Usuário já cadastrado')
            }
            alert(json.message)
        }

        
    }

    return (
       <div className={css.test}>
            <div className={css.loginLOGO}><img src="https://logodownload.org/wp-content/uploads/2019/08/github-logo-2.png" alt="" /></div>

            <div style={usernameEMPTY || passwordEMPTY ? {display:''} : {display:'none'}} className={css.error}>
                <div style={usernameEMPTY ? {display:''} : {display:'none'}} className={css.usernameERRO}><strong>Erro:</strong> O Campo de usuário está vazio.</div>
                <div style={passwordEMPTY ? {display:''} : {display:'none'}} className={css.passwordERRO}><strong>Erro:</strong> O Campo de senha está vazio.</div>
            </div>

            <div style={loginFAILED ? {display:''} : {display:'none'}} className={css.error}>
            <div><strong>Erro</strong>: Usuário ou senha incorretos.</div>
            </div>

            <div className={css.loginFORM}>
                <div className={css.formContainer}>
                    <form  action="">
                        <label htmlFor="">Usuário</label>
                        <input value={username}  onChange={e => setUsername(e.target.value)} className={css.inputFORM} type="text" />
                        
                        <label htmlFor="">Senha</label>
                        <input value={password}  onChange={e => setPassword(e.target.value)} className={css.inputFORM} type="password" />

                        <div className={css.loginButtonDIV}>
                            <p>
                                <input checked={remember} onChange={handleChecked}  id='group' type="checkbox" />
                                <label  className={css.checkboxx} htmlFor="group">Me Lembrar</label>
                            </p>

                            <button onClick={handleLogin}>Logar</button>
                            <button onClick={handleRegister}>Registrar</button>
                            
                            
                        </div>
                    </form>
                </div>
            </div>
            <div className={css.loginUTILITY}>
                <div><span>Lost your password?</span></div>
                <div><span onClick={handleHome}> <FontAwesomeIcon icon={faArrowLeftLong} /> Go to HOME</span></div>
            </div>
       </div>
    )
}

