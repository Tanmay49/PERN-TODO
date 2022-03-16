import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {
  const [description, newDescription] = useState(todo.description);

  const updateTodo=async(e)=>{
    e.preventDefault();  
    
    try {
        const body={description}
        const response=await fetch(`https://localhost:5000/todos/${todo.todo_id}`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        });
      } catch (error) {
          console.error(error.message);
      }
  }

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning "
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>

      <div className="modal fade" id={`id${todo.todo_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input type="text" className="form-control" value={description} onChange={e=> newDescription(e.target.value)} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={(e)=>{
                    updateTodo(e);
                }}
              >
                Edit
              </button>

              <button type="button" className="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
