import ImageKit from "imagekit"
import { NextResponse } from "next/server";

export const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
});

export async function GET(req, res) {
    return NextResponse.json(imagekit.getAuthenticationParameters());
}


