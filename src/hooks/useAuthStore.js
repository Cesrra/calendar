import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api"
import { onChecking, onClearErrorMessage, onLogin, onLogout, onLogoutCalendar } from "../store"

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth )
    const dispatch = useDispatch()

    const startLogin = async ({ email, password }) => {
        dispatch( onChecking() )
        try {
            const { data } = await calendarApi.post('auth', { email, password })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch( onLogin({ name: data.name, uid: data.uid }) )
        } catch (error) {
            dispatch( onLogout('Credenciales incorrectas') )
            setTimeout(() => {
                dispatch( onClearErrorMessage() )
            }, 1);
        }
    }

    const startRegister = async ({ name, email, password }) => {
        dispatch( onChecking() )
        try {
            const { data } = await calendarApi.post('auth/new', { name, email, password })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch( onLogin({ name: data.name, uid: data.uid }) )
        } catch (error) {
            console.log(error)
            dispatch( onLogout( error.response.data?.msg || 'Error en Registro') )
            setTimeout(() => {
                dispatch( onClearErrorMessage() )
            }, 1)
        }
    }

    const startCheckAuthToken = async () => {
        const token = localStorage.getItem('token')
        if ( !token ) return dispatch( onLogout() )

        try {
            const { data } = await calendarApi.get('auth/renew')
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch( onLogin({ name: data.name, uid: data.uid }) )
        } catch (error) {
            localStorage.clear()
            dispatch( onLogout() )
        }
    }

    const startLogout = () => {
        dispatch( onLogout() )
        dispatch( onLogoutCalendar() )
        localStorage.clear()
    }

    return{
        status,
        user,
        errorMessage,

        startLogin,
        startRegister,
        startCheckAuthToken,
        startLogout
    }
}