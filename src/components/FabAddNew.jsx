import { addHours } from "date-fns"
import { useAuthStore, useCalendarStore, useUiStore } from "../hooks"

export const FabAddNew = () => {
    const { openDateModal } = useUiStore()
    const { setActiveEvent } = useCalendarStore()
    const { user } = useAuthStore()

    const handleClick = () => {
        setActiveEvent({
            title: "",
            notes: "",
            start: new Date(),
            end: addHours( new Date(), 2 ),
            user: {
                uid: user.uid,
                name: user.name
            }
        })
        openDateModal()
    }

    return (
        <button 
            className="fab btn btn-primary"
            onClick={ handleClick }
        >
            <i className="fas fa-plus icon-fab"></i>
        </button>
    )
}
