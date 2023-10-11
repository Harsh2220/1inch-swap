import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const src = request.nextUrl.searchParams.get("src");
    const dst = request.nextUrl.searchParams.get("dst");
    const amount = request.nextUrl.searchParams.get("amount");
    const from = request.nextUrl.searchParams.get("from");
    const slippage = request.nextUrl.searchParams.get("slippage");

    try {
        const response = await fetch(`https://api-dzap.1inch.io/v5.2/137/swap?src=${src}&dst=${dst}&amount=${amount}&from=${from}&slippage=${slippage}`, {
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
        console.log(err)
        return new NextResponse(JSON.stringify({ error: err }), {
            status: 500,
        });
    }
}