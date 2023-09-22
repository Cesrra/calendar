import { addHours } from "date-fns"
import { useCalendarStore, useUiStore } from "../hooks"

export const FabAddNew = () => {
    const { openDateModal } = useUiStore()
    const { setActiveEvent } = useCalendarStore()

    const handleClick = () => {
        setActiveEvent({
            title: "",
            notes: "",
            start: new Date(),
            end: addHours( new Date(), 2 ),
            bgColor: "#6610f2",
            user: {
                _id: "123",
                name: "Cesar"
            }
        })
        openDateModal()
    }

    return (
        <button 
            className="fab btn btn-primary"
            onClick={ handleClick }
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
