import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";
import EditEventForm from "../components/EditEventForm";
import { useQuery } from "@apollo/client";
import { GET_EVENT } from "../queries/eventQueries";
import DeleteEventForm from "../components/DeleteEventForm";

export default function Event() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_EVENT, { variables: { id } });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;
  
  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>
          <div>
            <h1>Event Name</h1>
            <h3>{data.event.name}</h3>
          </div>
          <p>{data.event.description}</p>

          <h5 className="mt-3">Event Status</h5>
          <p className="lead">{data.event.status}</p>

          <ClientInfo client={data.event.client} />

          <EditEventForm event={data.event} />

          <DeleteEventForm eventId={data.event.id} />
        </div>
      )}
    </>
  );
}
