import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutData } from '../../redux/actions/logout';
import IMAGES from '../../assets/images/images';

export default function Navigation() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutData(navigate)); // Dispatch the logout action
    };

    const removeActivation = (items) => {
        for (let i = 0; i < items.length; ++i) {
            const item = items[i];
            const parent = items[i].parentElement;
            if (item && item.classList.contains('active')) {
                item.classList.remove('active');
            }
            if (parent) {
                if (parent.classList.contains('active')) {
                    parent.classList.remove('active');
                }
            }
        }
    };

    function activate(item) {
        item.classList.add('active');
    }

    useEffect(() => {
        let matchingMenuItem = null;
        const ul = document.getElementById('navigation');
        const items = ul.querySelectorAll('a');
        removeActivation(items);
        for (let i = 0; i < items.length; ++i) {
            if (window.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) activate(matchingMenuItem);
    }, [location]);

    
    return (
        <Navbar expand="lg" bg="white" className='px-3 pb-3'>
            <Container>
                <Navbar.Brand className='logo-text' href="https://github.com/ryan-ern/Keranjangku" target="_blank">
                    Keranjangku
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto" id="navigation">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/panel" className='nav-link'>
                                    <img src={IMAGES.icon2} alt="" width={18} className='me-1 mb-1'/>
                                    Home
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/panel/item-user" className='nav-link'>
                                    <img src={IMAGES.icon4} alt="" width={18} className='me-1 mb-1'/>
                                    Produk Anda
                                </Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="#" className='nav-link' onClick={handleLogout}>
                                    <img src={IMAGES.icon3} alt="" width={18} className='me-1 mb-1'/>
                                    Logout
                                </Link>
                            </li>
                        </ul>

                        {/*<ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/ryanporto/panel/api/news" className='nav-link'>New&apos;s</Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/ryanporto/panel/contact" className='nav-link'>Contact</Link>
                            </li>
                        </ul> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
