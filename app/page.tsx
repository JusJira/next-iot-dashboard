"use client";
import useSWR from "swr";
import dynamic from "next/dynamic";
import { Gauge } from "@/components/gauge";
import { DateTime } from "luxon";

const fetcher = (url: string | URL | Request) =>
  fetch(url).then((res) => res.json());
export default function Home() {
  const { data, isLoading } = useSWR("/api/getLast", fetcher, {
    refreshInterval: 10000,
  });
  console.log(data);
  if (isLoading) return null;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 p-4 md:p-12">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,300px))] gap-6 w-full container justify-center items-center">
        <div className="border rounded-lg shadow-sm relative flex flex-col aspect-square">
          <div className="p-6">
            <h3 className="font-semibold text-2xl">Temperature</h3>
          </div>
          <div className="flex items-center justify-center m-auto pb-6">
            <span className="text-3xl">{data.temperature.toFixed(1)} &deg;C</span>
          </div>
        </div>
        <div className="border rounded-lg shadow-sm relative flex flex-col  aspect-square">
          <div className="p-6">
            <h3 className="font-semibold text-2xl">Pressure</h3>
          </div>
          <div className="flex items-center justify-center m-auto pb-6 ">
            <span className="text-3xl">{data.pressure.toFixed(1)} Pa</span>
          </div>
        </div>
        <div className="border rounded-lg shadow-sm relative flex flex-col  aspect-square ">
          <div className="p-6">
            <h3 className="font-semibold text-2xl">Humidity</h3>
          </div>
          <div className="flex items-center justify-center m-auto pb-6">
            <Gauge value={data.humidity.toFixed()} showValue size="large" sign="%" />
          </div>
        </div>
      </div>
        <span className="text-sm text-center sm:text-base">Last Updated : {DateTime.fromISO(data.time).toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)}</span>
    </main>
  );
}
