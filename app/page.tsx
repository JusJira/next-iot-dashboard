"use client";
import useSWR from "swr";
import dynamic from "next/dynamic";
import { Gauge } from "@/components/gauge";
import { DateTime } from "luxon";
import { ModeToggle } from "@/components/themeToggle";

const fetcher = (url: string | URL | Request) =>
  fetch(url).then((res) => res.json());
export default function Home() {
  const { data, isLoading } = useSWR("/api/getLast", fetcher, {
    refreshInterval: 10000,
  });
  console.log(data);
  if (isLoading) return null;
  return (
    <>
      <header className="h-[80px] flex items-center justify-end px-4">
        <div>
          <ModeToggle />
        </div>
      </header>
      <main className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-lg sm:text-xl md:text-3xl font-bold">
          ESP8266 & DHT22 Dashboard
        </h1>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,300px))] gap-6 w-full container justify-center items-center">
          <div className="border rounded-lg shadow-sm relative flex flex-col aspect-square">
            <div className="p-6">
              <h2 className="font-semibold text-2xl">Temperature</h2>
            </div>
            <div className="flex items-center justify-center m-auto pb-6">
              <span className="text-3xl animate-gauge_fadeIn">
                {data.temperature.toFixed(1)} &deg;C
              </span>
            </div>
          </div>
          <div className="border rounded-lg shadow-sm relative flex flex-col  aspect-square ">
            <div className="p-6">
              <h2 className="font-semibold text-2xl">Humidity</h2>
            </div>
            <div className="flex items-center justify-center m-auto pb-6">
              <Gauge
                value={data.humidity.toFixed()}
                showValue
                size="large"
                sign="%"
              />
            </div>
          </div>
        </div>
        <span className="text-sm text-center sm:text-base">
          Last Updated :{" "}
          {DateTime.fromISO(data.time).toLocaleString(
            DateTime.DATETIME_FULL_WITH_SECONDS
          )}
        </span>
      </main>
      <footer className="h-[80px]"></footer>
    </>
  );
}
