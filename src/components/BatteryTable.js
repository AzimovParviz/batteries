import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Spinner, Table } from 'react-bootstrap';
import Chart from './Chart';
import React, { useState, useEffect } from 'react';

function BatteryTable (props) {
    const [show, setShow] = useState(false);//for the modal with details of each individual battery
    const [modalData, setModalData] = useState({});//to display the data of a single chosen battery in the modal
    /* for individual entity view display */
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <Table striped bordered hover responsive>
                {/* conditional rendering so the table headers won't appear while waiting for the API response */
                !props.loading &&
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                Capacity
                            </th>
                            <th>
                                Connection Status
                            </th>
                            <th>
                                Last Connection Time
                            </th>
                            <th>
                                Location
                            </th>
                            <th>
                                Recent Issues
                            </th>
                            <th>
                                State of Charge
                            </th>
                            <th>
                                State of Health
                            </th>
                            <th>
                                Voltage
                            </th>
                        </tr>
                    </thead>
                }
                <tbody>
                    <td>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Battery {modalData.id} details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {/* conditional rendering to avoid displaying empty graphs and battery level when data is not available */}
                                {modalData.stateOfCharge && <div className='battery'><div className='batteryLevel' style={{width:modalData.stateOfCharge*50/100}}></div><span>{modalData.stateOfCharge} %</span></div>}
                                <br></br>
                                {modalData.stateOfCharge && <p>hover on the graph for details</p>}
                                {modalData.stateOfCharge && <Chart timestamp={modalData.lastConnectionTime} stateOfCharge={modalData.stateOfCharge} deadline={modalData.endOfLifeDate} />}
                                {!modalData.stateOfCharge && <p>state of charge data is not available</p>}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className='button' variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </td>
                    {
                        props.filtered.map(
                            (battery) =>
                            (<tr key={battery.id}>
                                <td>
                                    <Button className='button' variant="outline-info" size='sm' onClick={() => {
                                        handleShow();
                                        setModalData(battery)
                                    }}>
                                        {battery.id}
                                    </Button>
                                </td>
                                <td>{battery.capacity}</td>
                                <td>{battery.connectionStatusId}</td>
                                <td>{battery.lastConnectionTime}</td>
                                <td>{battery.location}</td>
                                <td>{battery.recentIssues.join(', ')}</td>
                                <td>{battery.stateOfCharge}</td>
                                <td>{battery.stateOfHealth}</td>
                                <td>{battery.voltage}</td>
                            </tr>)
                        )
                    }
                </tbody>
            </Table>
    )
}

export default BatteryTable;