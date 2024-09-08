import { ParentProps } from "solid-js";

export default function AppLayout(props: ParentProps) {
  return <div>{props.children}</div>;
}
