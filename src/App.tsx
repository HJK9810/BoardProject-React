import {BrowserRouter, Routes, Route} from "react-router-dom";
import AddAnswer from "./answer/add.answer";
import EditAnswer from "./answer/edit.answer";
import "./App.scss";
import Add from "./screen/add.screen";
import Baord from "./screen/board.screen";
import Edit from "./screen/edit.screen";
import ExpireLogin from "./login/expire.screen";
import Login from "./login/login.screen";
import Logout from "./login/logout.screen";
import ViewOne from "./screen/view.screen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/board" element={<Baord />}></Route>
          <Route path="/add" element={<Add />}></Route>
          <Route path="/viewOne/:id" element={<ViewOne />}></Route>
          <Route path="/edit/:id" element={<Edit />}></Route>
          <Route path="/addAnswer/:id" element={<AddAnswer />}></Route>
          <Route path="/editAnswer/:id" element={<EditAnswer />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/expire" element={<ExpireLogin />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
