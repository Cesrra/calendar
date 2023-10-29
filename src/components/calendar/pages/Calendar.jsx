import { useEffect, useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { FabAddNew, Navbar } from "../../"
import { localizer, getMessagesES } from '../../../helper'
import { CalendarEvent, CalendarModal } from '../'
import { useAuthStore, useCalendarStore, useUiStore } from '../../../hooks'
import { FabDelete } from '../../FabDelete'

export const CalendarPage = () => {
  const { user  } = useAuthStore()
  const { openDateModal } = useUiStore()
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()
  const [ lastView ] = useState(localStorage.getItem('lastView') || 'month')

  const eventStayleGetter = ( event, start, end, isSelected ) => {
    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.uid )
    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#6592b8',//347CF7
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

  const onDoubleClick = () => {
    openDateModal()
  }
  
  const onSelect = ( event ) => {
    setActiveEvent(event)
  }

  const onViewChange = ( event ) => {
    localStorage.setItem('lastView', event)
  }
  
  useEffect(() => {
    startLoadingEvents()  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={ localizer }
        events={ events }
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
      <FabAddNew />
      <FabDelete />
    </>
  )
}
