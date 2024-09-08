import { APIEvent } from "@solidjs/start/server";
import { pinFileToIPFS, usePinata } from "~/libs/serverUtils";

const pinata = usePinata();
export async function POST(event: APIEvent) {
  const data = await event.request.formData();
  console.log(data);
  const mainImage = data.get("mainImage") as File;
  const logoImage = data.get("logoImage") as File;
  console.log(mainImage, logoImage);
  const images = await Promise.all([pinFileToIPFS(mainImage), pinFileToIPFS(logoImage)]);
  console.log(images);
  const fullJSON = {
    mainImage: images[0].IpfsHash,
    logoImage: images[1].IpfsHash,
    title: data.get("title"),
    tags: data.get("tags"),
    mainDescription: data.get("mainDescription"),
    type: data.get("type"),
    socials: data.get("socials"),
    mainPaymentsDescription: data.get("mainPaymentsDescription"),
    sm: data.get("sm"),
    socialsTitle: data.get("socialsTitle"),
    socialsDescription: data.get("socialsDescription"),
    paymentsTitle: data.get("paymentsTitle"),
    paymentsDescription: data.get("paymentsDescription"),
  };
  const res = await pinFileToIPFS(JSON.stringify(fullJSON));
  console.log(res);
  return new Response();
}
export async function GET() {
  const data = await pinata.gateways.get("bafkreidh5pp76jz6js6f6qu2z7mi5hb2klsg66uerezyjj7cdsl6lzq644");
  return new Response(JSON.stringify(data));
}
