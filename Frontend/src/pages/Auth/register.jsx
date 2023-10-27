import { useState } from 'react';
import { Button, Form, FloatingLabel, Container, Row, Col, Card, Alert, Spinner} from 'react-bootstrap';
import IMAGES from '../../assets/images/images';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerData } from '../../redux/actions';

export default function Register() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data);
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
        dispatch(registerData(formData));
    };

    return (
        <div className="my-5 pt-sm-5">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6} xl={5}>
                        <Card className="overflow-hidden">
                            <Row>
                                <Col xs={8}>
                                    <div className="p-4">
                                        <h5>
                                            Keranjangku Register
                                        </h5>
                                        <p>Register untuk dapat mengakses dashboard!</p>
                                    </div>
                                </Col>
                                <Col className="col-4 align-self-start">
                                    <img src={IMAGES.icon1} alt=""  width={'200px'} className="img-fluid"  />
                                </Col>
                            </Row>
                            <Form onSubmit={handleSubmit}>
                                {data.message === "error" && (
                                    <Alert variant='danger'>
                                        {data.description}
                                    </Alert>
                                )}
                                {data.message === "ok" && (
                                    <Alert variant='primary'>
                                        {data.description}
                                    </Alert>
                                )}
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Masukkan Username Anda!"
                                    className="mb-3"
                                >
                                    <Form.Control type="text" placeholder='Masukkan Username Anda!' value={username} onChange={handleUserChange} required autoComplete="username"/>
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingPassword"
                                    label="Masukkan Password Anda!"
                                    className='mb-5'
                                >
                                    <Form.Control type="password" placeholder='Masukkan Password Anda!' value={password} onChange={handlePasswordChange}required autoComplete="current-password"/>
                                </FloatingLabel>
                                <div className="d-grid gap-2 mb-3">
                                    <Button variant="outline-primary" type="submit" size="lg">
                                        {loading ?
                                            <Spinner animation="border" variant="light" size="sm"/>
                                            :
                                            <span>Register</span>
                                        }
                                    </Button>
                                    <div className='text-center'>
                                        Atau
                                    </div>
                                    <Button variant="outline-success" type="submit" size="lg">
                                        <Link to='/login' className='nav-link'>Login</Link>
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
