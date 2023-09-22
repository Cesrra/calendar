import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent } from "../store"

export const useCalendarStore = () => {
    const dispatch = useDispatch()

    const { events, activeEvent } = useSelector( state => state.calendar)

    const setActiveEvent = ( calendarEvent ) => {
        console.log('first ',calendarEvent)
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = ( newCalendarEvent ) => {
        //Hacer la peticion al backend

        //Si fue OK
        if( newCalendarEvent._id ) {
            //Edit event
        }else {
            newCalendarEvent._id = new Date().getTime()
            dispatch( onAddNewEvent({...newCalendarEvent}) )
        }
    }

    return {
        events,
        activeEvent,
        setActiveEvent,
        startSavingEvent,
    }
}