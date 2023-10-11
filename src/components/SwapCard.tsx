import { useTokenStore } from "@/store";
import approveTrasaction from "@/utils/approveTransaction";
import checkAllowance from "@/utils/checkAllowance";
import getQuote from "@/utils/getQuote";
import swapTokens from "@/utils/swapTokens";
import { useEffect, useState } from "react";
import { BsArrowDownShort } from "react-icons/bs";
import { toast } from "react-toastify";
import {
  useAccount,
  useBalance,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import { fetchBalance } from "wagmi/actions";
import TOKENLIST from "../data/TokenList.json";
import BuyCard from "./BuyCard";
import SellCard from "./SellCard";
import Spinner from "./UI/Spinner";

export default function SwapCard() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isConnected, address } = useAccount();
  const { sellToken, buyAmount, buyToken, sellAmount, setBuyAmount } =
    useTokenStore();

  useEffect(() => {
    setBuyAmount(0);
  }, [sellAmount, sellToken, buyToken]);

  const { data: balance } = useBalance({
    address: address,
  });

  const { data, sendTransaction, error } = useSendTransaction();

  const { isLoading: loading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  if (isSuccess) {
    toast("Swapped successfully 🎉", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  async function checkBalance() {
    if (sellToken === 0) {
      if (!(parseFloat(balance?.formatted!) > sellAmount)) {
        toast("Insufficient balance", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return false;
      }
    } else {
      const data = await fetchBalance({
        address: address!,
        token: TOKENLIST[sellToken].address as any,
      });
      if (!(parseFloat(data?.formatted!) > sellAmount)) {
        toast("Insufficient balance", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return false;
      }
    }
  }

  async function handleTransaction() {
    if (!buyToken || !address) return;
    const transaction = await swapTokens(
      TOKENLIST[sellToken].address,
      TOKENLIST[buyToken].address,
      sellAmount,
      address,
      "1"
    );
    console.log(transaction);
    if (transaction.tx) {
      sendTransaction({
        account: address,
        to: transaction.tx.to,
        value: BigInt(transaction.tx.value),
        data: transaction.tx.data,
      });
    }
  }

  async function handleApproval() {
    const approve = await approveTrasaction(TOKENLIST[sellToken].address);
    console.log(approve);
    if (approve.data) {
      sendTransaction({
        to: approve.to,
        data: approve.data,
      });
    }
  }

  async function handleSwap() {
    if (address) {
      setIsLoading(true);
      // const hasBalance = await checkBalance();
      // if (!hasBalance) {
      //   setIsLoading(false);
      //   return;
      // }
      const allowance = await checkAllowance(
        TOKENLIST[sellToken].address,
        address
      );
      console.log(allowance);
      if (allowance.allowance === "0") {
        await handleApproval();
      }
      handleTransaction();
      setIsLoading(false);
    }
  }

  async function handleQuote() {
    if (buyToken === undefined || sellAmount === 0) return;
    setIsLoading(true);
    const quote = await getQuote(
      TOKENLIST[sellToken].address,
      TOKENLIST[buyToken].address,
      sellAmount
    );
    console.log(quote);
    if (quote.toAmount) {
      setBuyAmount(Number(quote.toAmount));
    } else {
      toast(quote.description, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="bg-gray-900 w-96 p-4 rounded-2xl">
      <h4 className="font-semibold text-md">Swap</h4>
      <div>
        <div className="mt-4">
          <SellCard />
        </div>
        <div className="bg-gray-800 w-fit mx-auto rounded-full -my-1 z-50">
          <BsArrowDownShort className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <BuyCard />
        </div>
        {buyAmount ? (
          <button
            className={`flex items-center bg-[#2f8af5] ${
              isConnected ? "bg-opacity-20" : "bg-opacity-10"
            } p-3 rounded-xl gap-4 mt-4 w-full justify-center text-[#2F8AF5] font-semibold text-lg`}
            disabled={isConnected ? false : true}
            onClick={handleSwap}
          >
            {isLoading ? <Spinner /> : <p>Swap</p>}
          </button>
        ) : (
          <button
            className={`flex items-center bg-[#2f8af5] bg-opacity-20 p-3 rounded-xl gap-4 mt-4 w-full justify-center text-[#2F8AF5] font-semibold text-lg`}
            onClick={handleQuote}
          >
            {isLoading ? <Spinner /> : <p>Get Quote</p>}
          </button>
        )}
      </div>
    </div>
  );
}
