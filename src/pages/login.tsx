import { useAuth } from "../hooks/useAuth"

const Login=() =>{
    const {login} = useAuth()
    async function handleLogin() {
        login("francianesantos@gmail.com", "secret")
    }
    return (
      <div>
        <h1>Login</h1>
        <button onClick={handleLogin}>Entrar</button>
      </div>
    );
}
export default Login