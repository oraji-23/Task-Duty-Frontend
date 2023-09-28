import React from "react";
import vector from "../assets/images/Vector.png";
import clarity from "../assets/images/clarity_note-edit-line.png";
import fluent from "../assets/images/fluent_delete-24-regular.png";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import toast from "react-hot-toast";

const Tasks = ({baseURL}) => {
  const { data, loading, error } = useFetch(`${baseURL}/api/task`);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const options = {
      method: "DELETE",
    };
    const res = await fetch(`${baseURL}/api/task/${id}`, options);
    const data = await res.json();

    if (res.status === 200) {
      toast.success(data.message);
      setTimeout(() => {
        navigate(0);
      }, 1000);
    }
  };

  return (
    <div className="container">
      <div className="box-1 d-flex py-3 justify-content-between align-items-center">
        <div className="myTask py-5">
          <h2>My Tasks</h2>
        </div>
        <div className="newTask d-flex m-0">
          <img className="plus-sign" src={vector} alt="plus" />

          <Link className="text-decoration-none" to="/new">
            Add New Task
          </Link>
        </div>
      </div>

      <div className="d-flex flex-column gap-4">
        {data
          ? data.map((datum) => {
              const { title, description, tag } = datum;

              return (
                <div
                  key={datum._id}
                  className="border rounded-3 p-3 align-items-center"
                >
                  <div className="d-flex justify-content-between  ">
                    <p
                      className={
                        tag === "urgent" ? "text-danger" : "text-success"
                      }
                    >
                      {tag}
                    </p>

                    <div className="d-flex gap-4">
                      <Link
                        to={`/edit/${datum._id}`}
                        className="edit-icon rounded-3 p-2"
                      >
                        {" "}
                        <img src={clarity} alt="edit icon" /> Edit
                      </Link>
                      <button
                        onClick={() => {
                          handleDelete(datum._id);
                        }}
                        className="delete-icon rounded-3"
                      >
                        {" "}
                        <img src={fluent} alt="" /> Delete
                      </button>
                    </div>
                  </div>
                  <hr />
                  <h1 className="text-start">{title}</h1>
                  <p className="text-start">{description}</p>
                </div>
              );
            })
          : null}

        {loading ? <p>Loading...</p> : null}

        {error ? <p>{error}</p> : null}
      </div>
      <a style={{ color: "#974fd0" }} href="#top">
        Back to Top
      </a>
    </div>
  );
};

export default Tasks;
