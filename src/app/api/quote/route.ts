import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const src = request.nextUrl.searchParams.get("src");
    const dst = request.nextUrl.searchParams.get("dst");
    const amount = request.nextUrl.searchParams.get("amount");

    try {
        const response = await fetch(`https://api.1inch.dev/swap/v5.2/137/quote?src=${src}&dst=${dst}&amount=${amount}`, {
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