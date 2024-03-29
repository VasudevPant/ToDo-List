import React, { useState, useEffect } from "react";
import "./style.css";

//get the local storage data back

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setitems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // addItem function

  const addItem = () => {
    if (!inputData) {
      alert("please fill the data");
    } 

    else if(inputData && toggleButton){

      setitems(
        items.map((curElem) => {
          if(curElem.id === isEditItem) {
            return {...curElem, name: inputData};
        }
        return curElem;
      })
      );
      setInputData("");
      setIsEditItem("");
      setToggleButton(false);
    }
    
    
    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };

      setitems([...items, myNewInputData]);
      setInputData("");
    }
  };

  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  const deleteItem = (index) => {
    const updatedItem = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setitems(updatedItem);
  };

  const removeAll = () => {
    setitems([]);
  };

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.png" alt="todo logo" />
            <figcaption>Add your list here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add item"
              className="form-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i className=" far fa-edit fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className=" fa fa-solid fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          {/* show our items */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className=" far fa-solid fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}
                    ></i>
                    <i
                      className=" far fa-solid fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECKLIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
