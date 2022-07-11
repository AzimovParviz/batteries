import '../App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Chart(props) {
    /*
    measurements: Array (200)

    stateOfCharge: 1

    timestamp: "2022-06-25T12:39:42.155Z"
    */
    return (
        <ResponsiveContainer aspect={2}>
            <LineChart width={1800} height={900} data={props.stamp} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <XAxis dataKey="timestamp" />
                <YAxis dataKey="stateOfCharge" />
                <Tooltip />
                <Line type="monotone" dataKey="stateOfCharge" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default Chart;