import {BrowserRouter, Routes, Route} from "react-router-dom";
import AddAnswer from "./answer/add.answer";
import "./App.scss";
import Layout from "./layout/Layout";
import Add from "./screen/add.screen";
import Baord from "./screen/board.screen";
import Edit from "./screen/edit.screen";
import Login from "./screen/login.screen";
import Logout from "./screen/logout.screen";
import ViewOne from "./screen/view.screen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Baord />}></Route>
            <Route path="/board" element={<Baord />}></Route>
            <Route path="/add" element={<Add />}></Route>
            <Route path="/viewOne/:id" element={<ViewOne />}></Route>
            <Route path="/edit/:id" element={<Edit />}></Route>
            <Route path="/addAnswer/:id" element={<AddAnswer />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
