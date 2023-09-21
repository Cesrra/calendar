import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../components/auth"
import { Calendar } from "../components/calendar"

export const AppRouter = () => {
  
  const authStatus = "notAuthenticate"

  return (
    <Routes>
      {
        (authStatus === "notAuthenticate") 
          ? <Route path="/auth/*" element={ <Login /> } />
          : <Route path="/*" element={ <Calendar /> } />
      }
      
      <Route path="/*" element={ <Navigate to="/auth/login" /> } />
    </Routes>
  )
}
