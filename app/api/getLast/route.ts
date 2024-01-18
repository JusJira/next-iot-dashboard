export const dynamic = 'force-dynamic' 

import { InfluxDB, FluxTableMetaData } from "@influxdata/influxdb-client";
const url = "https://iot.influx.jjus.dev";
const token = process.env.INFLUX_TOKEN

const queryApi = new InfluxDB({ url, token }).getQueryApi("iot");
const fluxQuery =
  'from(bucket: "iot_data")|> range(start: 0, stop: now())|> filter(fn: (r) => r["_measurement"] == "mqtt_consumer")|> filter(fn: (r) => r["_field"] == "humidity" or r["_field"] == "pressure" or r["_field"] == "temperature")|> filter(fn: (r) => r["host"] == "967796e36885")|> filter(fn: (r) => r["topic"] == "esp32/sensors/")|> aggregateWindow(every: 10s, fn: last, createEmpty: false)|> last()';


interface WeatherData {
    humidity: number;
    pressure: number;
    temperature: number;
    time: string;
  }

export async function GET() {
  const data = await iterateRows();
  return Response.json(data);
}

export async function iterateRows() {
  const data: WeatherData = {
      "humidity": 0,
      "pressure": 0,
      "temperature": 0,
      "time": Date.now().toString()
  };
  for await (const { values, tableMeta } of queryApi.iterateRows(fluxQuery)) {
    // the following line creates an object for each row
    const o = tableMeta.toObject(values);
    // console.log(JSON.stringify(o, null, 2))
    // console.log(
    //   `${o._time} ${o._measurement} in '${o.location}' (${o.example}): ${o._field}=${o._value}`
    // );

    // alternatively, you can get only a specific column value without
    // the need to create an object for every row
    var field = tableMeta.get(values, "_field") as "humidity"|"pressure"|"temperature"
    var time = tableMeta.get(values, "_time")
    data[field] = tableMeta.get(values, "_value")
    data["time"] = time
  }
  console.log("\nIterateRows SUCCESS");
  return data;
}
