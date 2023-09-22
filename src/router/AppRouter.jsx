import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../components/auth"
import { CalendarPage } from "../components/calendar"

export const AppRouter = () => {
  
  const authStatus = "notAuthenticate"

  return (
    <Routes>
      {
        (authStatus === "notAuthenticateF") 
          ? <Route path="/auth/*" element={ <Login /> } />
          : <Route path="/*" element={ <CalendarPage /> } />
      }
      
      <Route path="/*" element={ <Navigate to="/auth/login" /> } />
    </Routes>
  )
}
