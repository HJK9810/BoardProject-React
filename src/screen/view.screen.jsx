import {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import BoardService from "../service/BoardService";
import Moment from "react-moment";
import {useParams} from "react-router-dom";

function ViewOne() {
  const [post, setPost] = useState({});
  const [image, setImage] = useState([]);
  const {id} = useParams();

  const fileDir = "http://localhost:8080/image/";

  useEffect(() => {
    BoardService.findOne(Number(id)).then((res) => {
      setPost(res);
      if (res.images) setImage(res.images.split(","));
    });
  }, []);

  const showImage = (root) => {
    return <img src={fileDir + root} width={300 + "px"} />;
  };

  return (
    <Container>
      <h3>
        문의내역 조회 - <Moment date={post.createdDate} format="YYYY.MM.DD" />
      </h3>
      <h4>제목</h4>
      <div>{post.title}</div>
      <h4>첨부파일</h4>
      <div style={{overflow: "scroll"}}>{image ? image.map((el) => (el ? showImage(el) : null)) : null}</div>
      <h4>상세내용</h4>
      <div>{post.contents}</div>
    </Container>
  );
}

export default ViewOne;
