import { JSX } from "solid-js";
import { clientOnly } from "@solidjs/start";
const BaseDonut = clientOnly(() => import("~/components/charts/BaseDonut"));

export default function DonutChart(props: {
  class?: JSX.HTMLAttributes<HTMLDivElement>;
  series: { notActive?: boolean; number: number }[];
  labels: string[];
  setColors?: (_p: string[]) => void;
}) {
  return (
    <BaseDonut
      series={props.series}
      labels={props.labels}
      fallback={<div class="size-64 animate-pulse rounded-xl bg-gray" />}
      setColors={props.setColors}
    />
  );
}
