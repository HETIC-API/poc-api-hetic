import Question from "./Question";

const questionTest = {
  question: "lorem ipsum",
  answers: { a: "vgbhjn,kl", b: "nj,k" },
  response: "a", //object.key == object.value for ( in )
};

export default function form() {
  return (
    <div>
      <Question question={questionTest} />
      <Question question={questionTest} />
      <Question question={questionTest} />
      <Question question={questionTest} />
      <Question question={questionTest} />
    </div>
  );
}
