export default async function approveTrasaction(
    tokenAddress: string
) {
    try {
        const response = await fetch(
            `/api/approve?tokenAddress=${tokenAddress}`
        );
        const data = await response.json();
        return data?.data;
    } catch (error) {
        console.log(error, "error");
    }
}
