import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../scss/components/singleTicket.scss";
import "../scss/components/form.scss";
import "../scss/components/comments.scss";
import Banner from "./../components/Banner";
import useInput from "./../hooks/useInput";
import joi from "joi";
import TextArea from "./../components/TextArea";
import toast from "react-hot-toast";

function SingleTicket() {
  const params = useParams();
  const [ticket, setTicket] = useState({});
  const [statuses, setStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [comments, setComments] = useState([]);
  const [body, bindBody, resetBody, validateBody, bodyHasChanged] = useInput(
    "",
    joi.string().min(32).max(255).required()
  );
  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    (async function () {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/tickets/${params.id}`, config);
        const { data: statusData } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/statuses`);
        setStatuses(statusData.data);
        console.log(data.data[0]);
        setTicket(data.data[0]);
        setSelectedStatus(data.data[0].status);
        setComments(data.data[0].comments);
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onChangeStatus = async (e) => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    setSelectedStatus(e.target.value);
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/tickets/${params.id}/status`,
        { status: parseInt(e.target.value) },
        config
      );
      if (data.data[0].status !== 201) throw data.data[0];
      toast.success("status updated");
    } catch (error) {
      if (error.status) toast.error(error.message);
    }
  };
  const onSubmit = async (e) => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    e.preventDefault();
    const toastId = toast.loading("commenting");
    resetBody();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/tickets/comments`,
        { body, id: params.id },
        config
      );
      console.log(data);
      if (data.status !== 201) throw data;
      setComments(data.data[0].comments);
      toast.dismiss(toastId);
      toast.success("commented");
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
      toast.error(error.message);
    }
  };
  return (
    <>
      <Banner />
      <div className="container">
        <div className="single-ticket">
          <h2 className="single-ticket__title">{ticket.title}</h2>
          <p className="single-ticket__body">{ticket.body}</p>
        </div>

        <form onSubmit={(e) => onSubmit(e)} className="form m-0">
          {localStorage.getItem("isAdmin") === "true" && (
            <select name="priority" id="priority" onChange={(e) => onChangeStatus(e)} value={selectedStatus}>
              {statuses.map((status) => (
                <option value={status.key} key={status.key}>
                  {status.label}
                </option>
              ))}
            </select>
          )}
          <TextArea
            type="text"
            name="body"
            title="body"
            bind={bindBody}
            validate={validateBody}
            hasChanged={bodyHasChanged}
            rows="5"
          />
          <button type="submit">create comment</button>
        </form>
        <div className="comments">
          {comments &&
            comments.map((comment) => (
              <div className="comment" key={comment._id}>
                <h3 className="commentedBy">commented by {comment.createdBy}</h3>
                <p className="body">{comment.body}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default SingleTicket;
