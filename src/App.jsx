import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import Add from "./screen/add.screen";
import Baord from "./screen/board.screen";
import Main from "./screen/board.screen";
import ViewOne from "./screen/view.screen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Main />}></Route>
            <Route path="/board" element={<Baord />}></Route>
            <Route path="/add" element={<Add />}></Route>
            <Route path="/viewOne/:id" element={<ViewOne />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
