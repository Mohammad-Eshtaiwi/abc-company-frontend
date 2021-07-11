import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../scss/components/ticketTypes.scss";
function TicketTypes() {
  const [types, setTypes] = useState([]);
  useEffect(() => {
    (async function () {
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/types`);
      console.log(data);
      setTypes(data.data);
    })();
  }, []);
  return (
    <div className="ticket-types">
      <div className="container grid grid--4">
        {types.map((type) => {
          return (
            <Link to={`tickets/create/${type._id}`} key={type._id}>
              <img src={type.img} alt={type.label} />
              <h3 className="ticket-types__title">{type.label}</h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default TicketTypes;
