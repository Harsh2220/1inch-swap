"use client";

import { useTokenStore } from "@/store";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import TOKENLIST from "../data/TokenList.json";
import TokenCard from "./TokenCard";
import Modal from "./UI/Modal";

export default function BuyCard() {
  const [isOpen, setIsOpen] = useState(false);
  const { buyAmount, buyToken, setBuyToken, setBuyAmount } = useTokenStore();

  return (
    <>
      <div className="rounded-xl py-4 border border-gray-800">
        <p className="text-gray-600 text-xs font-medium px-4">You buy</p>
        <div className="mt-1 flex justify-between items-center p-2 cursor-pointer">
          {buyToken !== undefined ? (
            <div
              className="flex gap-2 justify-between items-center py-1 px-2 hover:bg-gray-800 rounded-lg min-w-fit cursor-pointer"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <img
                src={TOKENLIST[buyToken].logoURI}
                alt={TOKENLIST[buyToken].name}
                className="w-6 h-6"
              />
              <h3 className="text-lg font-medium">
                {TOKENLIST[buyToken].symbol}
              </h3>
              <div>
                <FiChevronDown className="w-5 h-5 text-gray-600 font-bold" />
              </div>
            </div>
          ) : (
            <div
              className="flex gap-2 justify-between items-center py-1 px-2 bg-[#2f8af5] hover:bg-[#2f8af5] bg-opacity-20 rounded-lg min-w-fit"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <h3 className="text-md font-medium">Select a token</h3>
              <div>
                <FiChevronDown className="w-5 h-5 font-bold text-white" />
              </div>
            </div>
          )}
          <div className="w-fit">
            <input
              type="number"
              className="bg-transparent border-none focus:outline-none text-end text-2xl font-semibold w-full"
              placeholder="0"
              disabled
              value={buyAmount}
            />
          </div>
        </div>
        {buyToken ? (
          <p className="text-gray-600 text-xs font-semibold px-4">
            {TOKENLIST[buyToken].name}
          </p>
        ) : null}
      </div>
      {isOpen ? (
        <Modal>
          <div className="px-4 pt-4 flex justify-evenly items-center">
            <div
              className="absolute left-4 cursor-pointer"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <IoIosArrowBack />
            </div>
            <h3 className="font-semibold">Select Token</h3>
          </div>
          <div className="flex-col py-2">
            {TOKENLIST.map((token, index) => (
              <div
                key={index}
                onClick={() => {
                  setBuyToken(index);
                  setIsOpen(false);
                }}
              >
                <TokenCard image={token.logoURI} name={token.name} />
              </div>
            ))}
          </div>
        </Modal>
      ) : null}
    </>
  );
}
