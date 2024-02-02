
###########################################################################################################################
                                                M O N G O - D B 
############################################################################################################################


 1)                                           / A P I / D E V I C E S 

DESCRIPTION : fetching this endpoint returns all the devices registered on the building 
              having id <building_id> and related info
ENDPOINT : /api/devices
METHOD : POST
                                                R E Q U E S T 
REQUST BODY EXAMPLE : 
    {
        building_id : "BLDG_000000000"
    }
                                                R E S P O N S E 
RESPONSE BODY EXAMPLE : {
  "data": [
    {
      "_id": "65b10650a5ae79be64013fbd",
      "CityObjectID": "BLDG_000000000",
      "Devices": [
        {
          "device___id": "789",
          "device___name": "Slow device",
          "device___description": "The most slow device",
          "device___status": "inactive",
          "fields": [
            {
              "name" : "temperature",
              "value" : ""
            }
          ]
        }
      ]
    }
  ]
}

###########################################################################################################################
                                                 I N F L U X - D B  
############################################################################################################################


1)                                           / A P I / M E A S U R E M E N T

DESCRIPTION : fetching this endpoint returns all the measurements of the <id_run_1> of type <field_key> of the device with 
              id <device_id> having timestamp in between <start> and <stop> time
ENDPOINT : /api/measurement
METHOD : POST
                                                R E Q U E S T 
REQUST BODY EXAMPLE : 
    {
        start : 2024-01-01T00:00:00Z,     //NB date is in ISO 8601 format
        stop : 2024-01-02T00:00:00Z,
        device_id : 123,
        field_key : "temperature",
    }
                                                R E S P O N S E 
RESPONSE BODY EXAMPLE : 
{
  "data": [
    {
      "result": "_result",
      "table": 0,
      "_start": "2024-01-25T08:50:52.516047844Z",
      "_stop": "2024-01-25T18:50:52.516047844Z",
      "_time": "2024-01-25T13:01:34.784901597Z",
      "_value": 0,
      "_field": "temperature",
      "_measurement": "id_run_1",
      "device_id": "123"
    },
    {
      "result": "_result",
      "table": 0,
      "_start": "2024-01-25T08:50:52.516047844Z",
      "_stop": "2024-01-25T18:50:52.516047844Z",
      "_time": "2024-01-25T13:01:35.784996417Z",
      "_value": 1,
      "_field": "temperature",
      "_measurement": "id_run_1",
      "device_id": "123"
    },  
  ]
}



###########################################################################################################################
                                              E X T R A -  N O T E S
############################################################################################################################


1) MQTT does not assures messages ordering, the best thing we can do at the moment is rising up QoS. 
   Otherwise a NTP is required to synchronize
