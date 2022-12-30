import React from "react";

type viewProps = {
  show: boolean;
  message: string;
  btnColor: string;
  clickFunc: any;
};

type confirmProps = {
  show: boolean;
  message: string;
  okFunc: any;
  cancleFunc: any;
  id: string;
};

export function ModalView({show, message, btnColor, clickFunc}: viewProps) {
  return (
    <>
      <div className="modal-backdrop show" style={{display: show ? "block" : "none"}}></div>
      <div role="dialog" aria-modal={show} className="modal show" tabIndex={-1} style={{display: show ? "block" : "none"}}>
        <div className="modal-dialog modal-content">
          <div className="text-center modal-body">{message}</div>
          <div className="modal-footer">
            <button className={"btn " + btnColor} onClick={clickFunc}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function ModalConfirm({show, message, cancleFunc, okFunc, id}: confirmProps) {
  return (
    <>
      <div className="modal-backdrop show" style={{display: show ? "block" : "none"}}></div>
      <div role="dialog" aria-modal={show} className="modal show" tabIndex={-1} style={{display: show ? "block" : "none"}}>
        <div className="modal-dialog modal-content">
          <div className="text-center modal-body">
            {message.split("\n").map((line, i) => (
              <span key={i}>
                {line} <br />
              </span>
            ))}
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={cancleFunc}>
              취소
            </button>
            <button className="btn btn-ok" id={id} onClick={okFunc}>
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
