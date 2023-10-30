import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItemData } from '../redux/actions/getItem';
import { Row, Col, Card, Button, FloatingLabel, Form } from 'react-bootstrap';
import ModalCRUD from '../components/modals/modal';
import { addData } from '../redux/actions/addItem';

export default function Home() {
    const dispatch = useDispatch();
    const Data = useSelector((state) => state?.dataItem?.dataItem);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setselectedItem] = useState(null); // Menyimpan item yang dipilih untuk diperbarui
    const [countItem, setCountItem] = useState(''); // Menyimpan item yang dipilih untuk diperbarui

    const showModal = (item) => {
        setselectedItem(item); // Mengatur item yang dipilih untuk diperbarui
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setselectedItem(null); // Mengatur item yang dipilih kembali ke null
        setIsModalVisible(false);
    };

    const handleSubmit = (item) => {
        // console.log(item);
        const formData = {
            item_id: item.id, // ID item yang akan ditambahkan ke keranjang
            count_item: parseInt(countItem)  // Jumlah item yang akan ditambahkan
        };
        dispatch(addData(formData));
    };


    useEffect(() => {
        dispatch(getItemData());
    }, [dispatch]);

    return (
        <>
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
                                    <Card.Text>
                                        {item.price.toLocaleString('id-ID', { minimumIntegerDigits: 3 })}
                                    </Card.Text>
                                    <h6>Mau Berapa?</h6>
                                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(item); }}>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Masukan Jumlah disini"
                                            className="mb-3"
                                        >
                                            <Form.Control type="number" required onChange={(e) => setCountItem(e.target.value)} />
                                        </FloatingLabel>
                                        <Button variant='outline-info' onClick={() => showModal(item)}>Detail</Button>
                                        <Button variant='outline-success' type='submit' className='mx-3'>Tambah Keranjang</Button>
                                    </Form>
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
                <ModalCRUD show={isModalVisible} onHide={hideModal} updateItem={null} selectedItem={selectedItem} />
            </Row>
        </>
    );
}
