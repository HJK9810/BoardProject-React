import {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import BoardService from "../service/BoardService";
import Moment from "react-moment";

function Baord() {
  const [post, setPost] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    BoardService.findAll().then((res) => setPost(res));
  }, []);

  const moveView = (event) => {
    event.preventDefault();
    if (event.target.id) navigate(`/viewOne/${event.target.id}`);
  };

  return (
    <Container>
      <h3>문의사항</h3>
      {post.map((el) => {
        return (
          <div key={el.id} id={el.id} onClick={moveView}>
            <h4>{el.title}</h4>
            <span>작성자</span>
            <p>
              <Moment date={el.createdDate} format="YYYY.MM.DD" />
            </p>
            <hr className="m-0" />
          </div>
        );
      })}
      <button style={{width: 100 + "%"}} onClick={(e) => navigate("/add")}>
        문의하기
      </button>
    </Container>
  );
}

export default Baord;
