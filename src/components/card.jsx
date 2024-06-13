function Card({ index, color, title, icon, shade, amount = 10 }) {
  return (
    <div
      key={index}
      className="flex items-center pl-3 pr-5 rounded-2xl h-[4.5rem]"
      style={{ backgroundColor: color }}
    >
      <div className={`rounded-full p-2`} style={{ backgroundColor: shade }}>
        {icon}
      </div>
      <div className="ml-2">
        <p className="font-semibold text-sm">
          {title.length >= 9 ? title.slice(0, 6) + "..." : title}
        </p>
        <p className="text-xs">
          <span>{amount}</span> Tasks
        </p>
      </div>
    </div>
  );
}

export default Card;
