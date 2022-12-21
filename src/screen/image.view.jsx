import {useEffect} from "react";
import BoardService from "../service/BoardService";

function ImageView(props) {
  const image = props.image;
  const widthSize = 200 + "px";

  useEffect(() => {}, [image]);

  const showImage = (root, idx) => {
    const lastIndex = root.lastIndexOf(")");

    return <img id={idx} name={root.substring(1, lastIndex)} key={idx} src={BoardService.fullFileURL(root.substring(lastIndex + 1))} className="m-1" width={widthSize} onClick={checkClick} />;
  };

  const checkClick = () => {
    return props.check ? delImage() : () => {};
  };

  const delImage = (e) => {
    e.preventDefault();

    if (window.confirm(`해당 이미지 '${e.target.name}'를 삭제하시겠습니까?\n 한번 삭제한 이미지는 저장시 되돌릴수 없습니다.`)) {
      image.splice(e.target.id, 1);
      props.setImage(image);

      alert("삭제되었습니다.");
    } else alert("취소되었습니다.");
  };

  return (
    <div className="p-3 m-2 bg-dark scroll-image" style={{height: image.length != 0 ? widthSize : 40 + "px"}}>
      {image ? image.map((el, i) => (el ? showImage(el, i) : null)) : null}
    </div>
  );
}

export default ImageView;
