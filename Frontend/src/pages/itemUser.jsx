import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItemUserData } from '../redux/actions/getItem';
import { deleteData } from '../redux/actions/deleteItem';
import { Row, Col, Card, Button } from 'react-bootstrap';
import ModalCRUD from '../components/modals/modal';

export default function ItemUser() {
    const dispatch = useDispatch();
    const dataItems = useSelector((state) => state?.dataItemUser?.dataItemUser);
    console.log(dataItems)

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); // Menyimpan item yang dipilih untuk diperbarui

    const showModal = (item) => {
        setSelectedItem(item); // Mengatur item yang dipilih untuk diperbarui
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setSelectedItem(null); // Mengatur item yang dipilih kembali ke null
        setIsModalVisible(false);
    };

    const handleDelete = (itemId) => {
        dispatch(deleteData(itemId));
    };

    useEffect(() => {
        dispatch(getItemUserData());
    }, [dispatch]);

    return (
        <>
            <Button onClick={() => showModal(null)} variant='outline-success' className='mb-3'>
                Tambah Data
            </Button>
            <Row xs={1} md={2} lg={3} className="g-4">
                {dataItems && dataItems.length > 0 ? (
                    dataItems.map((item) => (
                        <Col key={item?.id} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <h1>{item.name}</h1>
                                    </Card.Title>
                                    <Card.Text>
                                        <h5>Deskripsi</h5>
                                        {item.description}
                                    </Card.Text>
                                    <Card.Text>
                                        Stok tersisa = 
                                        {item.stok}
                                    </Card.Text>
                                    
                                    <Card.Text>{item.price}</Card.Text>
                                    <Button variant='outline-primary' onClick={() => showModal(item)}>
                                        Perbarui
                                    </Button>
                                    <Button variant='outline-danger' className='mx-3' onClick={() => handleDelete(item.id)}>
                                        Hapus
                                    </Button>
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
            <ModalCRUD show={isModalVisible} onHide={hideModal} selectedItem={selectedItem} />
        </>
    );
}
