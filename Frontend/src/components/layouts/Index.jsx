import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navbar';
import Footer from './Footer';
import Header from './Header'
import { Row, Col, Container } from 'react-bootstrap';

function Layout() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div id="layout-wrapper" style={{ overflowX: 'hidden' }}>
            <Row>
                <Col className='d-flex justify-content-center bg-dark'>
                    <Header />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Navigation />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Container className='mb-5 mt-5 text-white align-items-center' style={{ minHeight: '70vh' }}>
                        <Outlet />
                    </Container>    
                </Col>
            </Row>
            <Row className='m-0 p-0'>
                <Footer />
            </Row>
        </div>
    );
}

export default Layout;
