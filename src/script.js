const choosingHallOne = document.querySelector('.choosing-hall-one');
const choosingHallTwo = document.querySelector('.choosing-hall-two');
const choiceOneHall = document.querySelector('.choice-one-hall');
const choiceTwoHall = document.querySelector('.choice-two-hall');
const createHallBtn = document.querySelector('.create-hall-button');
const priceOneHall = document.querySelector('.price-one-hall');
const priceTwoHall = document.querySelector('.price-two-hall');
const basketButtonOne = document.querySelectorAll('.basket-button-one');
const basketButtonTwo = document.querySelectorAll('.basket-button-two');
const salesOneHall = document.querySelector('.open-sales-one-hall');
const salesTwoHall = document.querySelector('.open-sales-two-hall');

  // При нажатии кнопки, меняем состояние элементов
  let clickCount = 0;

  createHallBtn.addEventListener('click', function() {
    if (clickCount === 0) {
      choosingHallOne.style.display = 'flex';
      choiceOneHall.style.display = 'flex';
      priceOneHall.style.display = 'flex';
      salesOneHall.style.display = 'flex';
    } else if (clickCount === 1) {
      choosingHallTwo.style.display = 'flex';
      choiceTwoHall.style.display = 'flex';
      priceTwoHall.style.display = 'flex';
      salesTwoHall.style.display = 'flex';
      createHallBtn.disabled = true; // Отключаем кнопку после третьего нажатия
    }
  
    clickCount++;

// Добавляем обработчик события для кнопок "basket-button-one"
basketButtonOne.forEach(function(buttonOne) {
  buttonOne.addEventListener('click', function() {
    // При нажатии кнопки, меняем состояние элементов
    choosingHallOne.style.display = 'none';
    choiceOneHall.style.display = 'none';
    priceOneHall.style.display = 'none';
  });
});

basketButtonTwo.forEach(function(buttonTwo) {
  buttonTwo.addEventListener('click', function() {
    // При нажатии кнопки, меняем состояние элементов
    choosingHallTwo.style.display = 'none';
    choiceTwoHall.style.display = 'none';
    priceTwoHall.style.display = 'none';
  });
});
  });
function showNextElement() {
  
  // Показываем текущий элемент
  if (currentElementIndex < elements.length) {
      elements[currentElementIndex].style.display = 'inline-block';
      currentElementIndex++;
  }
}
 

