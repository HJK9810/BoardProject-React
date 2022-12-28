export function ModalView(props) {
  return (
    <>
      <div className="modal-backdrop show" style={{display: props.show ? "block" : "none"}}></div>
      <div role="dialog" aria-modal={props.show} className="modal show" tabIndex="-1" style={{display: props.show ? "block" : "none"}}>
        <div className="modal-dialog modal-content">
          <div className="text-center modal-body">{props.message}</div>
          <div className="modal-footer">
            <button className={"btn " + props.btnColor} onClick={props.clickFunc}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function ModalConfirm(props) {
  return (
    <>
      <div className="modal-backdrop show" style={{display: props.show ? "block" : "none"}}></div>
      <div role="dialog" aria-modal={props.show} className="modal show" tabIndex="-1" style={{display: props.show ? "block" : "none"}}>
        <div className="modal-dialog modal-content">
          <div className="text-center modal-body">
            {props.message.split("\n").map((line, i) => (
              <span key={i}>
                {line} <br />
              </span>
            ))}
          </div>
          <div className="modal-footer">
            <button className="btn btn-info" editid={props.id} onClick={props.okFunc}>
              확인
            </button>
            <button className="btn btn-danger" onClick={props.cancleFunc}>
              취소
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
