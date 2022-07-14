import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Spinner } from 'react-bootstrap';
import Chart from './Chart';
import React, { useState, useCallback } from 'react';
import BatteryDetails from './BatteryDetails';
import Modal from './Modal';

function BatteryTable(props) {
    const [bat, setBat] = useState({})
    const [show, setShow] = useState(false);//for the modal with details of each individual battery
    const [modalData, setModalData] = useState({});//to display the data of a single chosen battery in the modal
    const [loadingbat, setLoadingbat] = useState(true)
    /* modal */
    const [isShowing, setIsShowing] = useState(false);

    function toggle() {
        setIsShowing(!isShowing);
    }
    /* for individual entity view display */
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const url = 'https://f2byongc84.execute-api.eu-central-1.amazonaws.com/webdev_test_fetch_batteries?id=' //url for fetching individual battery info
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
        <div>
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
                    {
                        props.filtered.map(
                            (battery) =>
                            (<tr key={battery.id}>
                                <td>
                                    <Button className='button' variant="outline-info" size='sm' onClick={() => {
                                        //handleShow()
                                        toggle()
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
            <Modal isShowing={isShowing} hide={toggle} modalData={bat} loading={loadingbat}>
            </Modal>
        </div>
    )
}

export default BatteryTable;