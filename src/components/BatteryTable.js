import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Table, Spinner } from 'react-bootstrap';
import Chart from './Chart';
import React, { useState, useEffect, useCallback } from 'react';

function BatteryTable(props) {
    const [bat, setBat] = useState({})
    const [show, setShow] = useState(false);//for the modal with details of each individual battery
    const [modalData, setModalData] = useState({});//to display the data of a single chosen battery in the modal
    const [loadingbat, setLoadingbat] = useState(true)
    /* for individual entity view display */
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const url = 'https://f2byongc84.execute-api.eu-central-1.amazonaws.com/webdev_test_fetch_batteries?id=' //url for fetching individual battery info
    /* useEffect(() => {
        if (show) {
            console.log(modalData.id)
            fetch(url + modalData.id)
                .then(res => {
                    res.json()
                    res.text()
                })
                .then(response => {
                    setBat(response)
                    console.log(response)
                })

        }
    }, [])
 */
    const batteryCache = new Map()
    const fetchRequest = async (id) => {
        if (!batteryCache.has(id)) {
            batteryCache.set(id, fetch(url + id).then(res => res.json()))
        }
        const response = await batteryCache.get(id)
        setBat(response)
        setLoadingbat(false)
        console.log(bat)
    }

    return (
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
                            {loadingbat &&
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            }
                            {/* conditional rendering to avoid displaying empty graphs and battery level when data is not available */}
                            {bat.stateOfCharge && <div className='battery'><div className='batteryLevel' style={{ width: modalData.stateOfCharge * 50 / 100 }}></div><span>{modalData.stateOfCharge} %</span></div>}
                            <br></br>
                            {bat.stateOfCharge && <p>hover on the graph for details</p>}
                            {bat.stateOfCharge && <Chart stamp={bat.measurements} stateOfCharge={bat.stateOfCharge} /* deadline={modalData.endOfLifeDate} */ />}
                            {!bat.stateOfCharge && <p>state of charge data is not available</p>}
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
                                    handleShow()
                                    setLoadingbat(true)
                                    setModalData(battery)
                                    fetchRequest(battery.id)
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