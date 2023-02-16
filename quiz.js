const selectedAnswer = document.querySelectorAll('.option-list .option-item');
const button = document.getElementById('btn-next');

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
    answers: ['Beyaz', 'Mavi', 'Sarı', 'Kırmızı'],
    correctAnswer: 'Beyaz',
  },
];

/*
  ATAMALAR
*/

let question = document.querySelector('.question-area .question');
let answers = document.querySelectorAll('.option-item .option');

// Soru getiriyor
question.innerText = questionList[0].question;

// Cevapları getiriyor
answers[0].innerText = questionList[0].answers[0];
answers[1].innerText = questionList[0].answers[1];
answers[2].innerText = questionList[0].answers[2];
answers[3].innerText = questionList[0].answers[3];

/*
  EVENTLER
*/

// CEVAP SEÇİLDİKTEN SONRAKİ EVENTLER

selectedAnswer.forEach((select) => {
  select.addEventListener('click', (e) => {
    // En yakın belirtilen elemanı seçiyor
    let selectedOptionTitle = e.target.closest('li');
    let selectedOption = e.target.closest('li');
    // Stil atamalarını css yazımıyla yazmak için

    // Seçim sonrası tüm seçeneklerin disabled olması
    for (let i = 0; i < selectedAnswer.length; i++) {
      selectedAnswer[i].style.cssText = `
        pointer-events: none;
        background-color: hsl(0, 0%, 50%);
      `;
    }

    // Seçilen cevabın değişimi
    selectedOption.style.cssText = `
      background-color: hsl(0, 0%, 12%);
      color: hsl(0, 0%, 95%);
    `;

    console.log(
      `Selected title: ${selectedOptionTitle.children[0].innerText} option: ${selectedOption.children[1].innerText}`
    );
    button.removeAttribute('disabled');
  });
});

// NEXT'E BASILDIKTAN SONRA OLAN EVENTLER
