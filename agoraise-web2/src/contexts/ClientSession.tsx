import { Accessor, ParentProps, Setter, createContext, createSignal } from "solid-js";
import { connect, disconnect, StarknetWindowObject } from "starknetkit";

type StkType = StarknetWindowObject | null;
type ClientSessionContextType = {
  wallet: Accessor<StkType>;
  setWallet: Setter<StkType>;
  connectWallet: () => void;
  disconnectWallet: () => void;
  projects: Accessor<string[]>;
  setProjects: Setter<string[]>;
  votePower: Accessor<number>;
  setVotePower: Setter<number>;
};

export const ClientSessionContext = createContext<ClientSessionContextType>();
export const ClientSessionProvider = (props: ParentProps) => {
  const [wallet, setWallet] = createSignal<StkType>(null);
  async function connectWallet() {
    const w = await connect();
    setWallet(w.wallet || null);
  }
  async function disconnectWallet() {
    await disconnect();
    setWallet(null);
  }
  const [projects, setProjects] = createSignal<string[]>([]);
  const [votePower, setVotePower] = createSignal(20);
  return (
    <ClientSessionContext.Provider
      value={{
        wallet,
        setWallet,
        connectWallet,
        disconnectWallet,
        projects,
        setProjects,
        votePower,
        setVotePower,
      }}
    >
      {props.children}
    </ClientSessionContext.Provider>
  );
};
