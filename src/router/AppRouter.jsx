import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../components/auth"
import { CalendarPage } from "../components/calendar"
import { useAuthStore } from "../hooks"
import { useEffect } from "react"

export const AppRouter = () => {
  
  // const authStatus = "notAuthenticate"
  const { status, startCheckAuthToken } = useAuthStore()

  useEffect(() => {
    startCheckAuthToken()
  }, [])
  

  if ( status === 'checking') {
    return (
      <h2>Cargando...</h2>
    )
  }

  return (
    <Routes>
      {
        (status === "not-authenticated") 
          ? (<>
              <Route path="/auth/*" element={ <Login /> } />
              <Route path="/*" element={ <Navigate to="/auth/login" /> } />
            </>)
          : (<>
            <Route path="/" element={ <CalendarPage /> } />
            <Route path="/*" element={ <Navigate to="/" /> } />
          </>)
      }
                  
    </Routes>
  )
}
