import { NavLink } from 'react-router-dom'
import './Navbar.css'

function NavbarComp(){

    return (
        <div className='navbar'>
           <span></span>
            <div className='menu'>
                <ul className='nav-menu'>
                    <NavLink to="/movies" style={{textDecoration: 'none'}}>
                        <li>Movies</li>
                    </NavLink> 
                    <NavLink to="/TVshow" style={{textDecoration: 'none'}}>
                        <li>TV Show</li>
                    </NavLink> 
                    <NavLink to="/contact" style={{textDecoration: 'none'}}>
                        <li>Contact us</li>
                    </NavLink> 
                </ul>

            </div>
        </div>
    )
}

export default NavbarComp