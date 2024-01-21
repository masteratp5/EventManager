import {useState} from 'react';
import AddClub from './Component2/AddClub';
import CreateClub from './Component2/CreateClub';
import Backdrop from './Component2/Backdrop';

function CardAC(props){
  const [addIsOpen, setAddIsOpen] = useState(false);
  const [createIsOpen, setCreateIsOpen] = useState(false);

  function openAdd(){
    setAddIsOpen(true);
  }

  function closeAdd(){
    setAddIsOpen(false);
  }

  function openCreate(){
    setCreateIsOpen(true);
  }

  function closeCreate(){
    setCreateIsOpen(false);
  }

  return (
    <div className='card'>
      Add/Create Club
      <div className='actions'>
        <button className='btn' onClick={openAdd}>Add Club</button>
      </div>
      {addIsOpen && <AddClub onCancel={closeAdd}/>}
      {addIsOpen && <Backdrop onCancel={closeAdd}/>}
      <div className='actions'>
        <button className='btn' onClick={openCreate}>Create Club</button>
      </div>
      {createIsOpen && <CreateClub onCancel={closeCreate}/>}
      {createIsOpen && <Backdrop onCancel={closeCreate}/>}
    </div>
  );
}

export default CardAC;
