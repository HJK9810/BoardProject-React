import {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import BoardService from "../service/BoardService";

function ImageView(props) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState(0);

  const image = props.image;
  const widthSize = 200 + "px";

  useEffect(() => {}, [image]);

  const showImage = (root, idx) => {
    const lastIndex = root.lastIndexOf(")");
    const url = BoardService.fullFileURL(root.substring(lastIndex + 1));
    const fileName = root.substring(1, lastIndex);

    return <img id={idx} name={fileName} alt={fileName} key={idx} src={url} className="m-1" width={widthSize} onClick={props.check ? handleShow : () => {}} />;
  };

  const handleShow = (e) => {
    setShow(true);
    setName(e.target.name);
    setId(e.target.id);
  };

  const delImage = (e) => {
    e.preventDefault();

    image.splice(id, 1);
    props.setImage(image);
    setShow(false);
  };

  return (
    <>
      <div className="p-3 m-2 bg-dark scroll-image" style={{height: image.length !== 0 ? widthSize : 40 + "px"}}>
        {image ? image.map((el, i) => (el ? showImage(el, i) : null)) : null}
      </div>

      <Modal show={show} onHide={() => setShow(false)} animation={false}>
        <Modal.Body>
          해당 이미지 <span className="text-warning">" {name} "</span>를 삭제하시겠습니까?
          <br /> 한번 삭제한 이미지는 저장시 되돌릴수 없습니다.
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={delImage}>
            Delete
          </button>
          <button className="btn btn-info" onClick={() => setShow(false)}>
            Cancle
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ImageView;
