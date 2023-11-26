
  interface EventProps {
    event:{
        id : string
        name : string
        status :string
        client : {
          name : string
          email : string
          phone : string
        }
    }
  }

export default function EventCard({ event }: EventProps) {
    return (
      <div className='col-md-6'>
        <div className='card mb-3'>
          <div className='card-body'>
            <div className='d-flex justify-content-between align-items-center'>
              <h5 className='card-title'>{event.name}</h5>
  
              <a className='btn btn-light' href={`/events/${event.id}`}>
                View
              </a>
            </div>
            <p className='small'>
              Status: <strong>{event.status}</strong>
            </p>
            <p>Created By <strong>{event.client.name}</strong></p>
          </div>
        </div>
      </div>
    );
  }