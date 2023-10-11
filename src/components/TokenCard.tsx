import React from "react";

export default function TokenCard({
  image,
  name,
}: {
  image: string;
  name: string;
}) {
  return (
    <div className="flex items-center gap-2 hover:bg-gray-950 p-4 cursor-pointer">
      <img src={image} alt={name} className="w-8 h-8" />
      <h1 className="text-lg font-medium">{name}</h1>
    </div>
  );
}
