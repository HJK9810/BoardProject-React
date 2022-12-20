import {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import BoardService from "../service/BoardService";
import Moment from "react-moment";
import Pagination from "./pagination.screen";
import {useCookies} from "react-cookie";
import jwtDecode from "jwt-decode";

function Baord() {
  const [post, setPost] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const [cookie, setCookie] = useCookies(["token"]);
  const [user, setUser] = useState("");

  useEffect(() => {
    console.log(cookie.token);
    const token = cookie.token;
    BoardService.findAll(page, 5, token).then((res) => {
      setPost(res.content);
      setPagination({number: res.number, totalPages: res.totalPages, first: res.first, last: res.last});
    });
    setUser(jwtDecode(token).sub);
  }, [page]);

  const moveView = (event) => {
    event.preventDefault();
    if (event.target.id) navigate(`/viewOne/${event.target.id}`);
    // if (event.target.id) window.location.href = `/viewOne/${event.target.id}`;
  };

  return (
    <Container>
      <h3>문의사항</h3>
      {post.map((el) => {
        const name = el.users.name;
        const email = el.users.email;

        return (
          <div key={el.id} id={el.id} onClick={email == user || user == "admin" ? moveView : () => {}}>
            <h4 className="pt-2">{el.title}</h4>
            <span>{email == user || user == "admin" ? name : name.charAt(0) + "*" + name.substring(2)}</span>
            <p className="mb-0">
              <Moment date={el.createdDate} format="YYYY.MM.DD" />
            </p>
            <hr className="m-0" />
          </div>
        );
      })}
      <div className="d-flex justify-content-center mt-2">
        <Pagination pagination={pagination} setPage={(p) => setPage(p)} />
      </div>
      <button className="btn btn-secondary" style={{width: 100 + "%"}} onClick={(e) => navigate("/add")}>
        문의하기
      </button>
    </Container>
  );
}

export default Baord;
