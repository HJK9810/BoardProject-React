export const Headlines = {
  addAnswer: "답변하기",
  editAnswer: "답변수정하기",

  expire: "Login Please",
  login: "Login",
  logout: "Logout",

  add: "문의하기",
  edit: "문의사항 수정",
  board: "문의사항",
  view: (date: string) => "문의내역 조회 - " + dateFormat(date),
};

const dateFormat = (inputDate: string): string => {
  const date = new Date(inputDate);
  return `${date.getFullYear()}.${(date.getMonth() + 1 + "").padStart(2, "0")}.${(date.getDate() + "").padStart(2, "0")}`;
};
