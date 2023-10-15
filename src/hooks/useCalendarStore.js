import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onSetEvents, onUpdateEvent } from "../store"
import { calendarApi } from "../api"

export const useCalendarStore = () => {
    const dispatch = useDispatch()

    const { events, activeEvent } = useSelector( state => state.calendar)

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startGetEvents = async () => {
        try {
            const { data } = await calendarApi.get('events')
            dispatch( onSetEvents( data.events ) )
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingEvent = async ( newCalendarEvent ) => {
        try {
            //Hacer la peticion al backend
            const { data } = await calendarApi.post('events', newCalendarEvent)
            console.log(data)
            // dispatch( onAddNewEvent( data.event ) )

            //Si fue OK
            if( data.event._id ) {
                dispatch( onUpdateEvent( { ...data.event } ) )
            }else {
                data.event._id = new Date().getTime()
                dispatch( onAddNewEvent({...data.event}) )
            }
            
        } catch (error) {
            console.log(error)
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
        startGetEvents,
        startSavingEvent,
        startDeletingEvent,
    }
}