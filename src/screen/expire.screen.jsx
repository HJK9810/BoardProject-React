import {Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import Header from "../layout/Header";

function ExpireLogin() {
  const navigate = useNavigate();

  return (
    <Container className="text-center">
      <Header headline={"Login Please"} />
      <h3 className="p-2 pt-5 mt-5">로그인 시간이 만료되었습니다.</h3>
      <h5 className="p-1">다시 로그인 하거나 시간을 연장해 주세요.</h5>
      <button className="btn btn-outline-success m-3" onClick={(e) => navigate("/login")}>
        로그인 하기
      </button>
    </Container>
  );
}

export default ExpireLogin;
