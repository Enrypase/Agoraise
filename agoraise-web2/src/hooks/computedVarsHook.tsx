import { useContext } from "solid-js";
import { ComputedVarsContext } from "~/contexts/ComputedVars";

export function useComputedVars() {
  return useContext(ComputedVarsContext)!;
}
