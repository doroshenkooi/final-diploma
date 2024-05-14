const basketBtnOne = document.querySelector('.basket-button-one');
basketBtnOne.addEventListener('click', function() {
  // Действия при нажатии на кнопку
  console.log('Кнопка "зал 1" нажата');
});




// Получаем все необходимые элементы
const choosingHallOne = document.querySelector('.choosing-hall-one');
const choosingHallTwo = document.querySelector('.choosing-hall-two');
const choiceOneHall = document.querySelector('.choice-one-hall');
const choiceTwoHall = document.querySelector('.choice-two-hall');
const createHallButton = document.querySelector('.create-hall-button');
const basketButtonOne = document.querySelectorAll('.basket-button-one');
const basketButtonTwo = document.querySelectorAll('.basket-button-two');


  // При нажатии кнопки, меняем состояние элементов
  let clickCount = 0;

  createHallButton.addEventListener('click', function() {
    if (clickCount === 0) {
      choosingHallOne.style.display = 'flex';
      choiceOneHall.style.display = 'flex';
    } else if (clickCount === 1) {
      choosingHallTwo.style.display = 'flex';
      choiceTwoHall.style.display = 'flex';
      createHallButton.disabled = true; // Отключаем кнопку после третьего нажатия
    }
  
    clickCount++;

// Добавляем обработчик события для кнопок "basket-button-one"
basketButtonOne.forEach(function(buttonOne) {
  buttonOne.addEventListener('click', function() {
    // При нажатии кнопки, меняем состояние элементов
    choosingHallOne.style.display = 'none';
    choiceOneHall.style.display = 'none';
  });
});

basketButtonTwo.forEach(function(buttonTwo) {
  buttonTwo.addEventListener('click', function() {
    // При нажатии кнопки, меняем состояние элементов
    choosingHallTwo.style.display = 'none';
    choiceTwoHall.style.display = 'none';
  });
});

function showNextElement() {
  
  // Показываем текущий элемент
  if (currentElementIndex < elements.length) {
      elements[currentElementIndex].style.display = 'inline-block';
      currentElementIndex++;
  }
}
})

