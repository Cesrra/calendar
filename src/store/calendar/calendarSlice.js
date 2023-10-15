import { createSlice } from "@reduxjs/toolkit";
// import { addHours } from "date-fns";

const tempEvent = {
    // _id: new Date().getTime(),
    // title: "César Date",
    // notes: "Need go to the reataurant",
    // start: new Date(),
    // end: addHours( new Date(), 2 ),
    // bgColor: "#6610f2",
    // user: {
    //   _id: "123",
    //   name: "Cesar"
    // }
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent:( state, { payload } ) => {
            state.activeEvent = payload
        },
        onSetEvents: ( state, { payload } ) => {
            state.events = payload
        },
        onAddNewEvent: ( state, { payload } ) => {
            // state.events = [ ...state.events, payload]
            state.events.push(payload)
            state.activeEvent = null
        },
        onUpdateEvent: ( state, { payload } ) => {
            state.events = state.events.map( event => {
                if ( event._id === payload._id ) {
                    return payload
                }
                return event
            })
        },
        onDeleteEvent: ( state ) => {
            state.events = state.events.filter( event => event._id !== state.activeEvent?._id )
            state.activeEvent = null
        }
    }
})

export const { 
    onSetActiveEvent,
    onSetEvents,
    onAddNewEvent, 
    onUpdateEvent,
    onDeleteEvent,
} = calendarSlice.actions