import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const tokenAddress = request.nextUrl.searchParams.get("tokenAddress")
    const walletAddress = request.nextUrl.searchParams.get("walletAddress");
    try {
        const response = await fetch(`https://api-dzap.1inch.io/v5.2/137/approve/allowance?tokenAddress=${tokenAddress}&walletAddress=${walletAddress}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${process.env.AUTH_TOKEN}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        return new NextResponse(JSON.stringify({ data }), {
            status: 200,
        });
    } catch (err) {
        return new NextResponse(JSON.stringify({ error: 'failed to load data' }), {
            status: 500,
        });
    }
}