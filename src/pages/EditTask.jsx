import React, { useEffect, useState } from "react";
import eva_arrow from "../assets/images/eva_arrow-ios-back-fill.png";
import vector1 from "../assets/images/Vector (1).png";
import Dropdown from "../components/Dropdown";
import { useNavigate, useParams } from "react-router-dom";
import Dropdown1 from "../components/Dropdown1";
import { useFetch } from "../hooks/useFetch";
import toast from "react-hot-toast";

const EditTask = ({baseURL}) => {
  const { id } = useParams();
  console.log(id);

  const { data, loading, error } = useFetch(
    `${baseURL}/api/task/${id}`
  );

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("urgent");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    setSending(true);
    e.preventDefault();

    const formData = {
      title,
      description,
      tag,
    };
    console.log(formData);

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const res = await fetch(`${baseURL}/api/task/${id}`, options);
    const data = await res.json();
    if (res.status === 200) {
      toast.success(data.message);
      navigate("/tasks");
    }
  };

  return (
    <div>
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="d-flex align-items-center gap-3 container mb-4"
      >
        <img src={eva_arrow} alt="" />
        <h2>Edit Task</h2>
      </div>
      <form onSubmit={handleSubmit} action="">
        <div className="position-relative  container mb-4">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
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
            value={description}
          ></textarea>
          <p className="decrip position-absolute ">Description</p>
        </div>

        {/* <Dropdown /> */}

        <Dropdown1 setTag={setTag} />

        <button disabled={sending} className="drop-btn w-100 px-5 py-2">
          Done
        </button>
      </form>
    </div>
  );
};

export default EditTask;
