import { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import { updateData } from '../../redux/actions/updateItem';
import { createData } from '../../redux/actions/createItem';

export default function ModalCRUD({ show, onHide, selectedItem }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        stok: '',
        price: '',
    });

    const [isUpdating, setIsUpdating] = useState(false); // Tambahkan state untuk menentukan apakah ini mode update

    // Tambahkan useEffect untuk mengisi data form saat mode update
    useEffect(() => {
        if (selectedItem) {
            setFormData({
                name: selectedItem.name,
                description: selectedItem.description,
                stok: selectedItem.stok,
                price: selectedItem.price,
            });
            setIsUpdating(true);
        }
    }, [selectedItem]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        const itemData = { ...formData };

        if (isUpdating) {
            // Jika mode update, kirim pembaruan data
            dispatch(updateData(selectedItem.id, itemData));
        } else {
            // Jika mode buat data baru
            dispatch(createData(itemData));
        }

        onHide();
        setIsUpdating(false); // Reset mode update
        setFormData({
            name: '',
            description: '',
            stok: '',
            price: '',
        });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{isUpdating ? 'Update Item' : 'Create Item'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formStok">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control type="number" name="stok" value={formData.stok} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" value={formData.price} onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {isUpdating ? 'Update Item' : 'Create Item'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
