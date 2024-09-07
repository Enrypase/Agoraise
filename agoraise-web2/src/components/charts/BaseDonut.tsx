import { createEffect, JSX, Show } from "solid-js";
import { SolidApexCharts } from "solid-apexcharts";

export default function BaseDonut(props: {
  class?: JSX.HTMLAttributes<HTMLDivElement>;
  series: { notActive?: boolean; number: number }[];
  labels: string[];
  setColors?: (_p: string[]) => void;
}) {
  const notActive = "#9CADCE";
  const colors = [
    "#00A617",
    "#0085EA",
    "#00B163",
    "#00C1C1",
    "#00EF5C",
    "#008BDB",
    "#00E11E",
    "#0092E3",
    "#009A11",
    "#0091B9",
    "#00EE6E",
    "#00E8B7",
    "#00A9A2",
    "#00A69F",
    "#00D38A",
    "#00C90B",
  ];
  createEffect(() => {
    props.setColors?.(props.series.map((v, i) => (v.notActive ? notActive : colors[i])));
  });
  return (
    <Show when={props.series.length}>
      <div class={`relative size-full ${props.class || ""}`}>
        <SolidApexCharts
          type="donut"
          options={{
            labels: props.labels,
            legend: {
              show: false,
            },
            colors: props.series.map((v, i) => (v.notActive ? notActive : colors[i])),
          }}
          series={props.series.map((v) => v.number)}
        />
      </div>
    </Show>
  );
}
