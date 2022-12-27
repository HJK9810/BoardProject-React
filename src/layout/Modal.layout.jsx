import {Modal} from "react-bootstrap";

function ModalView(props) {
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

export default ModalView;
