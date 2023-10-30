import { Navbar, Container, Nav, Toast, ToastContainer, Table } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutData } from '../../redux/actions/logout';
import IMAGES from '../../assets/images/images';
import { getCartData } from '../../redux/actions/getCart';

export default function Navigation() {
    const data = useSelector((state) => state?.dataCart?.cart_items)
    const [showToast, setShowToast] = useState(false);
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
                                <Link to="/panel" className={`nav-link ${showToast ? 'disabled' : ''}`}>
                                    <img src={IMAGES.icon2} alt="" width={18} className='me-1 mb-1'/>
                                    Home
                                </Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/panel/item-user" className={`nav-link ${showToast ? 'disabled' : ''}`}>
                                    <img src={IMAGES.icon4} alt="" width={18} className='me-1 mb-1'/>
                                    Produk Anda
                                </Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="#" className='nav-link' onClick={() => {
                                    dispatch(getCartData());
                                    setShowToast(true);
                                }}>
                                    <img src={IMAGES.icon5} alt="" width={18} className='me-1 mb-1' />
                                    Keranjang
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
                    </Nav>
                    <ToastContainer position="top-end" className='mt-5 mx-5' >
                        <Toast show={showToast} onClick={() => setShowToast(false)} onClose={() => setShowToast(false)}  delay={10_000} autohide style={{minWidth:'500px'}}>
                            <Toast.Header>
                                <strong className="me-auto">Keranjang Anda</strong>
                            </Toast.Header>
                            <Toast.Body>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Nama Barang</th>
                                            <th>Total Jumlah</th>
                                            <th>Harga</th>
                                            <th>Total Harga</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data && data.length > 0 ? (
                                            data.map((item) => (
                                                <tr key={item?.id}>
                                                    <td>{item.name}</td>
                                                    <td>{item.count_item}</td>
                                                    <td>{item.price.toLocaleString('id-ID', { minimumIntegerDigits: 3 })}</td>
                                                    <td>{(item.price * item.count_item).toLocaleString('id-ID', { minimumIntegerDigits: 3 })}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4">
                                                    <center>
                                                        Belum ada item dalam keranjang
                                                    </center>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                                <span>
                                    {data && data.length > 0 ? (
                                        <span>
                                            Total Keseluruhan Harga: <b>{data?.reduce((total, item) => total + (item.price * item.count_item), 0).toLocaleString('id-ID', { minimumIntegerDigits: 3 })}
                                            </b>
                                        </span>
                                    
                                    ):(
                                        <span></span>
                                    )}
                                </span>
                            </Toast.Body>
                          
                        </Toast>
                    </ToastContainer>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
