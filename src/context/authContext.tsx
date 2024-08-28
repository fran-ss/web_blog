import {Children, createContext, useState, useEffect, PropsWithChildren,  } from "react"
import {  useNavigate } from "react-router-dom";
import { api } from "../services/api";
type User = {
    id: string;
    name: string;
    email: string;
    token: string;
}
type AuthContextProps = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};
export const AuthContext = createContext<AuthContextProps>(
    {}as AuthContextProps
)
export const AuthProvider = ({ children }: PropsWithChildren) => {
    const navigate = useNavigate()
    const [ user, setUser ] = useState<User | null>(null);
    useEffect(() => {
         function getStorageData() {
            const storageData =  localStorage.getItem("@blogifma!:user")
            if (storageData) {
                setUser(JSON.parse(storageData))
                 navigate("/dashboard");
            }
        }
        getStorageData();
    },[])
    async function login(email: string, password: string) {
        try {
            const response = await api.post<User>("login", {
                email,
                password
            })
            setUser(response.data)
            localStorage.setItem("@blogifma!:user", JSON.stringify(response.data))
            navigate("/dashboard")
        } catch (error) {
            console.log(error)
        }
    }
    async function logout() {
        localStorage.removeItem("@blogifma!:user")
        setUser(null)
     }
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};