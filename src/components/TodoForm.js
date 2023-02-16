import { DownOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, Input, Tooltip } from "antd";
import React, { useState } from "react";

import useHandleChange from "../hooks/useHandleChange";
import "./css/TodoForm.css";

function TodoForm({ addNewItem }) {
  const [statusValue, setStatusValue] = useState("Open");
  const [dueDate, setDueDate] = useState("");
  const [title, handleTitleChange, handleResetTitle] = useHandleChange("");
  const [description, handleDescriptionChange, handleResetDescription] =
    useHandleChange("");
  const [tags, handleTagChange, handleResetTags] = useHandleChange("");

  const handleSubmit = (e) => {
    e.preventDefault();
    var t = title.trim();
    var d = description.trim();
    if (!t || !d) {
      // console.log("running");
      return alert(
        "1. Title and Description are mandatory\n2. They should not start and end with whitespaces"
      );
    }
    var finaltags = tags.match(/\[[a-z]+\]+/g);
    if (finaltags && finaltags.length) {
      finaltags = finaltags.map((ele) => ele.substring(1, ele.length - 1));
    }
    addNewItem({
      title: t,
      description: d,
      status: statusValue,
      tags: finaltags,
      dueDate,
    });
    handleReset();
  };

  const handleReset = () => {
    handleResetDescription();
    setDueDate("");
    handleResetTitle();
    handleResetTags();
    setStatusValue("Open");
  };

  const handleTagAlert = () => {
    alert(
      "1. Only words inside [] are considered\n2. No special character\n3. No space in a single tag"
    );
  };

  const status = [
    {
      label: "Open",
    },
    {
      label: "Working",
    },
    {
      label: "Overdue",
    },
    {
      label: "Done",
    },
  ];
  const menuProps = {
    items: status,
    onClick: (e) => setStatusValue(e.domEvent.target.textContent),
  };

  return (
    <div className="TodoForm">
      <form>
        <label htmlFor="title">Title*</label>
        <Input
          id="title"
          placeholder="enter a title for your todo"
          name="title"
          value={title}
          onChange={handleTitleChange}
          autoFocus
          maxLength={100}
        />
        <br />
        <br />
        <label htmlFor="description">Description*</label>
        <Input
          id="description"
          placeholder="enter a description for your todo"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
          maxLength={1000}
        />
        <br />
        <br />

        <div className="date-status-group">
          <div className="due-date">
            <label htmlFor="dueDate">Due Date</label>
            <br />
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="">
            <label htmlFor="status">Status</label>
            <br />
            <Dropdown menu={menuProps}>
              <Button>
                <Space>
                  {statusValue}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
        </div>

        <br />

        <label htmlFor="tags">Tags </label>
        <Input
          type="text"
          id="tags"
          name="tags"
          value={tags}
          placeholder="[first] [second] [this is third tag]"
          onChange={handleTagChange}
          prefix={
            <Tooltip title=" Know how to write tags">
              <QuestionCircleOutlined onClick={handleTagAlert} />
            </Tooltip>
          }
        />

        <br />
        <br />

        <div className="handle-btn">
          <Button className="submit-btn" onClick={handleSubmit}>
            Submit
          </Button>
          <Button className="submit-btn" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
