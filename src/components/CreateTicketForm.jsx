import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useInput from "./../hooks/useInput";
import joi from "joi";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "./Input";
import TextArea from "./TextArea";
import "../scss/components/form.scss";

function CreateTicketForm() {
  const params = useParams();
  console.log(params);
  const [body, bindBody, resetBody, validateBody, bodyHasChanged] = useInput(
    "",
    joi.string().min(32).max(255).required()
  );
  const [title, bindTitle, resetTitle, validateTitle, titleHasChanged] = useInput(
    "",
    joi.string().min(4).max(32).required()
  );
  const [priorities, setPriorities] = useState([]);
  const [priority, setPriority] = useState(1);
  useEffect(() => {
    (async function () {
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/priorities`);
      setPriorities(data.data);
    })();
  }, []);
  const onSubmit = async (e) => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    e.preventDefault();
    resetBody();
    resetTitle();
    const toastLoading = toast.loading("creating");
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/tickets`,
        {
          title,
          body,
          createdBy: localStorage.getItem("username"),
          type: params["type"],
          priority,
        },
        config
      );
      toast.dismiss(toastLoading);
      console.log(data);
      if (data.status !== 201) throw data;
      toast.success("created");
    } catch (error) {
      toast.dismiss(toastLoading);
      console.log(error);
      if (error.status) toast.error(error.message.replaceAll('"', ""));
    }
  };
  return (
    <div className="create-ticker">
      <div className="container">
        <form className="form" onSubmit={onSubmit}>
          <Input
            name="title"
            title="title"
            type="text"
            bind={bindTitle}
            validate={validateTitle}
            hasChanged={titleHasChanged}
          />
          <select name="priority" id="priority" onChange={(e) => setPriority(parseInt(e.target.value))}>
            {priorities.map((priority) => (
              <option value={priority.key} key={priority._id}>
                {priority.label}
              </option>
            ))}
          </select>
          <TextArea
            name="body"
            title="body"
            bind={bindBody}
            validate={validateBody}
            hasChanged={bodyHasChanged}
            rows={5}
          />
          <button type="submit">create ticket</button>
        </form>
      </div>
    </div>
  );
}

export default CreateTicketForm;
