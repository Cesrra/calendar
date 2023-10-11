import { useAuthStore } from '../hooks'

export const Navbar = () => {
  const { user, startLogout } = useAuthStore()

  const logout = () => {
    startLogout()
  }  

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-3">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            { user.name }
        </span>

        <button className="btn btn-outline-danger" onClick={ logout }>
            <i className="fas fa-sign-out-alt"></i>
            &nbsp;
            <span>Salir</span>
        </button>
    </div>
  )
}
