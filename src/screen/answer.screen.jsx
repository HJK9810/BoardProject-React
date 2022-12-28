import {useEffect, useState} from "react";
import Moment from "react-moment";
import {useNavigate} from "react-router-dom";
import {ModalConfirm} from "../layout/Modal.layout";
import BoardService from "../service/BoardService";

function Answer(props) {
  const {answers, viewId, token} = props;
  const [btnShow, setBtnShow] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const delAnswer = async (e) => {
    e.preventDefault();

    await BoardService.delAnswer(Number(viewId), Number(e.target.getAttribute("editid")), token);
    setShow(false);
    props.setACount(answers.length - 1);
  };

  return (
    <>
      <h5 className="p-3 pb-0 mb-0">답변내용</h5>
      {answers
        ? answers.map((el, i) => {
            return (
              <div key={i} className="mt-3">
                <p className="p-2 m-1 mb-0">
                  <Moment date={el.createdDate} format="YYYY.MM.DD" />
                </p>
                <div className="p-3 m-2 mt-0 bg-dark rounded" onMouseEnter={(e) => setBtnShow(true)} onMouseLeave={(e) => setBtnShow(false)}>
                  <div className={"btn-group float-end" + (btnShow ? "" : " hideItem")} role="group">
                    <button type="button" className="btn btn-outline-info" id={el.id} onClick={(e) => navigate(`/editAnswer/${e.target.id}`, {state: viewId})}>
                      수정
                    </button>
                    <button type="button" className="btn btn-outline-danger" onClick={(e) => setShow(true)}>
                      삭제
                    </button>
                  </div>
                  <div>
                    {el.contents.split("\n").map((line, i) => (
                      <span key={i}>
                        {line} <br />
                      </span>
                    ))}
                  </div>
                </div>

                <ModalConfirm id={el.id} show={show} message={"해당 답변을 삭제하시겠습니까?"} okFunc={delAnswer} cancleFunc={() => setShow(false)} />
              </div>
            );
          })
        : []}
    </>
  );
}

export default Answer;
