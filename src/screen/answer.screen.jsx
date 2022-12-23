import Moment from "react-moment";

function Answer(props) {
  const {answers} = props;

  return (
    <>
      <h5 className="p-3 pb-0 mb-0">답변내용</h5>
      {answers
        ? answers.map((el, i) => {
            return (
              <div key={i} className="mt-3">
                <p className="p-2 m-1 mb-0">
                  <Moment date={el.createdDate} format="YYYY.MM.DD" />
                </p>
                <div className="p-3 m-2 mt-0 bg-dark rounded">{el.contents}</div>
              </div>
            );
          })
        : []}
    </>
  );
}

export default Answer;
