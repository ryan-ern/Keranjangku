import { Dropdown } from 'react-bootstrap';

const Cart = ({ cartItems }) => {
    return (
        <Dropdown.Menu>
            {console.log(cartItems)}
            {cartItems?.length > 0 ? (
                cartItems.map((item, index) => (
                    <Dropdown.Item key={index}>
                        {item.name} - {item.count_item} pcs
                    </Dropdown.Item>
                ))
            ) : (
                <Dropdown.Item disabled>Keranjang kosong</Dropdown.Item>
            )}
        </Dropdown.Menu>
    );
};

export default Cart;
