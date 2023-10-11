export default async function swapTokens(
    src: string,
    dst: string,
    amount: number,
    from: string,
    slippage: string,
) {
    try {
        const response = await fetch(
            `/api/swap?src=${src}&dst=${dst}&amount=${amount}&from=${from}&slippage=${slippage}`
        );
        const data = await response.json();
        return data?.data;
    } catch (error) {
        console.log(error);
    }
}
