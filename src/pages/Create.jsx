import React from "react";
import Banner from "./../components/Banner";
import CreateTicketForm from "./../components/CreateTicketForm";

function Create() {
  return (
    <>
      <div className="create-ticket">
        <Banner title="Welcome To Summoner Rift" />
        <CreateTicketForm />
      </div>
    </>
  );
}

export default Create;
