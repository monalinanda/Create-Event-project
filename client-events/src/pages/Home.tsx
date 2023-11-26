
import {AddClientModal}  from "../components/AddClientModal";
import AddEventModal from "../components/AddEventModal";
import Clients from "../components/Clients";
import {Events}  from "../components/Events";

export default function Home() {
  return (
    <>
      <div className='d-flex gap-3 mb-4'>
        <AddClientModal />
      <AddEventModal/>
      </div>
      <Events />
      <hr />
      <Clients />
    </>
  );
}