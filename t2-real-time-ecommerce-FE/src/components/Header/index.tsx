import { useDispatch } from "react-redux";
import { Button } from "reactstrap"
import { AppDispatch } from "state/store";
import { useNavigate } from 'react-router-dom'
import { logout } from 'slice/user'

const Header = ({pageName = '', role = '', userInfo = {name: ''}}) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('roleName')
    dispatch(logout());
    navigate("/login");
  }

  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
        <h1>{pageName}</h1>
        <div className='d-flex align-items-center'>
          <h3 className='mr-3 mb-0'>Welcome, {role} {userInfo.name}</h3>
          <Button color='danger' outline onClick={handleLogout}>Log out</Button>
        </div>
      </div>
  )
}

export default Header