import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import dotenv from "dotenv";
import ContextProvider from "./context";
import Create from "./pages/Create";
import Tickets from "./pages/Tickets";
import SingleTicket from "./pages/SingleTicket";
import Nav from "./components/Nav";
dotenv.config();
function App() {
  return (
    <Router>
      <ContextProvider>
        <Nav />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/tickets" exact>
            <Tickets />
          </Route>
          <Route path="/tickets/create/:type" exact>
            <Create />
          </Route>
          <Route path="/tickets/:id" exact>
            <SingleTicket />
          </Route>
        </Switch>
        <Toaster />
      </ContextProvider>
    </Router>
  );
}

export default App;
