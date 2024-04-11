import React, { useState } from "react";
import { Modal, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Hall({ hall, fromdate, todate }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <div className='row bs'>
            <div className="col-md-4">
                <img src={hall.imageurls[0]} className="smallimg" alt={hall.name} />
            </div>
            <div className="col-md-7 text-left">
                <h1>{hall.name}</h1>
                <b>
                    <p>Parking, Reception, Free Wifi</p>
                    <p>
                        <b>Max Count: {hall.maxcount}</b>
                    </p>
                    <p>
                        <b>Phonenumber: </b>
                        {hall.phonenumber}
                    </p>
                    <p>
                        <b>Type: {hall.type}</b>
                    </p>
                </b>
                <div style={{ float: 'right' }}>
                    {(fromdate && todate) && (
                        <Link to={`/book/${hall._id}/${fromdate}/${todate}`}>
                            <button className='btn btn-primary m-2'>Book Now</button>
                        </Link>
                    )}
                    <button className='btn btn-primary' onClick={handleShow}>View Details</button>
                </div>
            </div>
            <CustomModal show={show} handleClose={handleClose} hall={hall} />
        </div>
    );
}

function CustomModal({ show, handleClose, hall }) {
    return (
        <Modal show={show} onHide={handleClose} size="lg" data-aos='zoom-in'>
            <Modal.Header>
                <Modal.Title>{hall.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Carousel nextLabel="" prevLabel="">
                    {hall.imageurls.map((url, index) => (
                        <Carousel.Item key={index}>
                            <img src={url} className="img-fluid" style={{ height: "400px" }} alt={`Hall Image ${index}`} />
                        </Carousel.Item>
                    ))}
                </Carousel>
                <p>{hall.description}</p>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" onClick={handleClose}>CLOSE</button>
            </Modal.Footer>
        </Modal>
    );
}

export default Hall;
