import axios from "axios";
import { PinataSDK } from "pinata";

("use server");

let pinata: PinataSDK | null = null;
export const usePinata = () => {
  "use server";
  if (pinata) return pinata;
  if (!process.env.PINATA_JWT || !process.env.PINATA_GATEWAY) throw new Error("PINATA_JWT or PINATA_GATEWAY not found");
  pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: process.env.PINATA_GATEWAY,
  });

  return pinata;
};
export async function pinFileToIPFS(file: File | string) {
  try {
    const data = new FormData();
    if (typeof file === "string") {
      data.append("file", new File([new Blob([file], { type: "application/json" })], "name.json"));
    } else {
      data.append("file", file);
    }
    const options = JSON.stringify({
      cidVersion: 1,
    });
    data.append("pinataOptions", options);
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
