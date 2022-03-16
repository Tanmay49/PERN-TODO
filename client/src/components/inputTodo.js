import React, { Fragment, useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }); //fetch by default calls the GET function
    window.location='/';
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1>
        <div className="text-center mt-5">Pern Todo List</div>
      </h1>

      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => {setDescription(e.target.value)}} ///fuck don't forget to add these shitty fucking brackets...
          // Failed to fetch error. FUckkkkkk.....
        />
        <button className="btn btn-success">Add</button>
      </form>  
    </Fragment>
  );
};

export default InputTodo;
