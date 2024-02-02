import { Terrain } from "cesium"

export const app_config = {

	//region 							C E S I U M
	tileset___id : 2393585,
	//cesium access token should be put on the server
	cesium___access__token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZDFhNDY4NS00M2UyLTQ3MGQtODIyOC00NDJjZGZjOGY2MDIiLCJpZCI6MTgzMTkxLCJpYXQiOjE3MDE5NzMyNDl9.GpCRKJliN686CgUWw9RPqvukFcyK934grdVgO7zVeVw',

	viewer___config : {
		terrain: Terrain.fromWorldTerrain(),
		animation: false,
		timeline: false,
		navigationHelpButton: false,
		vrButton: false,
		fullscreenButton: false,
		infoBox: false
	},
	//endregion

	//region							N O D E - S E R V E R 
	node__server : {
		url : "http://localhost:5000"
	},
	//endregion

	//region							M Q T T 	
	MQTT : {
		main__topic : "City/",
		broker___url : 'mqtt://localhost:',
		broker___port : 9001,
		client___id : 'rjIX3KF8vysNiP7yJDci6HFv' //actually not used
	},
	
	//region							P L O T
	
	plot : {
		time___window : 10, //time window is expressed as the number of data points rendered in the chart
	}
	//endregion
}