import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItemUserData } from '../redux/actions/getItem';
import { deleteData } from '../redux/actions/deleteItem';
import { Row, Col, Card, Button } from 'react-bootstrap';
import ModalCRUD from '../components/modals/modal';

export default function ItemUser() {
    const dispatch = useDispatch();
    const dataItems = useSelector((state) => state?.dataItemUser?.dataItemUser);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [updateItem, setupdateItem] = useState(null); // Menyimpan item yang dipilih untuk diperbarui

    const showModal = (item) => {
        setupdateItem(item); // Mengatur item yang dipilih untuk diperbarui
        setIsModalVisible(true);
    };

    const confimHandle = (item) => {
        const message = window.confirm("Are You Sure?")
        if (message){
            dispatch(deleteData(item.id));
        }
    }

    const hideModal = () => {
        setupdateItem(null); // Mengatur item yang dipilih kembali ke null
        setIsModalVisible(false);
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
                                    <h1>
                                        {item.name}
                                    </h1>
                                    <b>
                                        Deskripsi
                                    </b>
                                    <div>
                                        {item.description}
                                    </div>
                                    <b>
                                        Stok tersisa
                                    </b>
                                    <div>
                                        {item.stok}
                                    </div>
                                    <b>
                                        Harga
                                    </b>                                    
                                    <div>
                                        {item.price.toLocaleString('id-ID', {minimumIntegerDigits: 3})}
                                    </div>
                                    <Button variant='outline-primary' className='mt-3' onClick={() => showModal(item)}>
                                        Perbarui
                                    </Button>
                                    <Button variant='outline-danger' className='mt-3 mx-3' onClick={() => confimHandle(item)}>
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
            <ModalCRUD show={isModalVisible} onHide={hideModal} updateItem={updateItem} selectedItem={null} />
        </>
    );
}
