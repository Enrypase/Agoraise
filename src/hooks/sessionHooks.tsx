import { useContext } from "solid-js";
import { ClientSessionContext } from "~/contexts/ClientSession";

export function useClientSession() {
  return useContext(ClientSessionContext)!;
}
