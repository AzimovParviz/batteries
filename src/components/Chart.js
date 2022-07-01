import '../App.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

function Chart(props) {
    const data = [
        {
            name: props.timestamp,
            uv: props.stateOfCharge,
            amt: props.stateOfCharge
        },
        {
            name: props.deadline,
            uv: 0,
            amt: props.stateOfCharge
        }
    ]

    return (
        <LineChart width={400} height={300} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
        </LineChart>
    )
}

export default Chart;