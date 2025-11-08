const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");

let currentLevel = "easy";
let currentIndex = 0;
let score = 0;
let questions = [];

const quizData = {
  easy: [
    { q: "Which tribe is famous for the red Shuka attire?", a: "Maasai", o: ["Luo", "Kikuyu", "Maasai", "Kalenjin"] },
    { q: "What is Kenya’s national language?", a: "Swahili", o: ["English", "Swahili", "French", "Kikuyu"] },
    { q: "Where do the Turkana people mainly live?", a: "Northern Kenya", o: ["Coastal region", "Central Kenya", "Northern Kenya", "Western Kenya"] },
  ],
  normal: [
    { q: "Which tribe practices bullfighting as part of their culture?", a: "Luhya", o: ["Luo", "Luhya", "Kamba", "Taita"] },
    { q: "What traditional drink is made from fermented milk by the Maasai?", a: "Mursik", o: ["Mursik", "Uji", "Busaa", "Mnazi"] },
    { q: "What dance is common among the Luo people?", a: "Ohangla", o: ["Isukuti", "Ohangla", "Taarab", "Giriama dance"] },
  ],
  hard: [
    { q: "Which tribe is known for intricate beadwork symbolizing social status?", a: "Samburu", o: ["Pokot", "Samburu", "Turkana", "Meru"] },
    { q: "What instrument do the Pokomo people traditionally use in ceremonies?", a: "Drums", o: ["Flute", "Drums", "Harp", "Rattle"] },
    { q: "Which tribe’s initiation involves tooth removal as a rite of passage?", a: "Nandi", o: ["Meru", "Nandi", "Taita", "Turkana"] },
  ],
};

// Start Quiz
document.querySelectorAll("[data-level]").forEach(btn => {
  btn.addEventListener("click", () => {
    currentLevel = btn.dataset.level;
    startQuiz();
  });
});

function startQuiz() {
  startScreen.style.display = "none";
  quizScreen.style.display = "block";
  questions = [...quizData[currentLevel]];
  currentIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const q = questions[currentIndex];
  questionEl.textContent = q.q;
  optionsEl.innerHTML = "";
  q.o.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectAnswer(btn, q.a);
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(btn, correct) {
  const all = optionsEl.querySelectorAll("button");
  all.forEach(b => b.disabled = true);
  if (btn.textContent === correct) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
  }
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
});

function endQuiz() {
  quizScreen.style.display = "none";
  resultScreen.style.display = "block";
  scoreEl.textContent = `${score} / ${questions.length}`;
}

document.getElementById("restart-btn").addEventListener("click", () => {
  resultScreen.style.display = "none";
  startScreen.style.display = "block";
});
function loadQuestion() {
  const box = document.getElementById('quiz-box');
  const finish = document.getElementById('quiz-finish');
  if (currentIndex >= currentQuestions.length) {
    document.getElementById('result').textContent = `🎉 You scored ${score}/${currentQuestions.length}`;
    box.innerHTML = "";
    finish.style.display = "block"; // show back home button at the end
    return;
  }
  finish.style.display = "none"; // hide back button while playing
  const q = currentQuestions[currentIndex];
  box.innerHTML = `
    <div class="question-box">
      <div class="question">${q.q}</div>
      <div class="options">
        ${q.options.map(opt => `<button onclick="selectAnswer('${opt}')">${opt}</button>`).join('')}
      </div>
    </div>
  `;
}
document.getElementById("back-btn").addEventListener("click", () => history.back());
