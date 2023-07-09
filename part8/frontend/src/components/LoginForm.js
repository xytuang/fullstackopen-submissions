import { useEffect, useState } from "react"
import { LOGIN } from "../queries"
import { useMutation } from "@apollo/client"

const LoginForm = ({ show, setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN)

    useEffect(() => {
        if (result.data){
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user', token)
        }
    // eslint-disable-next-line
    }, [result.data])

    const submit = (event) => {
        event.preventDefault()
        login({variables: {username, password}})
        setUsername('')
        setPassword('')
    }

    if (!show){
        return null
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>username: <input value={username} onChange={({target}) => setUsername(target.value)}/></div>
                <div>password: <input value={password} onChange={({target}) => setPassword(target.value)}/></div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm