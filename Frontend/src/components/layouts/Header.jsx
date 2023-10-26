import { useEffect, useState } from 'react';
import {Row, Col} from 'react-bootstrap';

export default function Header() {

    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // const storedName = localStorage.getItem('name');

    const currentTime = new Date().getHours();
    let greeting;

    if (currentTime >= 1 && currentTime < 11) {
        greeting = 'Good Morning ';
    } else if (currentTime >= 11 && currentTime < 18) {
        greeting = 'Good afternoon ';
    } else{
        greeting = 'Good Night ';
    }

    return (
        <Row className='text-white mt-1'>
            <Col md="auto">
                {greeting }
            </Col>
            <Col md="auto mb-2">
                {time}
            </Col>
            <hr/>
        </Row>
    );
}

