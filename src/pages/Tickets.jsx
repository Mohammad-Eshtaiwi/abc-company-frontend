import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "./../components/Banner";
import "../scss/components/ticket.scss";
import "../scss/components/tickets.scss";
import Ticket from "./../components/Ticket";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [types, setTypes] = useState([]);

  const [statuses, setStatuses] = useState([]);
  useEffect(() => {
    (async function () {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      try {
        const statusesPromise = axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/statuses`);
        const typesPromise = axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/types`);
        const ticketsPromise = axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/tickets`, config);
        const result = await axios.all([statusesPromise, typesPromise, ticketsPromise]);

        setStatuses(result[0].data.data);
        setTypes(result[1].data.data);
        setTickets(result[2].data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <Banner title="Welcome To Summoner Rift" />
      <div className="container">
        <div className="tickets">
          <h2 className="tickets__title">{localStorage.getItem("isAdmin") === "true" ? "Tickets" : "Your Tickets"}</h2>
          <div className="flex flex--4 flex--2--md flex--sm">
            {tickets.map((ticket) => (
              <Ticket
                key={ticket._id}
                type={types.find((type) => type._id === ticket.type)}
                priority={statuses.find((status) => status.key === ticket.status).key}
                title={ticket.title}
                ticketId={ticket._id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Tickets;
