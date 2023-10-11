import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-4 ">
      <h1 className="font-semibold text-xl">1Inch-Swap</h1>
      <ConnectButton />
    </div>
  );
}
