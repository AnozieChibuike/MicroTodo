import { Link } from "react-router-dom";
import "../App.css";

const NoPage = () => {
  return (
    <div className="flex items-center justify-center flex-col h-[80vh]">
      <h1 className="">404 | Not Found</h1>
      <Link className="text-orange-500 underline" to={"login"}>Login</Link>
    </div>
  );
};

export default NoPage;
