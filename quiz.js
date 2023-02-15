const selectedAnswer = document.querySelectorAll('.option-list .option-item');
const button = document.getElementById('btn-next');

selectedAnswer.forEach((select) => {
  select.addEventListener('click', (e) => {
    // This takes the closest parent
    let selectedOptionTitle = e.target.closest('li').children[0].innerText;
    let selectedOption = e.target.closest('li').children[1].innerText;
    console.log(`Selected title: ${selectedOptionTitle} option: ${selectedOption}`);
  });
});

// SORULAR YAZILACAK VE KODA DEVAM EDİLECEK
//
