
//#region                           I M P O R T S
import ReactDatePicker from "react-datepicker"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { Service_APIService } from "../services/service-api"
//#endregion


//#region                       C O M P O N E N T
export default function ComHistory(props) {

    //#region                   S E R V I C E S 
	const API = new Service_APIService()
    //#endregion

	const [___field, set___field] = useState(Object.keys(props.___device["fields"])[0])
	const [___data__points, set___data__points] = useState([])
	const [___target__start_date, set___target__start_date] = useState(new Date())
	const [___target__start_time, set___target__start_time] = useState(null)
	const [___target__stop_date, set___target__stop_date] = useState(new Date())
	const [___target__stop_time, set___target__stop_time] = useState(null)

    //#region                       M E T H O D S         

    //build a date string in ISO format
	const getCombinedISOString = (selectedDate, selectedTime) => {
		if (selectedDate && selectedTime) {
			const combinedDateTime = moment(selectedDate).format('YYYY-MM-DD') + 'T' + selectedTime + ':00Z';
			return combinedDateTime;
		}
		return '';
	};

	const send___flux__query = async () => {
		if (___target__start_date && ___target__start_time
			&& ___target__stop_date && ___target__stop_time && ___field) {
			const ___start = getCombinedISOString(___target__start_date, ___target__start_time)
			const ___stop = getCombinedISOString(___target__stop_date, ___target__stop_time)
			console.log(props.___device.device___id)
			const ___history__data = await API.get___historical__data(props.___device.device___id, ___field, ___start, ___stop)
			___history__data.data.forEach(point => {
				set___data__points(old => [...old, { name: "", [___field]: point._value }])
			});
		}

	}
    //#endregion

    //#region                           R E T U R N
	return <>
		<h3 className="block">Select a timepoint</h3>
		<div className="block" style={{ display: "flex", gap: 10, marginTop: "10pt" }}>
			<ReactDatePicker onChange={(date) => { set___target__start_date(date) }} selected={___target__start_date} />
			<input type="time" onChange={(e) => { set___target__start_time(e.target.value) }} selected={___target__start_time} />
			<ReactDatePicker onChange={(date) => { set___target__stop_date(date) }} selected={___target__stop_date} />
			<input type="time" onChange={(e) => { set___target__stop_time(e.target.value) }} selected={___target__stop_time} />
		</div>
		<hr></hr>
		<br />
		<h3 className="block">Select the measurement you are interested in</h3>
		<div style={{ display: "flex", gap: 10, marginTop: "10pt" }}>
			{
				props.___device.fields.map((field, idx) =>
					<button key={idx} className="button" onClick={() => { set___field(field.name) }}>{field.name}</button>
				)
			}
		</div>
		<LineChart
			width={500}
			height={300}
			data={___data__points}
			margin={{
				top: 5,
				right: 30,
				left: 20,
				bottom: 5,
			}}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="name" />
			<YAxis label={{ value: ___field, angle: -90, position: 'insideLeft' }} />
			<Tooltip />
			<Legend />
			<Line type="monotone" dataKey={___field} stroke="#8884d8" activeDot={{ r: 8 }} />
		</LineChart>
		<div style={{ display: "flex", justifyContent: "center", marginTop: "10pt" }}>
			<button onClick={send___flux__query}>Ask Influx!</button>
		</div>
	</>
    //#endregion
}