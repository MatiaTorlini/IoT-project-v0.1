//#region						E X T E R N A L - I M P O R T 
import React, { useEffect, useState } from "react";
import {
	Viewer,
	Ion, //manages cloud 
	Cesium3DTileset,//contains the citygml loaded from cloud
	ScreenSpaceEventType, //macros for defining screeen events e.g. LEFT_CLICK etc.
	ScreenSpaceEventHandler, //handler for events on the viewer
	Cesium3DTileFeature, //an object for hosting metadata of a 3DTile
	Cartesian3
} from "cesium";
//#endregion7

//#region						I N T E R N A L - I M P O R T 
import ComBuildingData from "../components/com-building-data";
import { app_config } from "../app-config";

//#region						S T Y L E 
import "../css/main.css";
import "cesium/Build/Cesium/Widgets/widgets.css";
//#endregion

//#region						 S E T U P 
Ion.defaultAccessToken = app_config.cesium___access__token;

var viewer = null;
var tileset = null;
var handler = null;
var pickedObject = null;
//#endregion


//#region						C O M P O N E N T
export default function SbViewerPage() {

	//#region 					S T A T E
	const [___right__slide_visible, set___right__slide_visible] = useState(false);
	const [___building__id, set___building__id] = useState(null)
	const [___building__name, set___building__name] = useState(null)
	const [___building__type, set___building__type] = useState(null)
	const [___building__latitude, set___building__latitude] = useState(null)
	const [___building__longitude, set___building__longitude] = useState(null)
	const [___building__height, set___building__height] = useState(null)
	//#endregion


	//#region 						M E T H O D S
	const toggle___window = () => {
		set___right__slide_visible(!___right__slide_visible);
	};

	const retrieve___static__data = (tile) => {
		set___building__id(tile.getProperty("gml:id"))
		set___building__name(tile.getProperty("gml:name"))
		set___building__type(tile.getProperty("bldg:rooftype"))
		set___building__height(tile.getProperty("Height"))
		set___building__longitude(tile.getProperty("Longitude"))
		set___building__latitude(tile.getProperty("Latitude"))
	}
	//#endregion


	//#region						H A N D L E R S
	const handleLeftClick = (click) => {
		let windowPosition = click.position;
		if (windowPosition) {
			pickedObject = viewer.scene.pick(windowPosition)
			if (pickedObject && pickedObject instanceof Cesium3DTileFeature) {
				retrieve___static__data(pickedObject)
				toggle___window()
			} else {
				if (___right__slide_visible)
					toggle___window()
			}
		}
	};
	//#region



	//#region					L Y F E C Y C L E 

	//#region						M O U N T
	useEffect(() => {
		const load___page = async () => {
			viewer = new Viewer("cesiumContainer", app_config.viewer___config)
			tileset = await Cesium3DTileset.fromIonAssetId(app_config.tileset___id)
			viewer.scene.primitives.add(tileset)
			viewer.camera.flyTo({ destination: Cartesian3.fromDegrees(13.37624469273759, 52.51861037982582, 400) })
			handler = new ScreenSpaceEventHandler(viewer.scene.canvas)
			handler.setInputAction(handleLeftClick, ScreenSpaceEventType.LEFT_CLICK);
		}
		load___page()
	}, [])
	//#endregion

	//#region 					U N M O U N T
	useEffect(() => {
		return () => {
			if (viewer)
				viewer.destroy()
			handler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK) //unset handler
		}
	}, [])
	//#endregion

	//#region 					R E T U R N 
	return <>
		<div id="cesiumContainer"></div>
		{
			___right__slide_visible ? <div id="controlPanel" >
				<header className="modal-card-head">
					<p className="modal-card-title">Building data</p>
					<button className="delete" aria-label="close" onClick={toggle___window}></button>
				</header>
				<section className="modal-card-body" >
					<div style={{ display: "flex", justifyContent:"space-between"}}>
						<ComBuildingData
							___building__id={___building__id}
							___building__name={___building__name}
							___building__latitude={___building__latitude}
							___building__longitude={___building__longitude}
							___building__height={___building__height}
						/>
					</div>

				</section>
			</div> : <></>
		}
	</>
	//#endregion
}
//#endregion