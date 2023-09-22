import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store"

export const useCalendarStore = () => {
    const dispatch = useDispatch()

    const { events, activeEvent } = useSelector( state => state.calendar)

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = ( newCalendarEvent ) => {
        //Hacer la peticion al backend

        //Si fue OK
        if( newCalendarEvent._id ) {
            dispatch( onUpdateEvent( { ...newCalendarEvent } ) )
        }else {
            newCalendarEvent._id = new Date().getTime()
            dispatch( onAddNewEvent({...newCalendarEvent}) )
        }
    }

    const startDeletingEvent = () => {
        //Hacer la peticion al backend

        //Si fue OK
        dispatch( onDeleteEvent() )
    }

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
    }
}