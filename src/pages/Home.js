import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import "./css/Home.css";

function Home() {
  const [todolist, setTodolist] = useState([
    {
      id: "c3ce495c-8390-4db2-9a92-3489ded2b2ff",
      createdAt: "15/02/2023, 17:24:17",
      title: "Test",
      description: "This is the test data.",
      dueDate: "06/03/2023, 05:30:00",
      tags: ["one", "two", "three"],
      status: "Overdue",
    },
  ]);
  const addNewItem = (item) => {
    const newItem = {
      id: uuidv4(),
      createdAt: new Date().toLocaleString(),
      title: item.title,
      description: item.description,
      tags: item.tags ? item.tags : [],
      status: item.status,
      dueDate: item.dueDate ? new Date(item.dueDate).toLocaleString() : "",
    };
    setTodolist([...todolist, newItem]);
    // console.log(todolist);
  };
  return (
    <div className="Home">
      <TodoForm addNewItem={addNewItem} />
      <TodoList
        dataSource={todolist}
        setDataSource={setTodolist}
        handleSave={addNewItem}
      />
    </div>
  );
}

export default Home;
