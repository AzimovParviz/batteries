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
    return (
        <div className='batteryDetails'>
            {props.battery.stateOfCharge>30 && <div className='battery'><div className='batteryLevel' style={{ width: props.battery.stateOfCharge * 50 / 100, backgroundColor: 'green' }}></div><span>{props.battery.stateOfCharge} %</span></div>}
            {props.battery.stateOfCharge<=30 && props.battery.stateOfCharge>=15 && <div className='battery'><div className='batteryLevel' style={{ width: props.battery.stateOfCharge * 50 / 100, backgroundColor: 'yellow' }}></div><span>{props.battery.stateOfCharge} %</span></div>}
            {props.battery.stateOfCharge<15 && props.battery.stateOfCharge && <div className='battery'><div className='batteryLevel' style={{ width: props.battery.stateOfCharge * 50 / 100, backgroundColor: 'red' }}></div><span>{props.battery.stateOfCharge} %</span></div>}
            <><br></br><span>capacity:</span></> {props.battery.capacity}
            {props.battery.stateOfHealth && <><br></br><span>state of health:</span></>} {props.battery.stateOfHealth}
            <br></br>
            <span>last connection time:</span> {props.battery.lastConnectionTime}
            {props.battery.location && <><br></br><span>current location:</span></>} {props.battery.location}
            <br></br>
            <span>voltage:</span> {props.battery.voltage}
        </div>
    )
}

export default BatteryDetails;