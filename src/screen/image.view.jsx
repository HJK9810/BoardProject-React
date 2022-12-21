import {useEffect} from "react";
import BoardService from "../service/BoardService";

function ImageView(props) {
  const check = props.check;
  const image = props.image;

  useEffect(() => {}, [image]);

  const showImage = (root, idx) => {
    const lastIndex = root.lastIndexOf(")");

    return <img id={idx} name={root.substring(1, lastIndex)} key={idx} src={BoardService.fullFileURL(root.substring(lastIndex + 1))} width={300 + "px"} onClick={check ? delImage : () => {}} />;
  };

  const delImage = (e) => {
    e.preventDefault();

    const result = window.confirm(`해당 이미지 '${e.target.name}'를 삭제하시겠습니까?\n 한번 삭제한 이미지는 저장시 되돌릴수 없습니다.`);
    if (result) {
      const idx = e.target.id;
      image.splice(idx, 1);
      alert("삭제되었습니다.");
      props.setImage(image);
    } else alert("취소되었습니다.");
  };

  return (
    <div className="mt-1 scroll-image" style={{height: 200 + "px"}}>
      {image ? image.map((el, i) => (el ? showImage(el, i) : null)) : null}
    </div>
  );
}

export default ImageView;
