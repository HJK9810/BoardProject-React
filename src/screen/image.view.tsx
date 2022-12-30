import {useEffect, useState} from "react";
import BoardService from "../service/BoardService";

type props = {
  image: any;
  check: boolean;
  setImage: any;
};

function ImageView({image, check, setImage}: props) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [clickURL, setClickURL] = useState("");
  const [id, setId] = useState(0);

  const widthSize = 200 + "px";

  useEffect(() => {}, [image]);

  const showImage = (root: string, idx: number) => {
    const lastIndex: number = root.lastIndexOf(")");
    const url: string = BoardService.fullFileURL(root.substring(lastIndex + 1));
    const fileName: string = root.substring(1, lastIndex);

    return <img id={`${idx}`} alt={fileName} key={idx} src={url} className="m-1" width={widthSize} onClick={check ? handleShow : () => {}} />;
  };

  const handleShow = (e: any) => {
    setShow(true);
    setName(e.target.alt);
    setId(e.target.id);
    setClickURL(e.target.src);
  };

  const delImage = (e: any) => {
    e.preventDefault();

    image.splice(id, 1);
    setImage(image);
    setShow(false);
  };

  return (
    <>
      <div className="p-3 m-2 bg-dark scroll-image rounded" style={{height: image.length > 0 ? widthSize : 40 + "px"}}>
        {image ? image.map((el: string, i: number) => (el ? showImage(el, i) : null)) : null}
      </div>

      <div className={"modal-backdrop show" + (show ? "" : " d-none")}></div>
      <div role="dialog" aria-modal={show} className="modal show" tabIndex={-1} style={{display: show ? "block" : "none"}}>
        <div className="modal-dialog modal-content">
          <div className="text-center modal-body">
            아래 이미지 <span className="text-warning">" {name} "</span>를 삭제하시겠습니까?
            <br /> 한번 삭제한 이미지는 저장시 되돌릴수 없습니다.
            <img alt="name" src={clickURL} width={widthSize} className="m-3 img-thumbnail" />
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={delImage}>
              Delete
            </button>
            <button className="btn btn-info" onClick={() => setShow(false)}>
              Cancle
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageView;
