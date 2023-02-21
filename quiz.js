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

const questionList = [
  {
    question: 'Atatürk kaç yılında doğmuştur?',
    answers: ['1881', '1882', '1883', '1884'],
    correctAnswer: '1881',
  },
  {
    question: 'Siyahın zıttı nedir?',
    answers: ['Sarı', 'Mavi', 'Beyaz', 'Kırmızı'],
    correctAnswer: 'Beyaz',
  },
  {
    question: "World Wide Web'in mucidi ve HTML işaretleme dilini geliştiren mucit kimdir?",
    answers: ['Steve Jobs', 'Tim Berners Lee', 'Mark Zuckerberg', 'Bill Gates'],
    correctAnswer: 'Tim Berners Lee',
  },
  {
    question: "Steam'in kurucusu kimdir?",
    answers: ['Elon Musk', 'Jack Dorsey', 'Tim Cook', 'Gabe Newell'],
    correctAnswer: 'Beyaz',
  },
  {
    question: "Aşağıdakilerden hangisi R&B'nin açılımıdır?",
    answers: ['Rhythm and Blues', 'Rhythm and Bandos', 'Rock and Blues', 'Rap and Blues'],
    correctAnswer: 'Rhythm and Blues',
  },
];

/*
  ATAMALAR
*/
const selectedAnswer_li = document.querySelectorAll('.option-list .option-item');

const button = document.getElementById('btn-next');
let score = document.querySelector('.score');
let step = document.querySelector('.step');
let question_p = document.querySelector('.question-area .question');
let answers = document.querySelectorAll('.option-item .option');
let progress = document.querySelector('.step');

let scoreSecret = 0; // Bu sayede skora dışarıdan erişim engelleniyor.

// Tüm elementleri seçer
const allElements = document.querySelectorAll('*');

// Temizleyici
const clearTheQuiz = () => {
  allElements.forEach((element) => {
    element.classList.remove('wrong', 'correct', 'disabled');
  });
};

// Sayaç
let c = 0;

// Güncel doğru cevap
var currentCorrectAnswer = '';

// Soruları getiren fonksiyon
window.onload = getQuestion = () => {
  clearTheQuiz();
  if (c < questionList.length) {
    // Kademeleri gösteriyor.
    progress.innerText = c + 1 + '/' + questionList.length;

    // Soru getiriyor
    question_p.innerText = questionList[c].question;

    // Cevapları getiriyor
    answers[0].innerText = questionList[c].answers[0];
    answers[1].innerText = questionList[c].answers[1];
    answers[2].innerText = questionList[c].answers[2];
    answers[3].innerText = questionList[c].answers[3];

    // Doğru cevabı değişkende saklar.
    currentCorrectAnswer = questionList[c].correctAnswer;

    c++;
  } else {
    console.log('Sorular bitti.');
  }
};

/*
  EVENTLER
*/

// CEVAP SEÇİLDİKTEN SONRAKİ EVENTLER

selectedAnswer_li.forEach((select) => {
  select.addEventListener('click', (e) => {
    // Seçim sonrası tüm seçeneklerin disabled olması
    for (let i = 0; i < selectedAnswer_li.length; i++) {
      selectedAnswer_li[i].classList.add('disabled');
    }

    // En yakın belirtilen elemanı seçiyor
    let selectedOptionTitle = e.target.closest('li');
    let selectedOption = e.target.closest('li');

    for (let correctOption of selectedAnswer_li) {
      if (correctOption.children[1].innerText == currentCorrectAnswer) {
        // Doğru şıkka 'correct' classı geliyor.
        correctOption.classList.add('correct');
      }
    }

    // DOĞRU ŞIKKI GÖSTERECEK YEŞİL ARKAPLAN IF DIŞINDA YAZILMALI
    // ÇÜNKÜ HER KOŞULDA DOĞRU ŞIK YEŞİLLE GÖSTERİLECEK!
    if (selectedOption.children[1].innerText == currentCorrectAnswer) {
      // DOĞRU ŞIK İŞARETLENMESİ DURUMU
      scoreSecret += 10;
      console.log('Scored: +10');
      score.innerText = scoreSecret;
      console.log('Doğru cevap');
    } else {
      console.log('Yanlış cevap');
      selectedOption.classList.add('wrong');
    }

    console.log('Current Score:', score.innerText);

    console.log(`Selected title: ${selectedOptionTitle.children[0].innerText} option: ${selectedOption.children[1].innerText}`);
    button.toggleAttribute('disabled');

    // Son soruysa butonu değiştir.
    if (c == questionList.length) {
      console.log('SONA GELDİK');
      button.classList.toggle('show-summary');
      button.innerText = 'Results';
    }
  });
});

// NEXT'E BASILDIKTAN SONRA OLAN EVENTLER
button.addEventListener('click', (e) => {
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
