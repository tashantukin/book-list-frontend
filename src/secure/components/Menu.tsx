 import React from 'react'
 import {NavLink} from 'react-router-dom'

const Menu = () => (
 
 <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div className="position-sticky pt-3">
            <ul className="nav flex-column">
              <li className="nav-item">
                <NavLink to={'/dashboard'}className="nav-link">
                  Dashboard
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={'/books'}className="nav-link">
                    Books
                </NavLink>
              </li>
            
            </ul>
          </div>
        </nav>
)


export default Menu;