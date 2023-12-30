import { Calendar as BigCalendar, Views, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'

const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
}

interface CalendarProps {
  events: Event[];
}

const eventStyleGetter = (event: Event) => {
  const backgroundColor = event.title === 'Available' ? 'green' : 'blue'; // Change color as needed
  const style = {
    backgroundColor,
    color: 'white',
    borderRadius: '0px',
    border: 'none',
    display: 'block',
  };
  return {
    style,
  };
};

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Appointment Calendar</h1>
      <BigCalendar
        localizer={localizer}
        events={events}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 800 }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default Calendar;
