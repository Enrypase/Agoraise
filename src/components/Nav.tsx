import { A } from "@solidjs/router";
import { Show } from "solid-js";
import { useClientSession } from "~/hooks/sessionHooks";

export default function Nav() {
  const { connectWallet, wallet } = useClientSession();
  return (
    <nav class="flex justify-between gap-5 border-b-2 border-solid border-main bg-white p-5">
      <div class="flex gap-5">
        <A href="/pricing">
          <p>Pricing</p>
        </A>
        <A href="/about">
          <p>About Us</p>
        </A>
      </div>
      <Show when={!wallet()}>
        <button
          onClick={async () => {
            connectWallet();
          }}
        >
          <p>Sign In</p>
        </button>
      </Show>
    </nav>
  );
}
