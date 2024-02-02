//#region                       I M P O R T S
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts"
import React, { useEffect, useState } from "react"
import mqtt from "mqtt";
import { app_config } from "../app-config"
//#endregion


//#region                   G L O B A L ( ? ) //to review
let client = null;
//#endregion                


//#region                       C O M P O N E N T 
export default function ComRealTime(props) {


    //#region                          S T A T E 
	const [___field, set___field] = useState(props.___device.fields[0].name)
	const [___data__points, set___data__points] = useState([])
	const [___topic, set___topic] = useState(app_config.MQTT.main__topic + props.___building__id.split('_')[1] + '/' + props.___device.device___id + '/' + ___field)
    //#endregion

    //#region                       L I F E C Y C L E 
	useEffect(() => {
		client = mqtt.connect(app_config.MQTT.broker___url + app_config.MQTT.broker___port);
		client.on("connect", () => {
			console.log("connected to " + app_config.MQTT.broker___url + app_config.MQTT.broker___port)
		});
		return () => {
			console.log("Disconnected from " + app_config.MQTT.broker___url + app_config.MQTT.broker___port)
			client.end();
		}
	}, [])
    //#endregion

    //#region                        E F F E C T S 
	useEffect(() => {
		if (client) {
			console.log(___topic)
			client.subscribe(___topic, () => { console.log("subscribed to " + ___topic) })
			client.on("message", (topic, message) => {
				console.log(message.toString());
				if (topic === ___topic) {
					const parsed___message = JSON.parse(message)
					//console.log(parsed___message.field[___field])
					const ___tmp__data_point =
					{
						name: '',
						[___field]: parsed___message.value
					}
					set___data__points((old) => [...old.slice(-10), ___tmp__data_point])
				}
			});
		}
	}, [___topic])


	useEffect(() => {
		set___topic(app_config.MQTT.main__topic + props.___building__id.split('_')[1] + '/' + props.___device.device___id + '/' + ___field)
		
	}, [___field])
     //#endregion

    //#region                          R E T U R N 
	return <>
		<br />
		<h3 className="block">Select the measurement you are interested in</h3>
		<div style={{ display: "flex", gap: 10, marginTop: "10pt" }}>
			{
				props.___device.fields.map((field, idx) =>
					<button key={idx} className="button" onClick={() => {
						client.unsubscribe(___topic, () => { set___field(field.name); console.log("unsuscribed from " + ___topic) })
						set___data__points([])
					}
					}>{field.name}</button>
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
	</>
    //#endregion
}
