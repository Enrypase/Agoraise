import axios from "axios";
import { APIEvent } from "@solidjs/start/server";

export async function GET(event: APIEvent) {
  "use server";
  const data = await axios.get(`https://${process.env.VITE_PINATA_GATEWAY}/ipfs/${event.params.id}`);
  return new Response(JSON.stringify(data.data));
}
