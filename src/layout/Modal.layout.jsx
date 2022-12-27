import {Modal} from "react-bootstrap";

export function ModalView(props) {
  return (
    <Modal show={props.show} animation={false}>
      <Modal.Body className="text-center">{props.message}</Modal.Body>
      <Modal.Footer>
        <button className={"btn " + props.btnColor} onClick={props.clickFunc}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export function ModalConfirm(props) {
  return (
    <Modal show={props.show} animation={false}>
      <Modal.Body className="text-center">{props.message}</Modal.Body>
      <Modal.Footer>
        <button className="btn btn-info" editid={props.id} onClick={props.okFunc}>
          확인
        </button>
        <button className="btn btn-danger" onClick={props.cancleFunc}>
          취소
        </button>
      </Modal.Footer>
    </Modal>
  );
}
