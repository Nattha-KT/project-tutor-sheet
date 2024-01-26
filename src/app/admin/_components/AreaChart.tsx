"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { AreaChart } from "@tremor/react";
import { useState } from "react";

const chartdata2 = [
  {
    date: "Ja",
    2022: 45,
    2023: 78,
  },
  {
    date: "Feb",
    2022: 52,
    2023: 71,
  },
  {
    date: "Mar",
    2022: 48,
    2023: 80,
  },
  {
    date: "Apr",
    2022: 61,
    2023: 65,
  },
  {
    date: "May",
    2022: 55,
    2023: 58,
  },
  {
    date: "Jun",
    2022: 67,
    2023: 62,
  },
  {
    date: "Jul",
    2022: 60,
    2023: 54,
  },
  {
    date: "Aug",
    2022: 72,
    2023: 49,
  },
  {
    date: "Sep",
    2022: 65,
    2023: 52,
  },
  {
    date: "Oct",
    2022: 68,
    2023: null,
  },
  {
    date: "Nov",
    2022: 74,
    2023: null,
  },
  {
    date: "Dec",
    2022: 71,
    2023: null,
  },
];

export default function AreaChartCompo() {
  const [value, setValue] = useState(null);

  return (
    <Card className=" pb-6 ">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <Square3Stack3DIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            Bar Chart
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            Visualize your data in a simple way using the
            @material-tailwind/react chart plugin.
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <AreaChart
          className="h-[19rem] mt-4 text-sm text-gray-500 font-normal"
          data={chartdata2}
          index="date"
          categories={["2022", "2023"]}
          colors={["indigo", "cyan"]}
          yAxisWidth={30}
          onValueChange={(v: any) => setValue(v)}
          connectNulls={true}
        />
      </CardBody>
    </Card>
  );
}
