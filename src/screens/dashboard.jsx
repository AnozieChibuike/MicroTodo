import { useEffect, useState } from "react";
import ProfilePic from "../assets/profile2.jpg";
import Card from "../components/card";
import Card2 from "../components/card2";
import CompletedIcon from "../components/icons/completed";
import AddIcon from "../components/icons/new";
import DueIcon from "../components/icons/due";
import MenuIcon from "../components/icons/menu";
import NewIcon from "../components/icons/newRelease";
import InProgressIcon from "../components/icons/progress";
import BasicPopover from "../components/popOver";
import { useNavigate } from "react-router-dom";

const AUTH_URL = "http://localhost:5000";

function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("id")) {
      navigate("/login");
      return;
    }
    getUserDetails(setLoading, setUser, userID, navigate);
  }, [localStorage]);
  const [userID, setUserID] = useState(localStorage.getItem("id"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = !!anchorEl;
  const id = open ? "simple-popover" : undefined;
  const tags = {
    dev: { tag: "dev", color: "rgb(52, 135, 218)" },
    work: { tag: "work", color: "rgb(215, 76, 57)" },
    free: { tag: "free", color: "rgb(46, 191, 30)" },
  };
  const middle = [
    {
      title: "New",
      icon: <NewIcon color="white" size={20} />,
      color: "#3789db",
      shade: "#2f6ca8",
    },
    {
      title: "Progress",
      icon: <InProgressIcon color="white" size={20} />,
      color: "#dbb237",
      shade: "#ad8d2b",
    },
    {
      title: "Done",
      icon: <CompletedIcon color="white" size={20} />,
      color: "#37dbc0",
      shade: "#31b59f",
    },
    {
      title: "Due",
      icon: <DueIcon color="white" size={20} />,
      color: "#db5837",
      shade: "#963b24",
    },
  ];

  const recent = [
    {
      task: "Complete Backend",
      completed: true,
      tags: [tags.dev, tags.work],
    },
    {
      task: "Wish Malia a happy birthday",
      completed: false,
      tags: [tags.free],
    },
    {
      task: "Build my portfolio",
      completed: true,
      tags: [tags.free, tags.dev],
    },
    {
      task: "Build my portfolio",
      completed: true,
      tags: [tags.free, tags.dev],
    },
  ];

  return (
    <div className="h-screen">
      {loading && <p>Loading</p>}
      <div id="top" className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-between items-center">
          <img
            src={ProfilePic}
            alt="profile"
            className="w-12 h-12 rounded-full cursor-pointer"
          />
          <div className="ml-2">
            <p className="text-3xl">
              Hi,{" "}
              {user?.email.length > 10
                ? user?.email.slice(0, 8) + "..."
                : user?.email}
              👋
            </p>
            <p className="text-xs">Your daily adventure starts now</p>
          </div>
        </div>
        <MenuIcon size={30} aria_describedby={id} onClick={handleClick} />
        <BasicPopover
          id={id}
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
      </div>
      <div id="middle" className="grid grid-cols-2 gap-4 py-6">
        {middle.map((item, index) => (
          <Card
            color={item.color}
            title={item.title}
            icon={item.icon}
            key={index}
            shade={item.shade}
          />
        ))}
      </div>
      <p className="font-semibold">Recent Task</p>
      <div>
        {recent.map((item, index) => (
          <Card2
            key={index}
            task={item.task}
            completed={item.completed}
            tags={item.tags}
          />
        ))}
      </div>
      <div className="fixed bottom-3 left-[44%] bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_3px_9px_-2px_black] cursor-pointer">
        <AddIcon color={"white"} />
      </div>
    </div>
  );
}

const getUserDetails = async (setLoading, setUser, id, navigate) => {
  console.log("gotere");
  setLoading(true);
  try {
    const response = await fetch(AUTH_URL + "/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "read", id }),
    });
    const data = await response.json();
    if (response.status > 500) {
      // setError((prevState) => ({
      //   ...prevState,
      //   api: "Aww, our servers are down we are working to get it back up",
      // }));
      return;
    }
    if (!response.ok) {
      localStorage.removeItem("id");
      navigate("/login");
      return;
    }
    console.log(data);
    setUser(data.body);
    return;
  } catch (error) {
    console.error(error.message);
    // setError((prevState) => ({ ...prevState, api: String(error.message) }));
  } finally {
    setLoading(false);
  }
};

export default Dashboard;
