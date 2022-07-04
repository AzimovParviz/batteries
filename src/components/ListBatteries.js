import '../App.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Spinner, Table } from 'react-bootstrap';
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
                for (var i = 0; i<response.length;i++)
                {
                    switch(response[i].connectionStatusId) {
                        case 1:
                            response[i].connectionStatusId = 'online'
                            break;
                        case 2:
                            response[i].connectionStatusId = 'pending'
                            break;
                        case 3:
                            response[i].connectionStatusId = 'offline'
                            break;
                        default:
                            break;
                    }
                    for (var j = 0; j<response[i].recentIssues.length;j++)
                    {
                        switch(response[i].recentIssues[j]) {
                            case 1:
                                response[i].recentIssues[j] = 'deep discharge'
                                break;
                            case 2:
                                response[i].recentIssues[j] = 'overheating'
                                break;
                            case 3:
                                response[i].recentIssues[j] = 'unknown anomaly'
                                break;
                            case 4:
                                response[i].recentIssues[j] = 'missing data'
                                break;
                            default:
                                break;
                        }
                    }
                }
                setBatteries(response)
                setLoading(false)
            })
    }, [])
    /*
    capacity: 50
    
    connectionStatus: 2
    
    connectionStatusId: 2
    
    id: "D-62456"
    
    lastConnectionTime: "2022-07-02T11:12:33.083Z"
    
    location: "Warehouse"
    
    recentIssues: [] (0)
    
    stateOfCharge: null
    
    stateOfHealth: 72
    
    voltage: 36
     */
    var filtered = batteries;
    if (termID || termLocation || termConnection || termCharge) filtered = batteries.filter(bat => {
        return bat.id === termID || bat.location === termLocation || bat.connectionStatusId == termConnection || bat.stateOfCharge == termCharge;
    })
    return (
        <div className='ListBatteries'>
            {loading &&
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            }
            {!loading &&
                <>
                    <SearchBar
                        handleLocChange={e => setTermLocation(e.target.value)}
                        handleIdChange={e => setTermID(e.target.value)}
                        handleChargeChange={e => setTermCharge(e.target.value)}
                        handleConChange={e => setTermConnection(e.target.value)}
                    /><Button onClick={() => {
                        setTermLocation('');
                        setTermCharge('');
                        setTermConnection('');
                        setTermID('');
                    }}>RESET</Button>
                </>
            }
            <Table striped bordered hover>
                {!loading &&
                    <thead>
                        <tr>
                            <th>
                                ID
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
                    </thead>
                }
                <tbody>
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
                                        {battery.id}
                                    </Button>
                                </td>
                                <td>{battery.batteryStatus}</td>
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
        </div>
    )
}

export default ListBatteries;