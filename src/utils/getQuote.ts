export default async function getQuote(
    src: string,
    dst: string,
    amount: number,
) {
    try {
        const response = await fetch(
            `/api/quote?src=${src}&dst=${dst}&amount=${amount}`
        );
        const data = await response.json();
        return data?.data;
    } catch (error) {
        console.log(error);
    }
}
