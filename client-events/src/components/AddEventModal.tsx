import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_EVENT } from '../mutations/eventMutations';
import { GET_EVENTS } from '../queries/eventQueries';
import { GET_CLIENTS } from '../queries/clientQueries';

  interface client  {
    id: number
    name : string
    email : string
    phone : string
  }

export default function AddEventModal() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [clientId, setClientId] = useState('');
  const [status, setStatus] = useState('new');

  const [addEvent] = useMutation(ADD_EVENT  ,  {
    variables: { name, description, date , time , duration,  status , clientId },
    update(cache, { data: { addEvent } }) {
      // const events  = cache.readQuery<EventsResult>({ query: GET_EVENTS });
      const {events} = cache.readQuery<any>({ query: GET_EVENTS  });
      cache.writeQuery({
        query: GET_EVENTS ,
        data: { events: [...events, addEvent] },
      });
    },
  });

  

  // Get Clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (name === '' || description === '' || date === '' || time === '' || duration === '' || status === '') {
      return alert('Please fill in all fields');
    }

    addEvent(name, description, date , time , duration, status , clientId) ;

    setName('');
    setDescription('');
    setDate('');
    setTime('');
    setDuration('');
    setStatus('');
    setClientId('');
  };

  if (loading) return null;
  if (error) return 'Something Went Wrong';

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type='button'
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#addProjectModal'
          >
            <div className='d-flex align-items-center'>
              <FaList className='icon' />
              <div>New Event</div>
            </div>
          </button>

          <div
            className='modal fade'
            id='addProjectModal'
            aria-labelledby='addProjectModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog modal-fullscreen' >
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='addProjectModalLabel'>
                    New Event
                  </h5>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div className='modal-body'>
                  <form onSubmit={onSubmit}>
                    <div className='mb-3'>
                      <label className='form-label'>Name</label>
                      <input
                        type='text'
                        className='form-control'
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Description</label>
                      <textarea
                        className='form-control'
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div className ="row g-3">
                    <div className="col-auto">
                      <label className='form-label'>Date</label>
                      <input
                        className='form-control'
                        type='date'
                        id='Date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <div className="col-auto">
                      <label className='form-label'>Time</label>
                      <input
                        className='form-control'
                        type='time'
                        id='Time'
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </div>
                    <div className="col-auto">
                      <label className='form-label'>Duration</label>
                      <input
                        className='form-control'
                        type='time'
                        id='Duration'
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />
                    </div>
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Status</label>
                      <select
                        id='status'
                        className='form-select'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value='new'>Not Started</option>
                        <option value='progress'>In Progress</option>
                        <option value='completed'>Completed</option>
                      </select>
                    </div>

                    <div className='mb-3'>
                      <label className='form-label'>Created By</label>
                      <select
                        id='clientId'
                        className='form-select'
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                      >
                        <option value=''>Select Client</option>
                        {data.clients.map((client : client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type='submit'
                      data-bs-dismiss='modal'
                      className='btn btn-primary'
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}