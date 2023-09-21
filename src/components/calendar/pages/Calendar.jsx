import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Navbar } from "../../"
import { addHours } from 'date-fns'
import { localizer, getMessagesES } from '../../../helper'

const eventsList = [
  {
    title: "Cesar Date",
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

  const eventStayleGetter = ( event, start, end, isSelected ) => {
    console.log(event, start, end, isSelected)
  }

  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={eventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStayleGetter }
        />
    </>
  )
}
