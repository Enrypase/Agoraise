import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";
import { ClientSessionProvider } from "./contexts/ClientSession";
import { QueryClientProvider } from "@tanstack/solid-query";
import { QueryClient } from "@tanstack/query-core";
import { ComputedVarsProvider } from "./contexts/ComputedVars";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1,
      gcTime: 1000 * 60 * 5,
    },
  },
});
export default function App() {
  return (
    <Router
      root={(props) => (
        <QueryClientProvider client={queryClient}>
          <ComputedVarsProvider>
            <ClientSessionProvider>
              <Nav />
              <Suspense>{props.children}</Suspense>
            </ClientSessionProvider>
          </ComputedVarsProvider>
        </QueryClientProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
