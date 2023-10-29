import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../components/auth"
import { CalendarPage } from "../components/calendar"
import { useAuthStore } from "../hooks"
import { useEffect } from "react"
import { Loader } from "../components/Loader"

export const AppRouter = () => {
  
  // const authStatus = "notAuthenticate"
  const { status, startCheckAuthToken } = useAuthStore()

  useEffect(() => {
    startCheckAuthToken()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  if ( status === 'checking') {
    return (
      <Loader />
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
