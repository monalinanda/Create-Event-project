
import Spinner from './Spinner';
import { useQuery } from '@apollo/client';
import EventCard from './EventCard';
import { GET_EVENTS } from '../queries/eventQueries';

interface event {
    id : string
    name : string
    description : string
    date : string
    time : string
    duration : string
    status : string
    client : {
      name : string
      email : string
      phone : string
    }
  }
export const Events = () => {
    const { loading, error, data } = useQuery(GET_EVENTS);
    if (loading) return <Spinner />;
    if (error) return <p>Something Went Wrong</p>;
  return (
    <>
      {data.events.length > 0 ? (
        <div className='row mt-4'>
          {data.events.map((event: event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  )
}
