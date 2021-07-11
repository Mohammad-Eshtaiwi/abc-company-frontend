import React, { useContext } from "react";
import Banner from "./../components/Banner";
import Registration from "./../components/Registration";
import { registerContext } from "../context";

import TicketTypes from "./../components/TicketTypes";
function Home() {
  const context = useContext(registerContext);
  console.log(context);

  return (
    <>
      <div className="home">
        <Banner title="Welcome To Summoner Rift" />
        {!context.token ? <Registration /> : <TicketTypes />}
      </div>
    </>
  );
}

export default Home;
