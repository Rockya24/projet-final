const questions = [
  {
    question: "Quel est le plus grand océan du monde ?",
    answers: ["Atlantique", "Indien", "Arctique", "Pacifique"],
    correct: 3
  },
  {
    question: "Combien font 7 × 8 ?",
    answers: ["54", "56", "64", "58"],
    correct: 1
  },
  {
    question: "Quel est le synonyme du mot 'joyeux' ?",
    answers: ["Triste", "Heureux", "Fâché", "Méchant"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;

  const buttons = document.querySelectorAll(".answer-button");
  buttons.forEach((btn, index) => {
    btn.innerText = q.answers[index];
    btn.style.backgroundColor = ""; // reset color
    btn.disabled = false;
  });

  document.getElementById("next-button").style.display = "none";
}

function selectAnswer(index) {
  const isCorrect = index === questions[currentQuestion].correct;
  const buttons = document.querySelectorAll(".answer-button");

  if (isCorrect) {
    score++;
    buttons[index].style.backgroundColor = "green";
  } else {
    buttons[index].style.backgroundColor = "red";
    buttons[questions[currentQuestion].correct].style.backgroundColor = "green";
  }

  buttons.forEach(btn => btn.disabled = true);
  document.getElementById("next-button").style.display = "inline-block";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";
  document.getElementById("scoreText").innerText = `Tu as obtenu ${score} sur ${questions.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("result").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  loadQuestion();
}

window.onload = loadQuestion;
document.getElementById("next-button").addEventListener("click", nextQuestion);
document.querySelectorAll(".answer-button").forEach((button, index) => {
  button.addEventListener("click", () => selectAnswer(index));
});