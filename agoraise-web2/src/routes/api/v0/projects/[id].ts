import axios from "axios";

export async function GET() {
  "use server";
  const data = await axios.get(
    `https://${process.env.VITE_PINATA_GATEWAY}/ipfs/bafkreiald37fptohhsiaz5rslq5xculszva4lrxsy2qw25lh2b7tanfa6u`,
  );
  console.log(data.data);
  return new Response(JSON.stringify(data.data));
}
