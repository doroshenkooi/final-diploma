const basketBtnOne = document.querySelector('.basket-button-one');
basketBtnOne.addEventListener('click', function() {
  // Действия при нажатии на кнопку
  console.log('Кнопка "зал 1" нажата');
});

const basketBtnTwo = document.querySelector('.basket-button-two');
basketBtnTwo.addEventListener('click', function() {
  // Действия при нажатии на кнопку
  console.log('Кнопка "зал 2" нажата');
});

/*function addParagraph() {
  // Создаем элемент <p>
  const choosingHall = document.querySelector(".choosing-hall-two");
  // Устанавливаем текстовое содержимое
  choosingHall.innerHTML = ".choosing-hall"
  
  // Находим элемент, куда будем добавлять новый параграф
  const container = document.querySelector(".choosing-list-managament");
  // Добавляем созданный элемент на страницу
  container.appendChild(choosingHall);
}*/
function addNextHall() {
  let newHall = document.createElement('div');
  newHall.className = 'choosing-hall-one';

  let dash = document.createElement('div');
  dash.className = 'dash-one';
  let dashText = document.createTextNode('-');
  dash.appendChild(dashText);

  let hallText = document.createElement('div');
  hallText.className = 'choosing-hall-text'
  let hallName = document.createTextNode('новый зал'); // change to desired hall name
  hallText.appendChild(hallName);

  let basketButton = document.createElement('button');
  basketButton.className = 'basket-button-one';
  let img = document.createElement('img');
  img.src = 'image\\image.png\\popcorn.png'; // change to desired image path
  img.alt = 'popcorn basket button';
  basketButton.appendChild(img);

  newHall.appendChild(dash);
  newHall.appendChild(hallText);
  newHall.appendChild(basketButton);

  let management = document.querySelector('.choosing-list-managament');
  management.appendChild(newHall);
}

const createHallBtn = document.querySelector('.create-hall-button');
createHallBtn.addEventListener('click', function() {
  // Действия при нажатии на кнопку
  console.log('Кнопка "создать зал" нажата');
});
