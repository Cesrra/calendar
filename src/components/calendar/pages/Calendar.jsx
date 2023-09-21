import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Navbar } from "../../"
import { addHours, format, parse, startOfWeek, getDay } from 'date-fns'

import es from 'date-fns/locale/es'

const locales = {
  'es': es
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

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
  return (
    <>
      <Navbar />
      <Calendar 
        localizer={localizer}
        events={eventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
        />
    </>
  )
}
