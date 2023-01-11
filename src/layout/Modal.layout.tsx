import React from "react";
import {modalProps} from "../service/Props";

export function ModalView({show, message, btnColor, clickFunc}: modalProps) {
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

export function ModalConfirm({show, message, cancleFunc, clickFunc, id}: modalProps) {
  return (
    <>
      <div className="modal-backdrop show" style={{display: show ? "block" : "none"}}></div>
      <div role="dialog" aria-modal={show} className="modal show" tabIndex={-1} style={{display: show ? "block" : "none"}}>
        <div className="modal-dialog modal-content">
          <div className="text-center modal-body">
            {message.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line} <br />
              </React.Fragment>
            ))}
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger m-2" onClick={cancleFunc}>
              취소
            </button>
            <button className="btn btn-ok m-2" id={id} onClick={clickFunc}>
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
