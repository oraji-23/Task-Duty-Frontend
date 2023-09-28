import React, { useState } from "react";
import eva_arrow from "../assets/images/eva_arrow-ios-back-fill.png";
import Dropdown from "../components/Dropdown";
import { useNavigate } from "react-router-dom";
import Dropdown1 from "../components/Dropdown1";
import toast from "react-hot-toast";

const NewTask = ({baseURL}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("urgent");
  const [sending, setSending] = useState(false)

  

  const handleSubmit = async (e) => {
    

    const res = await fetch(`${baseURL}/api/task/create`, options);
    const data = await res.json();

    if (res.status === 400) {
      toast.error(data.message);
      setSending(false)
      return;
    }

    toast.success(data.message);
    setSending(false)
    navigate("/tasks")
  };

  const navigate = useNavigate();
  return (
    <div>
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="d-flex align-items-center gap-3 container mb-4"
      >
        <img src={eva_arrow} alt="" />
        <h2>New Task</h2>
      </div>
      <form onSubmit={handleSubmit} action="">
        <div className="position-relative  container mb-4">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="w-100 py-3 px-4 "
            type="text"
            placeholder="E.g Project Defense,Assignment"
          />
          <p className="task-t position-absolute">Task Title</p>
        </div>
        <div className="position-relative">
          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="py-3 px-4 container"
            name=""
            id=""
            cols=""
            rows="8"
            placeholder="briefly describe your Task"
          ></textarea>
          <p className="decrip position-absolute ">Description</p>
        </div>

        {/* <Dropdown /> */}

        <Dropdown1 setTag={setTag} />

        <button disabled={sending} className="drop-btn w-100 px-5 py-2">Done</button>
      </form>
      <div className="mt-4">
        <a style={{ color: "#974fd0" }} href="#top">
          Back to Top
        </a>
      </div>
    </div>
  );
};

export default NewTask;
