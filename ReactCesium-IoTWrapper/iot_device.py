
#								I M P O R T S 
#//region
from datetime import datetime
import json
import random
import time
from Class.mqtt_client import MQTTDevice
#//endregion

#						D E V I C E - S T A T I C - D A T A
#//region
___DEV_ID = "123"
___DEV_BUILDING = "1140001"
___DEV_FIELDS = {"temperature": None, "humidity": None}
#//endregion


#//region				G E N E R A T E - D A T A 
def _generate_dataA():
	___value = random.random() % 5
	___json_frame = {
		"value" : ___value,
		"unit" : "°C"
	}
	return ___json_frame

#//region
def _generate_dataB():
	___value = random.random() % 5
	___json_frame = {
		"value":___value,
		"unit":"%"
	}
	return ___json_frame
#//endregion
	
#//region						M A I N 
if __name__ == "__main__":

	___IoT_dev = MQTTDevice(___DEV_ID)
	___IoT_dev.start(___DEV_BUILDING, ___DEV_ID)
	cnt = 0
	try:
		while(cnt!=1000):
			print(list(___DEV_FIELDS.items())[0][0])
			dataA = json.dumps(_generate_dataA())
			#dataB = json.dumps(_generate_dataB())
			___IoT_dev._publish(list(___DEV_FIELDS.items())[0][0],___DEV_BUILDING, ___DEV_ID, dataA)
			#___IoT_dev._publish(list(___DEV_FIELDS.items()[1]),dataB)
			time.sleep(0.8)
			cnt+=1
	except KeyboardInterrupt:
		___IoT_dev.stop()
#//endregion
