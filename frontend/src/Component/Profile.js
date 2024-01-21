import {useNavigate} from 'react-router-dom';

function Profile(props){

  const navigate = useNavigate();

  const handleDelete = () => {
    navigate("/home/delete");
  }
  return (
    <div>
      <div className='card'>
        My Profile
      </div>
      <div className='card'>
      <div className='actions'>
        <button className='btn' onClick ={handleDelete}>Edit Profile</button>
      </div>
      </div>
    </div>
  )
}
export default Profile;
