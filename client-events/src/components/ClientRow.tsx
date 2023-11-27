import { FaTrash } from "react-icons/fa";
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_EVENTS } from '../queries/eventQueries';


interface client {
  id : string;
  name : string;
  email : string;
  phone : string
}
interface Props {
  id: string;
  client: client;
}



export default function ClientRow( Props : Props) {
  const [deleteClient] = useMutation(DELETE_CLIENT)
  return (
    <tr key={Props.id}>
      <td>{Props.client.name}</td>
      <td>{Props. client.email}</td>
      <td>{Props.client.phone}</td>
      <td>
        <button className='btn btn-danger btn-sm' onClick={()=>deleteClient( {
     variables: { id: Props.client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_EVENTS }]})}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}