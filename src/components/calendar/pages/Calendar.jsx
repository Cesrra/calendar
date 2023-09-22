import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import { addHours } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Navbar } from "../../"
import { localizer, getMessagesES } from '../../../helper'
import { CalendarEvent, CalendarModal } from '../'
import { useUiStore } from '../../../hooks'

const eventsList = [
  {
    title: "César Date",
    notes: "Need go to the reataurant",
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: "#6610f2",
    user: {
      _id: "123",
      name: "Cesar"
    }
  }
]

export const CalendarPage = () => {
  const { openDateModal } = useUiStore()
  const [ lastView ] = useState(localStorage.getItem('lastView' || 'day'))

  const eventStayleGetter = ( event, start, end, isSelected ) => {
    const style = {
      backgroundColor: '#000',//347CF7
      borderRadius: '0',
      opacity: 'white',
      event, 
      start, 
      end, 
      isSelected
    }
    return {
      style
    }
  }

  const onDoubleClick = ( event ) => {
    console.log({ doubleClick: event })
    openDateModal()
  }

  const onSelect = ( event ) => {
    console.log({ click: event })
  }

  const onViewChange = ( event ) => {
    localStorage.setItem('lastView', event)
  }

  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={ localizer }
        events={ eventsList }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStayleGetter }
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChange }
      />
      <CalendarModal />
    </>
  )
}
