import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";
import { ClientSessionProvider } from "./contexts/ClientSession";

export default function App() {
  return (
    <Router
      root={(props) => (
        <ClientSessionProvider>
          <Nav />
          <Suspense>{props.children}</Suspense>
        </ClientSessionProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
