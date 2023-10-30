import { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import { updateData } from '../../redux/actions/updateItem';
import { createData } from '../../redux/actions/createItem';

export default function ModalCRUD({ show, onHide, selectedItem, updateItem }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        stok: '',
        price: '',
    });

    const [isUpdating, setIsUpdating] = useState(false); // state untuk menentukan apakah ini mode update
    const [isDetail, setIsDetail] = useState(false); // state untuk menentukan apakah ini mode update

    // useEffect untuk mengisi data form saat mode update/detail
    useEffect(() => {
        if (updateItem) {
            setFormData({
                name: updateItem.name,
                description: updateItem.description,
                stok: updateItem.stok,
                price: updateItem.price,
            });
            setIsDetail(false);
            setIsUpdating(true);
        }
        else if(selectedItem) {
            setFormData({
                name: selectedItem.name,
                description: selectedItem.description,
                stok: selectedItem.stok,
                price: selectedItem.price,
            });
            setIsUpdating(false);
            setIsDetail(true);
        }
    }, [updateItem, selectedItem]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        const itemData = { ...formData };

        if (isUpdating) {
            // Jika mode update, kirim pembaruan data
            dispatch(updateData(updateItem.id, itemData));
        } else {
            // Jika mode buat data baru
            dispatch(createData(itemData));
        }

        onHide();
        setIsUpdating(false); // Reset mode update
        setIsDetail(false); // Reset mode detail
        setFormData({
            name: '',
            description: '',
            stok: '',
            price: '',
        });
    };

    const handleClose = () => {
        onHide();
        setIsUpdating(false);
        setIsDetail(false); 
        setFormData({
            name: '',
            description: '',
            stok: '',
            price: '',
        });
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {isUpdating ? 'Update Item' : isDetail ? 'Detail Item' : 'Create Item'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isDetail ? (
                    <span>
                        <h1>
                            {formData.name}
                        </h1>
                        <b>
                            Deskripsi
                        </b>
                        <div>
                            {formData.description}
                        </div>
                        <b>
                            Stok tersisa
                        </b>
                        <div>
                            {formData.stok}
                        </div>
                        <b>
                            Harga
                        </b>                                    
                        <div>
                            {formData.price.toLocaleString('id-ID', {minimumIntegerDigits: 3})}
                        </div>
                    </span>
                ):(
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
                )}
                        
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {isUpdating ? (
                    <Button variant="primary" onClick={handleSubmit}>
                Update Item
                    </Button>
                ) : isDetail ? (
                    <></>
                ) : (
                    <Button variant="primary" onClick={handleSubmit}>
                Create Item
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}
