import { ServerApiVersion } from "mongodb";

/*#region   
    This file contains all the macros necessary to configure the resources involved when
    the server application is running
*/

export const server_config =
{

    //#regiong                      M A I N 
    port: 5000,
    //#endregion

    //#region                   M O N G O - D B
    mongo: {
        url: "mongodb://localhost:27017/",
        access_token: "",   //no access control implemented yet
        config:
        {
            ServerApi:
            {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },

        },
        //defines the structure of the mongodb database and collection where data are registered
        structure: {
            database_name: "IoT-project",
            building_collection: "Buildings"
        }
    },
    //#endregion

    //#region                   I N F L U X - D B
    influx: {
        url: "http://localhost:8086",
        access_token: "oMPTInBoumTNu7kPlzZYlAc8qz_b6yOiHfV8nb2V2ruBgI7xxvDWKs2mCD2uMmNucGpOURp6rhLWIpWfC1f_dA==",
        bucket: "IoT-project",
        org : "IoT-project"
    },
    //#endregion

    //#region                  M Q T T - B R O K E R(s)
    mqtt_southbound: { //where devices write
        broker_url : "http://localhost:1883",
        main_topic : "City/#",
    },

    mqtt_northbound : { //where frontend reads
        broker_url : "", 
        main_topic : ""
    },

    //#region                   C E S I U M - I O N
    cesiumIoN: {
        //actually managed at frontend (problems with cesium libraries)
        //asset_id : 2393585
        // access_token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZDFhNDY4NS00M2UyLTQ3MGQtODIyOC00NDJjZGZjOGY2MDIiLCJpZCI6MTgzMTkxLCJpYXQiOjE3MDE5NzMyNDl9.GpCRKJliN686CgUWw9RPqvukFcyK934grdVgO7zVeVw"
    }
    //#endregion   
}