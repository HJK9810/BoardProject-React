import {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import BoardService from "../service/BoardService";
import Moment from "react-moment";
import {useParams} from "react-router-dom";

function ViewOne() {
  const [post, setPost] = useState({});
  const {id} = useParams();

  const fileDir = "/Users/hiju/documents/study/boardImage/";

  useEffect(() => {
    BoardService.findOne(Number(id)).then((res) => setPost(res));
  }, []);

  const showImage = () => {
    if (post.images) {
      post.images.split(",").map((el) => {
        return <img src={fileDir + el} />;
      });
    } else {
      return "";
    }
  };

  return (
    <Container>
      <h3>
        문의내역 조회 - <Moment date={post.createdDate} format="YYYY.MM.DD" />
      </h3>
      <h4>제목</h4>
      <div>{post.title}</div>
      <h4>첨부파일</h4>
      <div>{showImage()}</div>
      <h4>상세내용</h4>
      <div>{post.contents}</div>
    </Container>
  );
}

export default ViewOne;
