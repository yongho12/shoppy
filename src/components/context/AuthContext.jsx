import { createContext, useContext, useEffect, useState  } from 'react';
import { logIn, logOut, onUserStateChange } from '../../api/firebase';

const AuthContext = createContext();

export function AuthContextProvider({children}) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

 
  useEffect(()=>{
      onUserStateChange((user)=> {
        setIsLoading(false);
        setUser(user)
          
      })
  }, [])

  return <AuthContext.Provider value= {{user, isLoading, logIn, logOut}}>
    {children}
  </AuthContext.Provider>
}


export function useAuthContext() {
  return useContext(AuthContext)
}