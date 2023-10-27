import { Container, Row, Col } from 'react-bootstrap';
import '../../assets/style/footer.css'

export default function Footer() {
    return (
        <div className="main-footer">
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }} className="text-center">
                        <hr />
                        <span className='text-dark'>&copy; Ryan Ernanda | 2023 - </span>
                        <span className="text-center text-dark">{new Date().getFullYear()}</span>                       
                    </Col>
                </Row>
            </Container>
        </div>
    )
}