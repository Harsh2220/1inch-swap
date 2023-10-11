"use client";

import React, { useState } from "react";
import Modal from "./UI/Modal";
import TOKENLIST from "../data/TokenList.json";
import { useTokenStore } from "@/store";
import { FiChevronDown } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import TokenCard from "./TokenCard";

export default function SellCard() {
  const [isOpen, setIsOpen] = useState(false);
  const { setSellToken, sellToken, setSellAmount, sellAmount } =
    useTokenStore();

  return (
    <>
      <div className="bg-black rounded-xl py-4">
        <p className="text-gray-600 text-xs font-medium px-4">You sell</p>
        <div className="mt-1 flex justify-between items-center p-2">
          <div
            className="flex gap-2 justify-between items-center py-1 px-2 hover:bg-gray-800 rounded-lg min-w-fit cursor-pointer"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <img
              src={TOKENLIST[sellToken].logoURI}
              alt={TOKENLIST[sellToken].name}
              className="w-6 h-6"
            />
            <h3 className="text-lg font-medium">
              {TOKENLIST[sellToken].symbol}
            </h3>
            <div>
              <FiChevronDown className="w-5 h-5 text-gray-600 font-bold" />
            </div>
          </div>
          <div className="w-fit">
            <input
              type="number"
              className="bg-transparent border-none focus:outline-none text-end text-2xl font-semibold w-full"
              placeholder="0"
              onChange={(e) => {
                setSellAmount(Number(e.target.value));
              }}
            />
          </div>
        </div>
        <p className="text-gray-600 text-xs font-semibold px-4">
          {TOKENLIST[sellToken].name}
        </p>
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
                  setSellToken(index);
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
