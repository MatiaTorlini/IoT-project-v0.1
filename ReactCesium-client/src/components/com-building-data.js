//#region						I M P O R T S
import { MdPermDeviceInformation } from "react-icons/md"
import { FaEye } from "react-icons/fa"
import React, { useEffect, useState } from "react"
import { Service_APIService } from "../services/service-api"
import ComHistory from "./com-history-tab"
import ComRealTime from "./com-real-time-tab"
import "react-datepicker/dist/react-datepicker.css"
//#endregion


//#region


//#region						C O M P O N E N T 
export default function ComBuildingData(props) {

	//#region 					S E R V I C E S 
	const API = new Service_APIService()
	//#endregion

	//#region					S T A T E
	const [___devices, set___devices] = useState([])
	const [___selected__device_idx, set___selected__device_idx] = useState(null)
	const [___device__data_visible, set___device__data_visible] = useState(false)
	const [___active__tab, set___active__tab] = useState(1);
	//#endregion

	//#region					F E T C H
	const devices___read__multi = async () => {
		const ___devices__tmp = await API.devices___read__multi(props.___building__id)
		console.log(___devices__tmp.data[0].Devices)
		set___devices(___devices__tmp.data[0].Devices)
	}
	//#enregion

	//#region 				M E T H O D S 
	const display___device__data = async () => {
		if (___device__data_visible) { MQTTclient.unsubscribe };
		set___device__data_visible(!___device__data_visible)
	}

	const handle___tab__click = (tabNumber) => { set___active__tab(tabNumber); };
	//#endregion

	//#region				L I F E C Y C L E
	useEffect(() => {
		devices___read__multi()
	}, [props.___building__id])


	//#region				R E T U R N 
	return <>
		<div>
			<div>
				<h3>Building Id : {props.___building__id}</h3>
				<h3>Description : {props.___building__description}</h3>
				<h3>Latitude : {props.___building__latitude}</h3>
				<h3>Longitude : {props.___building__longitude}</h3>
				<h3>Height : {props.___building__height}</h3>
				<br />
				<br />
				<h3>Registered devices</h3>
				<br />
			</div>
			{
				___devices.map((dev, idx) =>
					<>
						<div key={idx} style={{ display: "flex", gap: 15, alignItems: "center" }}>
							<div>
								<MdPermDeviceInformation />
							</div>
							<div>
								<p>Device ID : {dev.device___id}</p>
								<p>Device name : {dev.device___name}</p>
								<p>Description : {dev.device___description}</p>
							</div>
							<div>
								<FaEye onClick={() => { display___device__data(); set___selected__device_idx(idx) }} />
							</div>
						</div>

						<br />
						<br /></>
				)
			}
			{
				___device__data_visible ? <div id="controlPanel2">
					<header className="modal-card-head">
						<p className="modal-card-title">{___devices[___selected__device_idx].device___name} (id {___devices[___selected__device_idx].device___id}) data</p>
						<button className="delete" aria-label="close" onClick={() => set___device__data_visible(!___device__data_visible)}></button>
					</header>
					<section className="modal-card-body">
						<div className="tabs is-boxed is-centered" style={{ display: "block" }}>
							<ul>
								<li className={___active__tab === 1 ? 'is-active' : ''}>
									<a onClick={() => handle___tab__click(1)}>Real time</a>
								</li>
								<li className={___active__tab === 2 ? 'is-active' : ''}>
									<a onClick={() => handle___tab__click(2)}>History</a>
								</li>
							</ul>
							<div>

								{
									___active__tab === 1 &&
									<>
										<div>
											<ComRealTime
												___device={___devices[___selected__device_idx]}
												___building__id={props.___building__id}
											/>
										</div>
									</>
								}
								{
									___active__tab === 2 &&
									<>
										<div>
											<ComHistory
												___device={___devices[___selected__device_idx]}
												___building__id={props.___building__id}
											/>
											<hr></hr>
										</div>
									</>
								}

							</div>
						</div>
					</section>
				</div> : <></>
			}
		</div></>
	//#endregion
}

