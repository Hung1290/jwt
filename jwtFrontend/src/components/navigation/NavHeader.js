import React, { useContext } from 'react';
import './nav.scss'
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom'
import { UserContext } from '../../context/UserContext';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from '../../logo.svg'
import { logoutUser } from '../../services/userService'
import { toast } from 'react-toastify'

const NavHeader = (props) => {
    const { user, logoutContext } = useContext(UserContext)
    const location = useLocation()
    const history = useHistory()

    const handleLogout = async () => {
        let data = await logoutUser()
        localStorage.removeItem('jwt')
        logoutContext()

        if (data && +data.EC === 0) {
            history.push('/login')
        } else {
            toast.error(data.EM)
        }
    }
    if (user && user.isAuthenticated === true || location.pathname === '/') {
        return (
            <>
                <div className='nav-header'>
                    <Navbar bg='header' expand='lg'>
                        <Container>
                            <Navbar.Brand href="#home">
                                <img
                                    src={logo}
                                    width='30'
                                    height='30'
                                    className='d-inline-block align-top'
                                />
                                <span className='brand-name'></span> React
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/" exact className='nav-link'>Home</Nav.Link>
                                    <Nav.Link href="/users" className='nav-link'>Users</Nav.Link>
                                    <Nav.Link href="/roles" className='nav-link'>Roles</Nav.Link>
                                    <Nav.Link href="/group-role" className='nav-link'>Group Role</Nav.Link>
                                    <Nav.Link href="/projects" className='nav-link'>Projects</Nav.Link>
                                    <Nav.Link href="/about" className='nav-link'>About</Nav.Link>
                                </Nav>
                                <Nav>
                                    {
                                        user && user.isAuthenticated === true
                                            ?
                                            <>
                                                <Nav.Item className='nav-link'>
                                                    Welcome {user.account.username} !
                                                </Nav.Item>
                                                <NavDropdown title="Settings" id="basic-nav-dropdown">
                                                    <NavDropdown.Item>Change Password</NavDropdown.Item>
                                                    <NavDropdown.Divider />
                                                    <NavDropdown.Item>
                                                        <span onClick={() => handleLogout()}>Log out</span>
                                                    </NavDropdown.Item>
                                                </NavDropdown>
                                            </>
                                            :
                                            <Link className='nav-link' to='/login'>
                                                Login
                                            </Link>
                                    }
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </>
        );
    } else {
        return <></>
    }

}

export default NavHeader;