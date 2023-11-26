import { FaTrash } from "react-icons/fa";
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_EVENTS } from '../queries/eventQueries';

interface ClientProps {
  client:{
      id : string;
      name : string;
      email : string;
      phone : string
  }
}

export default function ClientRow({ client}: ClientProps) {
  // const [deleteClient] = useMutation(DELETE_CLIENT, {
  //    variables: { id: client.id },
  //   refetchQueries: [{ query: GET_CLIENTS }, { query: GET_EVENTS }],
  // });
  const [deleteClient] = useMutation(DELETE_CLIENT)

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        {/* <button className='btn btn-danger btn-sm' onClick={deleteClient}> */}
        <button className='btn btn-danger btn-sm' onClick={()=>deleteClient( {
     variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_EVENTS }]})}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}