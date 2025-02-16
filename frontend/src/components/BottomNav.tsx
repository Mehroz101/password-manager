import { faLayerGroup, faPlus, faShieldHalved } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../styles/BottomNav.css"
import { useNavigate } from 'react-router-dom'

const BottomNav = () => {
  const navigate = useNavigate()

  return (
    <div className='bottom_navbar'>
        <div className="bottom_navbar_container">
        <div className="bottom_navbar_left">
            <FontAwesomeIcon icon={faLayerGroup}/>
        </div>
        <div className="bottom_navbar_center" onClick={()=>navigate("/addnew")}>
            <FontAwesomeIcon icon={faPlus}/>

        </div>
        <div className="bottom_navbar_right">
        <FontAwesomeIcon icon={faShieldHalved}/>

        </div>
        </div>
      
    </div>
  )
}

export default BottomNav