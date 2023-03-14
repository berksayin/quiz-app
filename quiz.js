/*
  SORULAR
*/

// const questionList = [
//   {
//     question: 'Atatürk kaç yılında doğmuştur?',
//     answers: ['1881', '1882', '1883', '1884'],
//     correctAnswer: '1881',
//   },
//   {
//     question: 'Siyahın zıttı nedir?',
//     answers: ['Sarı', 'Mavi', 'Beyaz', 'Kırmızı'],
//     correctAnswer: 'Beyaz',
//   },
//   {
//     question:
//       "World Wide Web'in mucidi ve HTML işaretleme dilini geliştiren mucit kimdir?",
//     answers: ['Steve Jobs', 'Tim Berners Lee', 'Mark Zuckerberg', 'Bill Gates'],
//     correctAnswer: 'Tim Berners Lee',
//   },
//   {
//     question: "Steam'in kurucusu kimdir?",
//     answers: ['Elon Musk', 'Jack Dorsey', 'Tim Cook', 'Gabe Newell'],
//     correctAnswer: 'Gabe Newell',
//   },
//   {
//     question: "Aşağıdakilerden hangisi R&B'nin açılımıdır?",
//     answers: [
//       'Rhythm and Blues',
//       'Rhythm and Bandos',
//       'Rock and Blues',
//       'Rap and Blues',
//     ],
//     correctAnswer: 'Rhythm and Blues',
//   },
// ];

const questionObject = {
  0: {
    question: 'Atatürk hangi yılda doğmuştur?',
    answers: {
      A: '1881',
      B: '1882',
      C: '1883',
      D: '1884',
    },
    correctAnswer: 'A',
  },
  1: {
    question: 'Siyahın zıttı nedir?',
    answers: {
      A: 'Sarı',
      B: 'Mavi',
      C: 'Beyaz',
      D: 'Kırmızı',
    },
    correctAnswer: 'C',
  },
  2: {
    question: "World Wide Web'in mucidi ve HTML işaretleme dilini geliştiren mucit kimdir?",
    answers: {
      A: 'Steve Jobs',
      B: 'Tim Berners Lee',
      C: 'Mark Zuckerberg',
      D: 'Bill Gates',
    },
    correctAnswer: 'B',
  },
  3: {
    question: "Steam'in kurucusu kimdir?",
    answers: {
      A: 'Elon Musk',
      B: 'Jack Dorsey',
      C: 'Tim Cook',
      D: 'Gabe Newell',
    },
    correctAnswer: 'D',
  },
};

// TODO: HER SORU SONRASI LOCAL STORAGE'YE KAYIT EDİLECEK, ÇIK GİR YAPILDIĞINDA AYNI SORUDAN DEVAM EDECEK
// TODO: SINAV SONUNDA LOCAL'DE TUTULAN YANITLAR VE PUAN GELECEK

// TODO: Bu global değişkenler uygulama açıldığında localdeki karşılıklara eşitlenmeli.
let currentQuestion,
  finalAnswers = [],
  correctAnswers = [],
  currentScore;

const getFromLocalStorage = () => {
  const arr = JSON.parse(localStorage.getItem('Progress'));
  console.log(arr);
  if (arr !== null) {
    currentQuestion = arr.currentQuestion;
    finalAnswers = arr.finalAnswers;
    correctAnswers = arr.correctAnswers;
    currentScore = arr.currentScore;
  } else {
    currentQuestion = 0;
    currentScore = 0;
  }
};

const setToLocalStorage = () => {
  currentQuestion, finalAnswers, correctAnswers, currentScore;
  localStorage.setItem(
    'Progress',
    JSON.stringify({
      currentQuestion: currentQuestion,
      finalAnswers: finalAnswers,
      correctAnswers: correctAnswers,
      currentScore: currentScore,
    })
  );
};

/*
  ATAMALAR
*/
let selectedAnswer_li, optionTitles, optionAnswers;

const grabber = () => {
  // Bu atama yükleme yapıldıktan sonra yapılırsa sistem çalışır.
  selectedAnswer_li = document.querySelectorAll('.option-list .option-item');
  optionTitles = document.querySelectorAll('.option-item .option-title');
  optionAnswers = document.querySelectorAll('.option-item .option');
};

const button = document.getElementById('btn-next');
let score = document.querySelector('.score');
let step = document.querySelector('.step');
let questionArea = document.getElementById('question-area');
let progress = document.querySelector('.step');
const options = document.getElementById('option-list');

// let scoreSecret = 0; // Bu sayede skora dışarıdan erişim engelleniyor.

const ANSWER_COUNT_BY_QUESTION = 4;
// Tüm elementleri seçer
const allElements = document.querySelectorAll('*');

// Güncel doğru cevap
var currentCorrectAnswer = '';

// Soruları getiren fonksiyon
window.onload = getQuestion = () => {
  clearQuiz();
  renderQuestion();
};

// Temizleyici
const clearQuiz = () => {
  allElements.forEach((element) => {
    element.classList.remove('wrong', 'correct', 'disabled');
  });
  questionArea.innerHTML = '';
  options.innerHTML = '';
};

const questionTotal = Object.keys(questionObject).length;

const renderQuestion = () => {
  getFromLocalStorage();
  score.innerText = currentScore;

  // Kademeleri gösteriyor.
  progress.innerText = currentQuestion + 1 + '/' + questionTotal;

  let titles = Object.keys(questionObject[currentQuestion].answers);
  let answers = Object.values(questionObject[currentQuestion].answers);
  // DÖNGÜYLE GELMESİ GEREKİYOR, YENİ ŞIK EKLENEBİLİR

  const question = document.createElement('p');
  question.classList.add('question');

  // Soru getiriyor
  question.innerText = questionObject[currentQuestion].question;
  // Soruyu ekliyor
  questionArea.appendChild(question);

  // Doğru cevabı alıyor
  currentCorrectAnswer = questionObject[currentQuestion].correctAnswer;

  // Doğru cevapları bir dizide toplar.
  correctAnswers.push(currentCorrectAnswer);

  // Cevapları getiriyor
  // * BU KISIM createElement İLE DÜZENLENDİ
  for (let i = 0; i < titles.length; i++) {
    const optionItem = document.createElement('li');
    const optionTitle = document.createElement('span');
    const option = document.createElement('span');

    optionItem.classList.add('option-item');
    optionTitle.classList.add('option-title');
    option.classList.add('option');
    optionTitle.innerText = titles[i];
    option.innerText = answers[i];

    options.append(optionItem);
    optionItem.append(optionTitle);
    optionItem.append(option);
  }

  grabber();
  selectAnswer();
  currentQuestion++;
  beforeSummary();
};

const beforeSummary = () => {
  if (currentQuestion == questionTotal) {
    console.log('SON SORU');
    button.innerText = 'Summary';
  }
};

const selectAnswer = () => {
  selectedAnswer_li.forEach((select) => {
    select.addEventListener('click', (e) => {
      evaluateAnswers(e.target.closest('li'));
      setUserScore(e.target.closest('li'));
      button.disabled = false;

      setToLocalStorage();
    });
  });
};

const evaluateAnswers = (selectedOption) => {
  // console.log('selectedOption :>> ', selectedOption);
  for (let correctOption of selectedAnswer_li) {
    correctOption.classList.add('disabled');
    if (correctOption.firstChild.innerText == currentCorrectAnswer) {
      correctOption.classList.add('correct');
    }
  }
  if (selectedOption.firstChild.innerText != currentCorrectAnswer) {
    selectedOption.classList.add('wrong');
  }
  finalAnswers.push(selectedOption.firstChild.innerText);
};

const setUserScore = (currentOption) => {
  if (currentOption.children[0].innerText == currentCorrectAnswer) {
    // DOĞRU ŞIK İŞARETLENMESİ DURUMU
    currentScore += 10;
    score.innerText = currentScore;
    console.log('Doğru cevap');
  } else {
    console.log('Yanlış cevap');
  }
  console.log('Current Score:', score.innerText);
};

// TODO: BURADAN AŞAĞISI GÜNCELLENECEK

// NEXT'E BASILDIKTAN SONRA OLAN EVENTLER

const getNextQuestion = () => {
  if (currentQuestion != questionTotal) {
    getQuestion();
  } else {
    showSummary();
    window.location.reload();
  }
};

const showSummary = () => {
  alert(`Quiz Bitti:
    🏆 Skor: ${currentScore}
    📗 Cevap Anahtarı: ${correctAnswers}
    📘 Verilen Cevaplar: ${finalAnswers}
    `);
  localStorage.removeItem('Progress');
};

button.addEventListener('click', (e) => {
  getNextQuestion();
  button.toggleAttribute('disabled');
});
