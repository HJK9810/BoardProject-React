import {Container, Form} from "react-bootstrap";

function Add() {
  return (
    <Container>
      <h3>문의하기</h3>
      <Form>
        <h4>제목</h4>
        <input type="text" maxLength={256} placeholder="제목을 입력해주세요." />
        <h4>첨부파일</h4>
        <div></div>
        <h4>상세내용</h4>
        <textarea rows={5} style={{resize: "none"}}></textarea>
      </Form>
    </Container>
  );
}

export default Add;
