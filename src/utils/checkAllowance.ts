export default async function checkAllowance(
  tokenAddress: string,
  walletAddress: string
) {
  try {
    const response = await fetch(
      `/api/allowance?tokenAddress=${tokenAddress}&walletAddress=${walletAddress}`
    );
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.log(error);
  }
}
