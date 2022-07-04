import '../App.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Spinner } from 'react-bootstrap';
import Chart from './Chart';
import SearchBar from './SearchBar';

function ListBatteries() {
    const [batteries, setBatteries] = useState([]);//array of all batteries
    const [show, setShow] = useState(false);//for the modal with details of each individual battery
    const [modalData, setModalData] = useState({});//to display the data of a battery in the modal
    const [loading, setLoading] = useState(true);//to know when to display the loading icon
    const [termID, setTermID] = useState('');//for the search terms used for filtering
    const [termLocation, setTermLocation] = useState('');
    const [termConnection, setTermConnection] = useState(0);
    const [termCharge, setTermCharge] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const url = 'https://f2byongc84.execute-api.eu-central-1.amazonaws.com/webdev_test_fetch_batteries'

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(response => {
                console.log(response)
                setBatteries(response)
                setLoading(false)
            })
    }, [])
    /*
    
    batteryStatus: 1
    
    capacity: 25
    
    connectionStatus: 3
    
    endOfLifeDate: "2025-01-20T02:43:52.464Z" not a thing anymore :0
    
    id: "B-30964"
    
    lastConnectionTime: "2022-07-01T08:51:48.464Z"
    
    location: "Port"
    
    recentIssues: [4] (1)
    
    stateOfCharge: null
    
    stateOfHealth: 52
    
    voltage: 24
     */
    var filtered = batteries;
    if (termID || termLocation || termConnection || termCharge) filtered = batteries.filter(resp => {
        return resp.id === termID || resp.location === termLocation || resp.connectionStatus == termConnection || resp.stateOfCharge == termCharge;
    })
    console.log(termCharge)
    console.log(termConnection)
    return (
        <div className='ListBatteries'>
            {loading &&
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            }
            {!loading &&
                <><SearchBar
                    handleLocChange={e => setTermLocation(e.target.value)}
                    handleIdChange={e => setTermID(e.target.value)}
                    handleChargeChange={e => setTermCharge(e.target.value)}
                    handleConChange={e => setTermConnection(e.target.value)}
                    /><Button onClick={() => {
                        setTermLocation('');
                        setTermCharge('');
                        setTermConnection('');
                        setTermID('');
                    } }>RESET</Button></>
            }
            <table>
                {!loading &&
                    <tr>
                        <th>

                        </th>
                        <th>
                            Status
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
                }
                <td>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Battery {modalData.id} details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {modalData.stateOfCharge && <p>hover for details</p>}
                            {modalData.stateOfCharge && <Chart timestamp={modalData.lastConnectionTime} stateOfCharge={modalData.stateOfCharge} deadline={modalData.endOfLifeDate} />}
                            {!modalData.stateOfCharge && <p>state of charge data is not available</p>}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </td>
                {
                    filtered.map(
                        (battery) =>
                        (<tr key={battery.id}>
                            <td>
                                <Button variant="primary" onClick={() => {
                                    handleShow();
                                    setModalData(battery)
                                }}>
                                    show details
                                </Button>
                            </td>
                            <td>{battery.batteryStatus}</td>
                            <td>{battery.capacity}</td>
                            <td>{battery.connectionStatus}</td>
                            <td>{battery.lastConnectionTime}</td>
                            <td>{battery.location}</td>
                            <td>{battery.recentIssues}</td>
                            <td>{battery.stateOfCharge}</td>
                            <td>{battery.stateOfHealth}</td>
                            <td>{battery.voltage}</td>
                        </tr>)
                    )
                }
            </table>
        </div>
    )
}

export default ListBatteries;