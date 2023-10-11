import { create } from "zustand";

interface ITokenStore {
    sellToken: number;
    sellAmount: number;
    buyToken: undefined | number;
    buyAmount: number;
    setSellToken: (tokenIndex: number) => void;
    setSellAmount: (amount: number) => void;
    setBuyToken: (tokenIndex: number) => void;
    setBuyAmount: (amount: number) => void;
}

const useTokenStore = create<ITokenStore>((set) => ({
    sellToken: 0,
    sellAmount: 0,
    buyToken: undefined,
    buyAmount: 0,
    setSellToken: (tokenIndex) =>
        set({
            sellToken: tokenIndex,
        }),
    setSellAmount: (amount) =>
        set({
            sellAmount: amount,
        }),
    setBuyToken: (tokenIndex) =>
        set({
            buyToken: tokenIndex,
        }),
    setBuyAmount: (amount) =>
        set({
            buyAmount: amount,
        }),
}));

export { useTokenStore };
