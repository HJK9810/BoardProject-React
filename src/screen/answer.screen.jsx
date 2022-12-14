import Moment from "react-moment";

function Answer(props) {
  const {answers} = props;

  return (
    <>
      {answers
        ? answers.map((el, i) => {
            return (
              <div key={i} className="mt-3">
                <h4>답변내용</h4>
                <p>
                  <Moment date={el.createdDate} format="YYYY.MM.DD" />
                </p>
                <div>{el.contents}</div>
              </div>
            );
          })
        : []}
    </>
  );
}

export default Answer;
