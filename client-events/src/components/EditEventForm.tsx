import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_EVENT } from "../queries/eventQueries";
import { UPDATE_EVENT } from "../mutations/eventMutations";

interface EventProps {
    event:{
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
  }

export default function EditEventForm({ event} : EventProps) {
  const [name, setName] = useState(event.name);
  const [description, setDescription] = useState(event.description);
  const [date, setDate] = useState(event.date);
  const [time, setTime] = useState(event.time);
  const [duration, setDuration] = useState(event.duration);
  const [clientId, setClientId] = useState('');
  const [status, setStatus] = useState(() => {
    switch (event.status) {
      case "Not Started":
        return "new";
      case "In Progress":
        return "progress";
      case "Completed":
        return "completed";
      default:
        throw new Error(`Unknown status: ${event.status}`);
    }
  });

  const [updateProject] = useMutation(UPDATE_EVENT, {
    variables: { id: event.id, name, description,date , time , duration, status  , clientId},
    refetchQueries: [{ query: GET_EVENT , variables: { id: event.id } }],
  });

  const onSubmit =  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name === '' || description === '' || date === '' || time === '' || duration === '' || status === '') {
      return alert("Please fill out all fields");
    }

    updateProject(name, description, date , time , duration, status , clientId);
  };

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
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
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}