import { A, useLocation } from "@solidjs/router";
import { For, ParentProps } from "solid-js";
import Svg from "~/components/Svg";

export default function AppLayout(props: ParentProps) {
  const location = useLocation();
  const splitted = () => location.pathname.split("/").filter((el) => el);
  return (
    <div>
      <div class="flex items-center gap-2 p-2 text-darkGray">
        <A href="/">
          <Svg class="size-4" attr={{ viewBox: "0 0 495.398 495.398" }} href="/icons/home.svg#home" />
        </A>
        <For each={splitted()}>
          {(loc, i) => (
            <>
              <p>&gt</p>
              <A
                classList={{ "text-black": i() === splitted().length - 1 }}
                href={`/${splitted()
                  .filter((_el, j) => j <= i())
                  .join("/")}`}
              >
                <p>{loc}</p>
              </A>
            </>
          )}
        </For>
      </div>
      {props.children}
    </div>
  );
}
