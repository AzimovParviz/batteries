import '../App.css';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';
import SearchBar from './SearchBar';
import BatteryTable from './BatteryTable';

function ListBatteries() {
    const [batteries, setBatteries] = useState([]);//array of all batteries
    const [loading, setLoading] = useState(true);//to know when to display the loading icon
    /* states used for search terms */
    const [termID, setTermID] = useState('');
    const [termLocation, setTermLocation] = useState('');
    const [termConnection, setTermConnection] = useState(0);
    const [termCharge, setTermCharge] = useState(0);
    /* for infinite scrolling pagination */
    const [page, setPage] = useState(1)
    const loader = useRef(null);
    const formRef = useRef();

    const url = 'https://f2byongc84.execute-api.eu-central-1.amazonaws.com/webdev_test_fetch_batteries'
    /* fetching resources from the api
    and iterating through the results to change some of the properties for later display on the website */
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(response => {
                for (var i = 0; i < response.length; i++) {
                    switch (response[i].connectionStatusId) {
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
                    for (var j = 0; j < response[i].recentIssues.length; j++) {
                        switch (response[i].recentIssues[j]) {
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

    /* pagination */
    const handleObserver = useCallback((batteries) => {
        const target = batteries[0]
        if (target.isIntersecting) {
            setPage((prev) => prev + 1)
        }
    }, [])

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option)
        if (loader.current) observer.observe(loader.current)
    }, [handleObserver]);

    const handleReset = () => {
        formRef.current.reset();
    }

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
    /*
    to display updated list after search terms have been applied
     */
    var filtered = batteries.slice(0, page * 25); //slicing more and more as we scroll and the page increments
    if (termID) filtered = filtered.filter(bat => bat.id === termID)
    if (termLocation) filtered = filtered.filter(bat => bat.location === termLocation)
    if (termConnection) filtered = filtered.filter(bat => bat.connectionStatusId == termConnection)
    if (termCharge) filtered = filtered.filter(bat => bat.stateOfCharge == termCharge)
    return (
        <div className='ListBatteries'>
            {/* conditional rendering to display the loading icon while waiting for the response from the API*/
                loading &&
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            }
            {/* conditional rendering so the search bar won't appear while waiting for the API response */
                !loading &&
                <>
                    <form ref={formRef}>
                        <SearchBar
                            handleLocChange={e => setTermLocation(e.target.value)}
                            handleIdChange={e => setTermID(e.target.value)}
                            handleChargeChange={e => setTermCharge(e.target.value)}
                            handleConChange={e => setTermConnection(e.target.value)}
                        />
                    </form>
                    <button className='button' onClick={() => {
                        setTermLocation('');
                        setTermCharge('');
                        setTermConnection('');
                        setTermID('');
                        handleReset();
                    }}>RESET</button>
                </>
            }
            <BatteryTable filtered={filtered} loading={loading} />
            <div ref={loader} />
        </div>
    )
}

export default ListBatteries;