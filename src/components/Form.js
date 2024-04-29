import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, handleEditSubmit } from '../redux/todoapp/actions';

export const Form = ({ editFormVisibility, editTodo, cancelUpdate }) => {
  // Dispatch function to dispatch actions
  const dispatch = useDispatch();

  // State for input value in normal add todo form
  const [todoValue, setTodoValue] = useState('');

  // State for input value in update form
  const [editValue, setEditValue] = useState('');

  // UseEffect to update input value in update form when editTodo changes
  useEffect(() => {
    setEditValue(editTodo.todo);
  }, [editTodo]);

  // Handle submit for normal add todo form
  const handleSubmit = (e) => {
    e.preventDefault();
    let date = new Date();
    let time = date.getTime();
    let todoObj = {
      id: time,
      todo: todoValue,
      completed: false
    };
    setTodoValue('');
    dispatch(addTodo(todoObj));
  };

  // Handle submit for update form
  const editSubmit = (e) => {
    e.preventDefault();
    let editedObj = {
      id: editTodo.id,
      todo: editValue,
      completed: false
    };
    dispatch(handleEditSubmit(editedObj));
  };

  return (
    <>
      {editFormVisibility === false ? (
        <form className='form-group custom-form' onSubmit={handleSubmit}>
          <label className='label-text'>Add Your Items</label>
          <div className='input-and-btn'>
            <input
              type="text"
              className='form-control'
              required
              value={todoValue}
              onChange={(e) => setTodoValue(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className='btn btn-primary btn-md back-btn'
            style={{ backgroundColor: 'green' }}
          >
            ADD
          </button>
        </form>
      ) : (
        <form className='form-group custom-form' onSubmit={editSubmit}>
          <label>Update your todo-items</label>
          <div className='input-and-btn'>
            <input
              type="text"
              className='form-control'
              required
              value={editValue || ""}
              onChange={(e) => setEditValue(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className='btn btn-secondary btn-md'
            style={{ backgroundColor: 'green' }}
          >
            UPDATE
          </button>
          <button
            type="button"
            className='btn btn-primary btn-md back-btn'
            style={{ backgroundColor: 'green' }}
            onClick={cancelUpdate}
          >
            BACK
          </button>
        </form>
      )}
    </>
  );
};
