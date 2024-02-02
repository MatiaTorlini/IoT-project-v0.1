
//#region 								I M P O R T S
import express from "express";
import bodyParser from "body-parser";
import { server_config } from "./server.config.mjs";
import { MongoClient } from "mongodb";
import { InfluxDB, Point } from "@influxdata/influxdb-client";
import mqtt from "mqtt";
//#endregion
import cors from 'cors'


//#region								S E T U P 
const app = express();
app.use(cors())
app.use(bodyParser.json())
const mqtt_client = mqtt.connect(server_config.mqtt_southbound.broker_url)
const ___influx__client = new InfluxDB({ url: server_config.influx.url, token: server_config.influx.access_token })
const ___write__client = ___influx__client.getWriteApi(server_config.influx.org, server_config.influx.bucket)

//#stop


//#region				E N D P O I N T S - C O N T R O L L E R

//#region						C E S I U M - I O N
/*
app.post('/api/tiles', (req,res) => {

	//(supposing the asset id comes from the client (e.g. add a mongo collection of assets))
	const ___request_data = req.body; 

	//actually the tileset_id is set in server_config.js
	const ___tileset = await Cesium3DTileset.fromIonAssetId(server_config.asset_id)
	res.json({data: ___tileset})
});
*/
//#endregion

//#region						M O N G O - D B

app.post('/api/read_multi/devices', async (req, res) => {
	const ___posted__data = req.body;
	console.log("received fetch")
	try {
		const client = await MongoClient.connect(server_config.mongo.url, server_config.mongo.config)
		const db = client.db(server_config.mongo.structure.database_name)
		const collection = db.collection(server_config.mongo.structure.building_collection)
		const ___response__data = await collection.find({ "CityObjectID": ___posted__data["building_id"] }).toArray();
		client.close();
		res.json({ data: ___response__data })
	}
	catch (err) {
		res.status(500).json({ error: "Internal server error" })
	}
})
//#endregion

//#region						I N F L U X - D B 

app.post('/api/hystory/measurement', async (req, res) => {
	const ___posted__data = req.body;
	try {
		let ___query__client = ___influx__client.getQueryApi(server_config.influx.org)
		let ___flux__query = `from(bucket: "${server_config.influx.bucket}")
		|> range(start: -10h)
		|> filter(fn: (r) => r._measurement == "${___posted__data["run_id"]}"
							and r.device_id == "${___posted__data["device_id"]}"
							and r._field == "${___posted__data["field_key"]}")
	  `;
		//${___posted__data["start"]}, stop: ${___posted__data["stop"]}
		const ___query__results = [];
		const execute_query = async () => {
			return new Promise((resolve, reject) => {
				___query__client.queryRows(___flux__query,
					{
						next: (row, tableMeta) => {
							const tableObject = tableMeta.toObject(row);
							___query__results.push(tableObject);
						},
						error: (error) => {
							console.error('\nError', error);
							reject(error);
						},
						complete: () => {
							console.log('\nSuccess');
							resolve();
						},
					});
			});
		};

		execute_query()
			.then(() => {
				res.json({ data: ___query__results });
			})
	}
	catch (err) {
		res.status(500).json({ error: "Internal server error" })
	}
})
//#endregion




//#region 								M Q T T 
//when the server starts, it subscribes to the main mqtt topic;
//another solution is to configure a telegraf service to forward data from the mqtt broker
//to influxdb. (look at a possible configuration at telegraf.configuration)

function setup___mqtt__connection() {
	mqtt_client.on("connect", () => {
		mqtt_client.subscribe(server_config.mqtt_southbound.main_topic, (err) => {
			if (!err) {
				console.log(`server subscribed to ${server_config.mqtt_southbound.main_topic}`);
			}
			else
				throw err;
		});
	});

	//set the callback for dispatching messages to influxdb depending
	//on the provenience topic
	mqtt_client.on("message", (topic, message) => {
		MQTT_to_Influx(topic, message)
	});
}

//#endregion

//#region   //callback to call whenever a message is received
async function MQTT_to_Influx(topic, message) {

	const ___splitted__topic = topic.split('/')
	const building_id = ___splitted__topic[1]
	const device_id = ___splitted__topic[2]
	const field_key = ___splitted__topic[3]

	const ___received__payload = JSON.parse(message.toString())
	const ___value = ___received__payload["value"]
	const ___unit = ___received__payload["unit"]

	//console.log(`Received message : ${message} on topic ${topic}`)

	if (building_id && device_id && field_key) {

		//console.log(`Writing point in measurement id_run_1, with tag : ${device_id} with field : ${field_key} and value : ${___value}`)
		
		let point = new Point('id_run_1')
			.tag('device_id', device_id)
			.tag('unit', ___unit)
			.floatField(field_key, ___value)

			console.log(` ${point}`)
		try 
		{
			___write__client.writePoint(point)
			___write__client.flush()
		}
		catch(err) {
			console.log(err)
		}
	}
}


//#region								S T A R T
app.listen(server_config.port, () => {
	setup___mqtt__connection()
	console.log(`Server running on port ${server_config.port}`)
})
//#endregion

//#region								S T O P 
app.on('close', () => {return () => {___write__client.close(); mqtt_client.end()}})
//#endregion

