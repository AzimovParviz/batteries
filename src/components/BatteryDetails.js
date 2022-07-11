import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function BatteryDetails(props) {
        /*
    capacity: 25

connectionStatus: 2

connectionStatusId: 2

id: "D-99428"

lastConnectionTime: "2022-07-02T11:16:50.535Z"

location: "Port"

measurements: [{timestamp: "2022-06-25T12:39:42.535Z", stateOfCharge: 87}, {timestamp: "2022-06-25T12:56:22.535Z", stateOfCharge: 97}, {timestamp: "2022-06-25T13:13:02.535Z", stateOfCharge: 86}, {timestamp: "2022-06-25T13:29:42.535Z", stateOfCharge: 28}, {timestamp: "2022-06-25T13:46:22.535Z", stateOfCharge: 38}, {timestamp: "2022-06-25T14:03:02.535Z", stateOfCharge: 10}, {timestamp: "2022-06-25T14:19:42.535Z", stateOfCharge: 33}, {timestamp: "2022-06-25T14:36:22.535Z", stateOfCharge: 77}, {timestamp: "2022-06-25T14:53:02.535Z", stateOfCharge: 98}, {timestamp: "2022-06-25T15:09:42.535Z", stateOfCharge: 15}, …] (200)

recentIssues: [1, 4] (2)

stateOfCharge: 67

stateOfHealth: 66

voltage: 48
     */
    return(
        <div className='batteryDetails'>
            <div className='battery'><div className='batteryLevel' style={{ width: props.battery.stateOfCharge * 50 / 100 }}></div><span>{props.battery.stateOfCharge} %</span></div>
            <br></br>
            {props.battery.capacity}
            <br></br>
            {props.battery.stateOfHealth}
            <br></br>
            {props.battery.lastConnectionTime}
            <br></br>
            {props.battery.location}
            <br></br>
            {props.battery.voltage}
        </div>
    )
}

export default BatteryDetails;