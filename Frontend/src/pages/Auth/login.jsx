import { useState, useEffect } from 'react';
import { Button, Form, FloatingLabel, Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import IMAGES from '../../assets/images/images';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginData } from '../../redux/actions/login';
import { useNavigate } from 'react-router-dom';
import { getAuth } from '../../redux/actions/Auth';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((state) => state.dataLogin);
    const loading = useSelector((state) => state.loading);
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleUserChange = (e) => {
        setUser(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        dispatch(loginData({formData, navigate}));
    };

    useEffect(() => {
        dispatch(getAuth()).then((response) => {
            if (response.isLogin) {
                navigate("/panel");
            }
        });
    }, [dispatch, navigate]);
    
    return (
        <div className="my-5 pt-sm-5">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6} xl={5}>
                        <Card className="overflow-hidden p-5">
                            <Row>
                                <Col xs={12} lg={4} className="mx-2 d-flex align-items-center justify-content-center">
                                    <img src={IMAGES.icon1} alt=""  width={'200px'} />
                                </Col>
                                <Col xs={12} lg={7}>
                                    <div className="p-3">
                                        <h5>
                                            <span className='logo-text'>Keranjangku</span> Login
                                        </h5>
                                        <p>Login untuk dapat mengakses dashboard!</p>
                                    </div>
                                </Col>
                            </Row>
                            <Form onSubmit={handleSubmit}>
                                {data?.message === "error" && (
                                    <Alert variant='danger'>
                                        {data.description}
                                    </Alert>
                                )}
                                {data?.message === "ok" && (
                                    <Alert variant='primary'>
                                        {data.description}
                                    </Alert>
                                )}
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Masukkan Username Anda!"
                                    className="mb-3"
                                >
                                    <Form.Control type="text" placeholder='Masukkan Username Anda!' value={username} onChange={handleUserChange} autoComplete="username" required/>
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingPassword"
                                    label="Masukkan Password Anda!"
                                    className='mb-5'
                                >
                                    <Form.Control type="password" placeholder='Masukkan Password Anda!' value={password} onChange={handlePasswordChange} autoComplete="current-password" required />
                                </FloatingLabel>
                                <div className="d-grid gap-2 mb-3">
                                    <Button variant="outline-primary" type="submit" size="lg">
                                        {loading ?
                                            <Spinner animation="border" variant="light" size="sm"/>
                                            :
                                            <span>Login</span>
                                        }
                                    </Button>
                                    <div className='text-center'>
                                        Atau
                                    </div>
                                    <Button variant="outline-success" type="submit" size="lg">
                                        <Link to='/register' className='nav-link'>Registrasi</Link>
                                    </Button>
                                </div>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
