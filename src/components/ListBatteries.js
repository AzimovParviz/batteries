import '../App.css';
import React, { useState, useEffect } from 'react';

function ListBatteries() {
    const [batteries, setBatteries] = useState([]);
    const url = 'https://f2byongc84.execute-api.eu-central-1.amazonaws.com/webdev_test_fetch_batteries'

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(response => {
                console.log(response)
                setBatteries(response)
            })
    }, [])
    /*
    
    batteryStatus: 1
    
    capacity: 25
    
    connectionStatus: 3
    
    endOfLifeDate: "2025-01-20T02:43:52.464Z"
    
    id: "B-30964"
    
    lastConnectionTime: "2022-07-01T08:51:48.464Z"
    
    location: "Port"
    
    recentIssues: [4] (1)
    
    stateOfCharge: null
    
    stateOfHealth: 52
    
    voltage: 24
     */
    return (
        <div className='ListBatteries'>
            <table>
                <tr>
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
                        End of Life Date
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
                {
                    batteries.map(
                        (battery) =>
                        (<tr key={battery.id}>
                            <td>{battery.status}</td>
                            <td>{battery.capacity}</td>
                            <td>{battery.connectionStatus}</td>
                            <td>{battery.endOfLifeDate}</td>
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