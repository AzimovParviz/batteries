import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Modal from './Modal';

const batteryCache = new Map() /* for caching individual battery details */

function BatteryTable(props) {
    const [bat, setBat] = useState({}) /* individual battery details */
    const [loadingbat, setLoadingbat] = useState(true) /* to know if the battery details request is going through */

    /* modal state for showing and hiding it*/
    const [isShowing, setIsShowing] = useState(false);

    function toggle() {
        setIsShowing(!isShowing);
    }

    const url = 'https://f2byongc84.execute-api.eu-central-1.amazonaws.com/webdev_test_fetch_batteries?id=' //url for fetching individual battery info
    const fetchRequest = async (individualBattery) => {
        if (!batteryCache.has(individualBattery)) {
            batteryCache.set(individualBattery, fetch(url + individualBattery.id).then(res => res.json()))
        }
        const response = await batteryCache.get(individualBattery)
        setBat(response)
        setLoadingbat(false)
    }

    return (
        <div>
            <table>
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
                                    <button className='button' onClick={() => {
                                        toggle()
                                        setLoadingbat(true)
                                        fetchRequest(battery)
                                    }}>
                                        {battery.id}
                                    </button>
                                </td>
                                {/* conditional rendering for whenever there's data missing so we display n/a instead */}
                                {battery.capacity && <td>{battery.capacity}</td>}
                                {!battery.capacity && <td>n/a</td>}
                                {battery.connectionStatusId && <td>{battery.connectionStatusId}</td>}
                                {!battery.connectionStatusId && <td>n/a</td>}
                                {battery.lastConnectionTime && <td>{battery.lastConnectionTime}</td>}
                                {!battery.lastConnectionTime && <td>n/a</td>}
                                {battery.location && <td>{battery.location}</td>}
                                {!battery.location && <td>n/a</td>}
                                {battery.recentIssues.length>0 && <td>{battery.recentIssues.join(', ')}</td>}
                                {battery.recentIssues.length<=0 && <td>n/a</td>}
                                {battery.stateOfCharge && <td>{battery.stateOfCharge}</td>}
                                {!battery.stateOfCharge && <td>n/a</td>}
                                {battery.stateOfHealth && <td>{battery.stateOfHealth}</td>}
                                {!battery.stateOfHealth && <td>n/a</td>}
                                {battery.voltage && <td>{battery.voltage}</td>}
                                {!battery.voltage && <td>n/a</td>}
                            </tr>)
                        )
                    }
                </tbody>
            </table>
            <Modal isShowing={isShowing} hide={toggle} modalData={bat} loading={loadingbat}>
            </Modal>
        </div>
    )
}

export default BatteryTable;