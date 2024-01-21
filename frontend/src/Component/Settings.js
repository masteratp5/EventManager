import {useNavigate} from 'react-router-dom';

function Settings(props){

  const navigate = useNavigate();

  const handleDelete = () => {
    navigate("/home/deleter");
  }
  return (
    <div>
      <div className='card'>
        Settings
      </div>
      <div className='card'>
      <div className='actions'>
        <button className='btn' onClick ={handleDelete}>Delete Account</button>
      </div>
      </div>
    </div>
  )
}
export default Settings;
