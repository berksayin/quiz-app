/* 
    YAPILMASI GEREKENLER
     1. SORU AŞAMALARI YAZACAK
     2. SORULAR VE ŞIKLAR DÖNGÜ VEYA FONKSİYONLA GELMELİ
     3. NEXT'E BASILDIĞINDA SIRADAKİ SORU GELECEK
     4. SONUNDA SONUÇ GÖSTERİLECEK VE TEKRAR BAŞLA BUTONU OLACAK
*/

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
    question: 'Atatürk kaç yılında doğmuştur?',
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
};

// LOCAL STORAGE
localStorage.setItem(
  'QUIZ_APP_STATE',
  JSON.stringify({
    score: 10,
  })
);

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
let questionArea = document.querySelector('.question-area');
let progress = document.querySelector('.step');
const options = document.getElementById('option-list');

let scoreSecret = 0; // Bu sayede skora dışarıdan erişim engelleniyor.

const ANSWER_COUNT_BY_QUESTION = 4;
// Tüm elementleri seçer
const allElements = document.querySelectorAll('*');

// Sayaç
let counter = 0;

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
};

const questionTotal = Object.keys(questionObject).length;

const renderQuestion = () => {
  if (counter >= questionTotal) return console.log('Sorular bitti.');

  // Kademeleri gösteriyor.
  progress.innerText = counter + 1 + '/' + questionTotal;

  let titles = Object.keys(questionObject[counter].answers);
  let answers = Object.values(questionObject[counter].answers);
  // DÖNGÜYLE GELMESİ GEREKİYOR, YENİ ŞIK EKLENEBİLİR

  const question = document.createElement('p');
  question.classList.add('question');

  // Soru getiriyor
  question.innerText = questionObject[counter].question;
  // Soruyu ekliyor
  questionArea.appendChild(question);

  // Doğru cevabı alıyor
  currentCorrectAnswer = questionObject[counter].correctAnswer;

  // Cevapları getiriyor
  // * BU KISIM createElement İLE DÜZENLENDİ
  for (let i = 0; i < titles.length; i++) {
    // // optionTitles[i].innerText = titles[i];
    // // optionAnswers[i].innerText = answers[i];
    // options.innerHTML += `
    //   <li class="option-item">
    //           <span class="option-title">${titles[i]}</span>
    //           <span class="option">${answers[i]}</span>
    //         </li>
    // `;

    const optionItem = document.createElement('li');
    const optionTitle = document.createElement('span');
    const option = document.createElement('span');

    optionItem.classList.add('option-item');
    optionTitle.classList.add('option-title');
    option.classList.add('option');
    optionTitle.innerText = titles[i];
    option.innerText = answers[i];

    options.appendChild(optionItem);
    optionItem.appendChild(optionTitle);
    optionItem.appendChild(option);
  }

  grabber();
  selectAnswer();
  counter++;
};

const selectAnswer = () => {
  selectedAnswer_li.forEach((select) => {
    select.addEventListener('click', (e) => {
      evaluateAnswers(e.target.closest('li'));
      button.disabled = false;
    });
  });
};

const evaluateAnswers = (selectedOption) => {
  console.log('selectedOption :>> ', selectedOption);
  for (let correctOption of selectedAnswer_li) {
    correctOption.classList.add('disabled');
    if (correctOption.firstChild.innerText == currentCorrectAnswer) {
      correctOption.classList.add('correct');
    }
  }
  if (selectedOption.firstChild.innerText != currentCorrectAnswer) {
    selectedOption.classList.add('wrong');
  }
};

// TODO: BURADAN AŞAĞISI GÜNCELLENECEK

const setUserScore = (currentOption) => {
  if (currentOption.children[1].innerText == currentCorrectAnswer) {
    // DOĞRU ŞIK İŞARETLENMESİ DURUMU
    scoreSecret += 10;
    console.log('Scored: +10');
    score.innerText = scoreSecret;
    console.log('Doğru cevap');
  } else {
    console.log('Yanlış cevap');
    currentOption.classList.add('wrong');
  }
  console.log('Current Score:', score.innerText);
};

// NEXT'E BASILDIKTAN SONRA OLAN EVENTLER
button.addEventListener('click', (e) => {
  console.log('button', button);
  button.toggleAttribute('disabled');
  if (!button.classList.contains('show-summary')) {
    if (c != questionList.length) {
      getQuestion();
    }
  } else {
    alert(`Quiz Bitti:
    🏆 Skor: ${scoreSecret}
    `);
    window.location.reload();
  }
});
