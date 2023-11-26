import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { DELETE_EVENT } from "../mutations/eventMutations";
import { GET_EVENTS } from "../queries/eventQueries";
import { useMutation } from "@apollo/client";

interface eventId {
  eventId: number;
}

export default function DeleteEventForm({ eventId }: eventId) {
  const navigate = useNavigate();

  const [deleteEvent] = useMutation(DELETE_EVENT);

  return (
    <div className="d-flex mt-5 ms-auto">
      <button
        className="btn btn-danger m-2"
        onClick={() =>
          deleteEvent({
            variables: { id: eventId },
            onCompleted: () => navigate("/"),
            refetchQueries: [{ query: GET_EVENTS }],
          })
        }
      >
        <FaTrash className="icon" /> Delete Project
      </button>
    </div>
  );
}
