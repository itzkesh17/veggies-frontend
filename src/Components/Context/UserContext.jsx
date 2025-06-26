import { createContext, useEffect, useState} from 'react'


export const UserContext = createContext();

export const UserProvider = ({children}) => {

    const [user, setUser] = useState(()=>{
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    })

    useEffect(()=>{

        if(user){
            localStorage.setItem('user', JSON.stringify(user));
        }

    },[user])

    const logOut = () => {
        setUser(null);
        localStorage.removeItem('user');
    }

  return (
    <UserContext.Provider value={{user,setUser,logOut}}>
        {children}
    </UserContext.Provider>
  )
}
