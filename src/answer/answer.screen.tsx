import jwtDecode from "jwt-decode";
import {MouseEvent, useEffect, useState} from "react";
import Moment from "react-moment";
import {useNavigate} from "react-router-dom";
import {ModalConfirm} from "../layout/Modal.layout";
import BoardService from "../service/BoardService";
import {answerForm, decodeForm} from "../service/Form";
import {answerProps} from "../service/Props";

function Answer({answers, viewId, token, setACount}: answerProps) {
  const [btnShow, setBtnShow] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useState("");

  useEffect(() => {
    const decode: decodeForm = jwtDecode(token);
    setAuth(decode.auth);
  }, [token]);

  const delAnswer = async (e: MouseEvent) => {
    e.preventDefault();

    await BoardService.delAnswer(Number(viewId), Number(e.currentTarget.getAttribute("editid")), token);
    setShow(false);
    setACount(answers.length - 1);
  };

  return (
    <>
      <h3 className="p-3 pb-0 mb-0">답변내용</h3>
      {answers.length
        ? answers.map((el: answerForm, i: number) => {
            const id: string = el.id + "";

            return (
              <div key={i} className="mt-3">
                <p className="p-2 m-1 mb-0">
                  <Moment date={el.createdDate} format="YYYY.MM.DD" />
                </p>
                <div className="p-3 m-2 mt-0 bg-dark rounded" onMouseEnter={() => setBtnShow(true)} onMouseLeave={() => setBtnShow(false)}>
                  <div className={"btn-group float-end " + (btnShow && auth.includes("ADMIN") ? "" : "d-none")} role="group">
                    <button type="button" className="btn btn-outline-info" id={id} onClick={(e) => navigate(`/editAnswer/${e.currentTarget.id}`, {state: viewId})}>
                      수정
                    </button>
                    <button type="button" className="btn btn-outline-danger" onClick={() => setShow(true)}>
                      삭제
                    </button>
                  </div>
                  <div>
                    {el.contents.split("\n").map((line: string, i: number) => (
                      <span key={i}>
                        {line} <br />
                      </span>
                    ))}
                  </div>
                </div>

                <ModalConfirm id={id} show={show} message={"해당 답변을 삭제하시겠습니까?"} clickFunc={delAnswer} cancleFunc={() => setShow(false)} />
              </div>
            );
          })
        : []}
    </>
  );
}

export default Answer;
