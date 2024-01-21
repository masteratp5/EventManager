import {useNavigate} from 'react-router-dom';
import{resetUserSession} from './Service/AuthService';

function Signout(){
  const navigate = useNavigate();
  // logout user
  const handleLogout = () => {
    resetUserSession();
    navigate("/login");
  };

  return (
    <div className='card'>
      <p>Are you sure you want to sign out?</p>
      <button className='btn btn--alt'onClick={() => navigate(-1)}>No</button>
      <button className='btn btn--alt' onClick={handleLogout}>Yes, sign out.</button>
    </div>
  )
}

export default Signout;
