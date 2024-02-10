import { NextRequest, NextResponse } from 'next/server';
import { getNftMetadata } from '../../lib/getNftMetadata';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const postUrl = "https://fc-frame-carrousel.vercel.app/api/frame"; 
  const contractAddress = "0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42";

  const maxSupply = 9999;
  const randomTokenId = Math.floor(Math.random() * maxSupply) + 1;

  const nftMetadata = await getNftMetadata(contractAddress, randomTokenId);

  const nftImageUrl = nftMetadata?.image?.cachedUrl;

  return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content=${nftImageUrl} />
    <meta property="fc:frame:button:1" content="Randomize wizard" />
    <meta property="fc:frame:post_url" content=${postUrl} />
  </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export async function GET(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
