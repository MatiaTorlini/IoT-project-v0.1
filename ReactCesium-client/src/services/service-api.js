import { app_config } from "../app-config";

export class Service_APIService {

	//#region
	constructor() {
		this._HEADERS = {
			'Content-Type': 'application/json',
			'Accept': '*/*',
			'Access-Control-Allow-Origin' : '*'
		  };
	}
	//#endregion


	//#endregion						F E T C H 
	async return___server__response(___action, ___target_route, ___to__post = null)
	{
		var request___body = JSON.stringify(___to__post)
		const ___route = app_config.node__server.url + '/api/' +  ___action + '/' + ___target_route;
		console.log("sending fetch : "+___route)
		const ___response = await fetch(___route, 
			{ 
				method : 'POST',
				headers : this._HEADERS,
				body : request___body
			})
		if (___response.ok) { const ___server_response = await ___response.json(); return ___server_response}
		else { try { const ___err__details = await ___response.json(); throw ___err__details.message;} catch(err) {throw err;}}
	}
	//#endregion

	//#region							D E V I C E S
	async devices___read__multi(building___id)
	{	
		const ___to__post = {building_id : building___id}
		return await this.return___server__response('read_multi','devices', ___to__post)
	}
	//#endregion

	//#region							M E A S U R E M E N T S
	async get___historical__data(device___id, field___key, start, stop)
	{
		const ___to__post = 
		{
			device_id : device___id,
			field_key : field___key,
			run_id : 'id_run_1',
			start : start,
			stop : stop
		}
		return await this.return___server__response('hystory','measurement', ___to__post)
	}
	//#endregion
}