import { useState } from "react";
import CompletedIcon from "./icons/completed";

function Card2({ task, completed, tags }) {
  const [check, set] = useState(completed);
  const ticked = {
    icon: <CompletedIcon color="white" size={25} />,
    color: "#37dbc0",
    shade: check ? "#31b59f" : "grey",
  };
  return (
    <div
      className="flex my-4 flex-row justify-between items-center bg-white rounded-2xl border-[1px] border-black shadow-[0_6px_0px_-3px] w-full h-24 px-2 cursor-pointer"
    >
      <div className="flex flex-col">
        <p className="mb-2">{task}</p>
        <div className="flex gap-1">
          {tags.map((items, idx) => (
            <TagCard key={idx} tag={items.tag} color={items.color} />
          ))}
        </div>
      </div>
      <div className="h-[50%]">
        <div
          className={`cursor-pointer rounded-full p-2 w-12 h-12 flex items-center justify-center ${
            check == false ? "shadow-[inset_1px_3px_7px_-3px]" : ""
          }`}
          style={{ backgroundColor: ticked.shade }}
          onClick={() => set(!check)}
        >
          {check ? ticked.icon : ""}
        </div>
      </div>
    </div>
  );
}

function TagCard({ tag, color }) {
  return (
    <div
      className="text-white px-2 rounded-md"
      style={{ backgroundColor: color }}
    >
      <p>{tag}</p>
    </div>
  );
}

export default Card2;
