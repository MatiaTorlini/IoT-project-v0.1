//#region					I M P O R T S 
import React from "react";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "./css/main.css";
import 'bulma/css/bulma.min.css';

import SbViewerPage from "./pages/sb-viewer-page";
import ComNavbar from "./components/com-navbar";
//#endregion

//#region					C O M P O N E N T 
export function App() {
	
	//#region				R E T U R N 
	return <>
	<div style={{ position: "fixed", width: "100%", height: "100%" }}>
			<ComNavbar />
			<SbViewerPage />
		</div>
	</>
	//#endregion
}
