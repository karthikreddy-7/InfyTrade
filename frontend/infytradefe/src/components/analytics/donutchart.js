import { Card, DonutChart, EventProps, Title } from "@tremor/react";
import React from "react";

const sales = [
  {
    name: "IBM",
    sales: 980,
  },
  {
    name: "AAPL",
    sales: 456,
  },
  {
    name: "TSLA",
    sales: 390,
  },
];

const valueFormatter = (number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

export function DonutChartUsage() {
  return (
    <>
      <DonutChart
        data={sales}
        category="sales"
        index="name"
        valueFormatter={valueFormatter}
        colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
      />
    </>
  );
}
