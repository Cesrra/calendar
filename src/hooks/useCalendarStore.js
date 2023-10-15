import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onLoadEvents, onUpdateEvent } from "../store"
import { calendarApi } from "../api"
import { useAuthStore } from "./useAuthStore"
import { convertEventsToDataEvents } from "../helper"
import Swal from "sweetalert2"

export const useCalendarStore = () => {
    const dispatch = useDispatch()

    const { events, activeEvent } = useSelector( state => state.calendar)
    const { user } = useAuthStore()

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('events')
            const events = convertEventsToDataEvents( data.events )
            dispatch( onLoadEvents( events ) )
        } catch (error) {
            console.log(error)
            console.log('Error loading events!')
        }
    }

    const startSavingEvent = async ( newCalendarEvent ) => {
        try {
            if( newCalendarEvent.id ) {
                const { data } = await calendarApi.put( `events/${ newCalendarEvent.id }`, newCalendarEvent )
                dispatch( onUpdateEvent( { ...data.event } ) )
                return
            }
            const { data } = await calendarApi.post('events', newCalendarEvent)
            dispatch( onAddNewEvent({...newCalendarEvent, id: data.event.id, user }) )
        } catch (error) {
            console.log(error)
            Swal.fire('Error al guardar el evento', error.response.data.msg, 'error')
        }
    }

    const startDeletingEvent = async () => {
        try {
            await calendarApi.delete(`events/${ activeEvent.id }`)
            dispatch( onDeleteEvent() )
        } catch (error) {
            console.log(error)
            Swal.fire('Error en la eliminación', error.response.data.msg, 'error')
        }
    }

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        setActiveEvent,
        startLoadingEvents,
        startSavingEvent,
        startDeletingEvent,
    }
}