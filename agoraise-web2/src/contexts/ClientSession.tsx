import { Accessor, ParentProps, Setter, createContext, createSignal } from "solid-js";
import { connect, disconnect, StarknetWindowObject } from "starknetkit";

type StkType = StarknetWindowObject | null;
type ClientSessionContextType = {
  wallet: Accessor<StkType>;
  setWallet: Setter<StkType>;
  connectWallet: () => void;
  disconnectWallet: () => void;
};

export const ClientSessionContext = createContext<ClientSessionContextType>();
export const ClientSessionProvider = (props: ParentProps) => {
  const [wallet, setWallet] = createSignal<StkType>(null);
  async function connectWallet() {
    const w = await connect();
    setWallet(w.wallet || null);
    console.log(w);
  }
  async function disconnectWallet() {
    await disconnect();
    setWallet(null);
  }
  return (
    <ClientSessionContext.Provider
      value={{
        wallet,
        setWallet,
        connectWallet,
        disconnectWallet,
      }}
    >
      {props.children}
    </ClientSessionContext.Provider>
  );
};
