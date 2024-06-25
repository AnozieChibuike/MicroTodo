import React from "react";
import { FaTimes } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import Datepicker from "tailwind-datepicker-react";
import { TagCard } from "../components/card2";

function TodoInfo({ item, close = () => {} }) {
  const options = {
    title: "Due Date",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: "Clear",
    maxDate: new Date("2030-01-01"),
    minDate: new Date("2024-01-01"),
    theme: {
      background: "bg-slate-700 dark:bg-slate-700",
      todayBtn: "dark:text-pink-400 ",
      clearBtn: "dark:bg-orange-500 bg-orange-500",
      icons: "dark:bg-orange-500 bg-orange-500",
      text: "",
      disabledText: "text-slate-500 dark:text-slate-500",
      input: "dark:bg-orange-500 bg-orange-500",
      inputIcon: "dark:text-white text-white",
      selected: "dark:bg-orange-500 bg-orange-500",
    },
    datepickerClassNames: "top-12",
    language: "en",
    disabledDates: [],
    weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Select Date",
    inputDateFormatProp: {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  };
  const [show, setShow] = React.useState(false);
  const [content, setContent] = React.useState({
    id: item?.id || null,
    title: item?.title || "",
    task: item?.task || "",
    tags: item?.tags || [],
    due: item?.due ? new Date(item.due) : new Date(),
  });
  React.useEffect(() => {
    console.log(content);
  }, [content]);
  const handleChange = (data, name) =>
    setContent((prev) => ({ ...prev, [name]: data }));

  const handleUpdateTag = (index, item) => {
    if (index < 0) {
      console.log("Onajs");
      return;
    }
    const tags = [...content.tags];
    tags[index] = item;
    setContent({ ...content, tags });
  };
  return (
    <div className="flex flex-col  px-4 h-screen bg-gray-100 overflow-hidden fixed top-0 bottom-0 right-0 left-0 z-20">
      <div className="flex mt-16">
        <Datepicker
          options={{ ...options, defaultDate: content.due }}
          onChange={(date) => {
            // console.log(date)
            handleChange(date, "due");
          }}
          show={show}
          setShow={(state) => {
            setShow(state);
          }}
        />
      </div>
      <input
        value={item.title}
        className="h-20 p-4 my-5 border focus:border-pink-500 border-gray-300"
        placeholder="Title..."
        onChange={() => handleChange(event.target.value, "title")}
      />
      <textarea
        className="w-full max-w-3xl h-full p-4 text-lg leading-relaxed border border-gray-300 outline-none resize-none shadow-sm focus:border-orange-500 focus:shadow-outline-orange bg-white"
        placeholder="Start typing your task here..."
        value={content.task}
        onChange={() => handleChange(event.target.value, "task")}
      />
      <div
        className="bg-gray-200 border border-gray-300 h-32 py-3 px-2 mt-5 overflow-scroll flex justify-center gap-2"
        id="tags_father"
      >
        {content.tags.length > 0 && (
          <div className="flex flex-1 gap-2 overflow-scroll">
            {content.tags.map((items, idx) => (
              <TagCard
                key={idx}
                tag={items.tag}
                color={items.color}
                onClick={() => {
                  const defaultColorIndex = item.tags.findIndex(
                    (it) => it.tag == items.tag
                  );
                  const defaultColor = item.tags[defaultColorIndex].color;
                  const index = content.tags.findIndex((item) => item == items);
                  handleUpdateTag(index, {
                    ...items,
                    color: items.color == "gray" ? defaultColor : "gray",
                  });
                }}
              />
            ))}
          </div>
        )}
        <FaPlusCircle size={30} color="orange" className="self-center" />
      </div>
      <FaTimes
        className="absolute top-3 right-3"
        size={30}
        color="orange"
        onClick={close}
      />
      <button className="p-4 my-5 bg-orange-500 text-white">Save</button>
    </div>
  );
}

export default TodoInfo;
