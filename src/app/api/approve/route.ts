import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const tokenAddress = request.nextUrl.searchParams.get("tokenAddress");

    try {
        const response = await fetch(`https://api-dzap.1inch.io/v5.2/137/approve/transaction?tokenAddress=${tokenAddress}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.AUTH_TOKEN}`,
            }
        })
        const data = await response.json();
        return new NextResponse(JSON.stringify({ data }), {
            status: 200,
        });
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({ error: error }), {
            status: 500,
        });
    }
}