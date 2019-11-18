import React, {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from '../auth'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
  
  const Menu = ({history}) => {

    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
  
    return (
      <div>
        <Navbar className="navbar-default" light expand="md">
          <NavbarBrand style= {{color: "#1abc9c"}} tag={Link} to="/">Kevin Yapo</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink className="navlink" style= {{color: "white"}} tag={Link} to="/"><span>Accueil</span></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="navlink" style= {{color: "white"}} tag={Link} to="/about"><span>A propos</span></NavLink>
                </NavItem>
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <NavItem>
                        <NavLink className = "navlink" tag={Link} style= {{color: "white", cursor: "pointer"}} to="/admin/dashboard">
                        <span>Mon Compte</span>
                        </NavLink>
                    </NavItem>
                )}
                <NavItem>
                    <NavLink className="navlink" style= {{color: "white"}} tag={Link} to="/contact"><span>Contact</span></NavLink>
                </NavItem>
                {isAuthenticated() && (
                  <NavItem>
                      <NavLink className = "navlink" tag={Link} to="/" style= {{color: "white", cursor: "pointer"}}  
                          onClick={() => 
                              signout(() => {
                                  history.push('/');    
                              })}>
                          <span><FontAwesomeIcon icon={faPowerOff}/></span>
                      </NavLink>
                  </NavItem>   
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
  
export default withRouter(Menu);