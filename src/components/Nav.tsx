import { A } from "@solidjs/router";
import { connect } from "starknetkit";

export default function Nav() {
  return (
    <nav class="bg-white border-b-2 border-solid border-main flex gap-5 justify-between p-5">
      <div class="flex gap-5">
        <A href="/pricing">
          <p>Pricing</p>
        </A>
        <A href="/about">
          <p>About Us</p>
        </A>
      </div>
      <button
        onClick={async () => {
          const wallet = await connect();
          console.log(wallet.wallet);
        }}
      >
        <p>Sign In</p>
      </button>
    </nav>
  );
}
