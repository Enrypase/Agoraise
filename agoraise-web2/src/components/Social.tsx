import { Match, Switch } from "solid-js";
import Svg from "./Svg";

export default function Social(props: {
  name: "discord" | "facebook" | "medium" | "telegram" | "x" | "youtube" | string;
}) {
  const common = "size-6";
  return (
    <Switch fallback={<div class="size-16 rounded-full bg-main" />}>
      <Match when={props.name === "discord"}>
        <Svg class={common} attr={{ viewBox: "0 0 20 20" }} href="/icons/socials/discord.svg#discord" />
      </Match>
      <Match when={props.name === "facebook"}>
        <Svg class={common} attr={{ viewBox: "0 0 18 19" }} href="/icons/socials/facebook.svg#facebook" />
      </Match>
      <Match when={props.name === "medium"}>
        <Svg class={common} attr={{ viewBox: "0 0 18 18" }} href="/icons/socials/medium.svg#medium" />
      </Match>
      <Match when={props.name === "telegram"}>
        <Svg class={common} attr={{ viewBox: "0 0 18 18" }} href="/icons/socials/telegram.svg#telegram" />
      </Match>
      <Match when={props.name === "x"}>
        <Svg class={common} attr={{ viewBox: "0 0 16 15" }} href="/icons/socials/x.svg#x" />
      </Match>
      <Match when={props.name === "youtube"}>
        <Svg class={common} attr={{ viewBox: "0 0 18 18" }} href="/icons/socials/youtube.svg#youtube" />
      </Match>
    </Switch>
  );
}
