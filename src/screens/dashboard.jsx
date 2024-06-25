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
import AUTH_URL from "../constants/localUrl";
import TodoInfo from "./todoInfo";
import { Alert } from "@mui/material";

function Dashboard() {
  const navigate = useNavigate();
  const [userID, setUserID] = useState(localStorage.getItem("id"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [recent, setRecent] = useState([]);
  const [editor, setEditor] = useState({});
  const [middleItems, setMiddleItems] = useState({
    new: 0,
    pro: 0,
    done: 0,
    due: 0,
  });
  const [error, setError] = useState({});

  const handleUpdateItem = (updatedItem) => {
    setRecent((prevItems) =>
      prevItems.map((item) =>
        item.task === updatedItem.task ? updatedItem : item
      )
    );
  };

  useEffect(() => {
    if (!localStorage.getItem("id")) {
      navigate("/login");
      return;
    }
    getUserDetails(setLoading, setUser, userID, navigate, setError);
    getTodo(setLoading, setRecent, userID, navigate, setError);
    // console.log(recent)
  }, []);
  useEffect(() => {
    setMiddleItems({
      new: recent.filter(filterNew).length,
      pro: recent.filter(filterProgress).length,
      done: recent.filter(filterDone).length,
      due: recent.filter(filterDue).length,
    });
  }, [recent]);

  function setMarked(el, action) {
    if (action == "add")
      setMiddleItems((previous) => ({
        ...previous,
        [el]: middleItems[el] + 1,
      }));
    else
      setMiddleItems((previous) => ({
        ...previous,
        [el]: middleItems[el] - 1,
      }));
  }

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
      amount: middleItems.new,
    },
    {
      title: "Progress",
      icon: <InProgressIcon color="white" size={20} />,
      color: "#dbb237",
      shade: "#ad8d2b",
      amount: middleItems.pro,
    },
    {
      title: "Done",
      icon: <CompletedIcon color="white" size={20} />,
      color: "#37dbc0",
      shade: "#31b59f",
      amount: middleItems.done,
    },
    {
      title: "Due",
      icon: <DueIcon color="white" size={20} />,
      color: "#db5837",
      shade: "#963b24",
      amount: middleItems.due,
    },
  ];

  return (
    <div className="h-screen">
      {loading && (
        <div
          style={{ backgroundColor: "rgba(230, 236, 242, 0.8)" }}
          className="flex justify-center items-center top-0 z-10 fixed bottom-0 right-0 left-0"
        >
          <svg
            className="loaderChild"
            x="0px"
            y="0px"
            viewBox="0 0 50 31.25"
            height="31.25"
            width="50"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              className="track"
              strokeWidth="4"
              fill="none"
              pathLength="100"
              d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25"
            />
            <path
              className="car"
              strokeWidth="4"
              fill="none"
              pathLength="100"
              d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25"
            />
          </svg>
        </div>
      )}
      {Object.keys(editor).length != 0 && (
        <TodoInfo item={editor} close={() => setEditor({})} />
      )}
      {error?.api && <Alert className="my-3" severity="error">{error.api}</Alert>}

      <div id="top" className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-between items-center">
          <img
            src={ProfilePic}
            alt="profile"
            className="w-12 h-12 rounded-full cursor-pointer"
          />
          <div className="ml-2">
            <p className="text-2xl">
              Hi,{" "}
              {user?.username?.length > 9
                ? user?.username.slice(0, 8) + "..."
                : user?.username}
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
            amount={item.amount}
            onClick={() => {
              if (item.title == "New") setEditor(item);
            }}
          />
        ))}
      </div>
      <p className="font-semibold">Recent Task</p>
      <div>
        {recent.length === 0 && (
          <p className="italic my-2">No Recent tasks, create one now...</p>
        )}
        {recent.map((item, index) => (
          <Card2
            key={index}
            task={item.task}
            completed={item.completed}
            tags={item.tags}
            onClick={() => setEditor(item)}
            onTicked={() => {
              handleUpdateItem({ ...item, completed: !item.completed });
            }}
          />
        ))}
      </div>
      <div className="fixed bottom-3 left-[44%] bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_3px_9px_-2px_black] cursor-pointer">
        <AddIcon color={"white"} onClick={() => setEditor({ task: "" })} />
      </div>
    </div>
  );
}

const getUserDetails = async (setLoading, setUser, id, navigate, setError) => {
  setLoading(true);
  try {
    const response = await fetch(AUTH_URL + "/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "read", id }),
    });
    const data = await response.json();
    if (response.status > 500) {
      setError((prevState) => ({
        ...prevState,
        api: "Aww, our servers are down we are working to get it back up",
      }));
      return;
    }
    if (!response.ok) {
      localStorage.removeItem("id");
      navigate("/login");
      return;
    }
    setUser(data.body);
    return;
  } catch (error) {
    console.error(error.message);
    setError((prevState) => ({ ...prevState, api: String(error.message) }));
  } finally {
    setLoading(false);
  }
};
const getTodo = async (setLoading, setRecent, user_id, navigate, setError) => {
  setLoading(true);
  try {
    const response = await fetch(AUTH_URL + "/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "read", user_id }),
    });
    const data = await response.json();
    if (response.status > 500) {
      setError((prevState) => ({
        ...prevState,
        api: "Aww, our servers are down we are working to get it back up",
      }));
      return;
    }
    if (!response.ok) {
      localStorage.removeItem("id");
      navigate("/login");
      return;
    }
    setRecent(data.body);
    return;
  } catch (error) {
    console.error(error.message);
    setError((prevState) => ({ ...prevState, api: String(error.message) }));
  } finally {
    setLoading(false);
  }
};

const filterNew = (item) => {
  const today = new Date();
  const itemDate = new Date(item.created_at);
  return (
    today.getDate() === itemDate.getDate() &&
    today.getMonth() === itemDate.getMonth() &&
    today.getFullYear() === itemDate.getFullYear()
  );
};
const filterDue = (item) => {
  const today = new Date();
  const itemDate = new Date(item.due);
  return today >= itemDate;
};
const filterDone = (item) => {
  return item.completed;
};

const filterProgress = (item) => {
  return !item.completed;
};

export default Dashboard;
