import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItemData } from '../redux/actions/getItem';
import { Row, Col, Card } from 'react-bootstrap';

export default function Home() {
    const dispatch = useDispatch();
    const Data = useSelector((state) => state?.dataItem?.dataItem);

    useEffect(() => {
        dispatch(getItemData());
    }, [dispatch]);

    return (
        <Row xs={1} md={2} lg={3} className="g-4">
            {Data && Data.length > 0 ? (
                Data.map((item) => (
                    <Col key={item?.id} className="mb-3">
                        <Card>
                            {/* <Card.Img variant="top" src={item.picture} alt={item.name} className='pt-4' /> */}
                            <Card.Body>
                                <Card.Title>
                                    <h1>
                                        {item.name}
                                    </h1>
                                </Card.Title>
                                <Card.Text>{item.price}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            ) : (
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Text>Belum Ada Data</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                    
            )}
        </Row>
    );
}
