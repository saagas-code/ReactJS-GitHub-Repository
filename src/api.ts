import axios from "axios";

export const API = {
    Login: async (username: string, password: string) => {
        let response = await axios.post("http://localhost:8819/login", {
            username, password, 
          });
        return response.data
    },

    Register: async (username: string, password: string) => {
        let response = await axios.post("http://localhost:8819/register", {
            username, password, 
          });
        return response.data
    },

    AccountREQUEST: async (username: string) => {
        let response = await axios.post("http://localhost:8819/request", {
            username
        });
        return response.data
    },

    Logout: async () => {
        localStorage.removeItem('token')
        return{status:true}
    },

    getRepositories: async (user_id: string, query: string) => {
        let url = `http://localhost:8819/users/${user_id}/repositories`

        if(query !== '') {
            url += `?q=${query}`;
        }
        
        let response = await axios.get(url)
        return response.data
    },

    createRepositories: async (user_id: string, url: string) => {

        const repositoryName = getRepositoryName(url)
        let response = await axios.post(`http://localhost:8819/users/${user_id}/repositories`, {
            name: repositoryName, url
        })
        return response.data
    },

    DeleteRepositories: async (user_id: string, _id: string) => {

        let response = await axios.delete(`http://localhost:8819/users/${user_id}/repositories/${_id}`)
        return response.data
    },

}

const getRepositoryName = (url: string) => {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/; //eslint-disable-line
    
    const match = url.match(regex) as RegExpMatchArray

    if(match[2]) {
        const values = match[2].split('/')

        return `${values[1]}/${values[2]}`
    }
}