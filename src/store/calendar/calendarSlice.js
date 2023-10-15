import { createSlice } from "@reduxjs/toolkit";
// import { addHours } from "date-fns";

// const tempEvent = {
    // id: new Date().getTime(),
    // title: "César Date",
    // notes: "Need go to the reataurant",
    // start: new Date(),
    // end: addHours( new Date(), 2 ),
    // bgColor: "#6610f2",
    // user: {
    //   id: "123",
    //   name: "Cesar"
    // }
// }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [
            // tempEvent
        ],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent:( state, { payload } ) => {
            state.activeEvent = payload
        },
        onLoadEvents: ( state, { payload } ) => {
            state.isLoadingEvents = false
            // state.events = payload
            payload.forEach(event => {
                const exist = state.events.some( dbEvent => dbEvent.id === event.id )
                if(!exist) {
                    state.events.push(event)
                }
            })
        },
        onAddNewEvent: ( state, { payload } ) => {
            // state.events = [ ...state.events, payload]
            state.events.push(payload)
            state.activeEvent = null
        },
        onUpdateEvent: ( state, { payload } ) => {
            state.events = state.events.map( event => {
                if ( event.id === payload.id ) {
                    return payload
                }
                return event
            })
        },
        onDeleteEvent: ( state ) => {
            state.events = state.events.filter( event => event.id !== state.activeEvent?.id )
            state.activeEvent = null
        },
        onLogoutCalendar: ( state ) => {
            state.isLoadingEvents = true
            state.events = []
            state.activeEvent = null
        }
    }
})

export const { 
    onSetActiveEvent,
    onLoadEvents,
    onAddNewEvent, 
    onUpdateEvent,
    onDeleteEvent,
    onLogoutCalendar,
} = calendarSlice.actions