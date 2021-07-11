import React from "react";
import { Link } from "react-router-dom";
function Ticket({ type, title, priority, ticketId }) {
  console.log(priority);
  return (
    <Link to={`/tickets/${ticketId}`} className="ticket grid">
      <h3 className="ticket__title" data-type={priority}>
        {title}
      </h3>
      <img src={type && type.img} alt={title} />
    </Link>
  );
}

export default Ticket;
