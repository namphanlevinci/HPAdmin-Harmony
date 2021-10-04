
import React from "react";
import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';


const pdata = [
    {
        name: 'Jan 03',
        cost: 11,
        fees: 30
    },
    {
        name: 'Apr 03',
        cost: 15,
        fees: 12
    },
    {
        name: 'Jun 23',
        cost: 5,
        fees: 10
    },
    {
        name: 'July 27',
        cost: 10,
        fees: 5
    },
    {
        name: 'Auh 09',
        cost: 9,
        fees: 4
    },
    {
        name: 'Nov 11',
        cost: 10,
        fees: 8
    },
];


export default class Customerchart extends React.Component {
    render() {
        return (
            <div className="MerList item_chart" style={{ marginTop: 16 }}>
                <div className="title_chart_line">
                    Appointment booked
                </div>
                <ResponsiveContainer width="100%" aspect={4}>
                    <LineChart data={pdata}>
                        <CartesianGrid />
                        <XAxis
                            dataKey="name"
                            interval={'preserveStartEnd'}
                        />
                        <YAxis></YAxis>
                        <Legend />
                        <Tooltip />
                        <Line dataKey="cost"
                            stroke="black" activeDot={{ r: 8 }} strokeWidth={2} />
                        <Line dataKey="fees"
                            stroke="red" activeDot={{ r: 8 }} strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
}