import TOKENLIST from "../data/TokenList.json"

export default function formatBalance(amount: number, chain: number) {
    const formatBal = amount * (10 ** TOKENLIST[chain].decimals);
    return formatBal;
}
