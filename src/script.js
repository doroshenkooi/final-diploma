const authorization = document.querySelector('.authorization');
const emailInput = document.querySelector('.authorization-input-email');
const passwordInput = document.querySelector('.authorization-input-password');
const form = document.querySelector('.authorization-form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); 
  
  const email = emailInput.value;
  const password = passwordInput.value;
  
  fetch('https://shfe-diplom.neto-server.ru/login', {
    method: 'POST',
    body: JSON.stringify({ login: email, password: password }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Ошибка авторизации');
    }
  })
  .then(result => {
    console.log(result);
    authorization.style.display = 'none';
   
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });
});

  //создание зала
  

  document.addEventListener("DOMContentLoaded", function addHall() {
    // Обработчик нажатия на кнопку "создать зал"
    const createHallButton =  document.getElementById("btn-create-hall");
    createHallButton.addEventListener("click", function() {
      // Получаем название нового кинозала
      const hallName = new FormData();
      const newName = prompt("Введите название нового кинозала:");
      hallName.set('hallName', `${(newName)}`)
        const newHall = document.createElement("div"); // Создаем новый элемент div
        newHall.className = "choosing-hall-one"; // Добавляем класс "choosing-hall-one"
        newHall.innerHTML = 
            `<div class="dash-one">
                <span>-</span>
            </div>
            <div class="choosing-hall-text">
                <span>${(newName)}</span>
            </div>
            <button class="basket-button" ng-click="deleteHall(event)">
            </button>;`
    
        const nav = document.querySelector(".choosing-list-managament"); // Находим элемент nav
        nav.appendChild(newHall); // Добавляем новый зал в nav

// Добавляем обработчик события при нажатии на кнопку
createHallButton.addEventListener("click", addHall);


newHall.querySelector(".basket-button").addEventListener("click", function(event) {
  deletehall(event);
});

function deletehall(event) {
  event.target.parentElement.remove();
}
      // Отправляем запрос на добавление нового кинозала
      fetch('https://shfe-diplom.neto-server.ru/hall', {
        method: 'POST',
        body: hallName
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        // Выводим список всех кинозалов
        console.log(data);
        newHall.style.display = 'flex';
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
      
    });
    
      fetch('https://shfe-diplom.neto-server.ru/hall', {
        method: 'DELETE',
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Выводим список всех кинозалов после удаления
        console.log(data);
      })
      .catch(function(error) {
        console.error('Ошибка:', error);
      });
    });

  
//!!!!!!!!!!!!!!!!! конец создания залов

// Получаем элементы DOM
const rowCount = document.querySelector('.point-row-input-text');
const placeCount = document.querySelector('.point-chairs-input-text');
const frameHallWrapper = document.querySelector('.frame_hall-wrapper');
const cancelHallButton = document.querySelector('.seat-selection-button');
const saveHallBtn = document.querySelector('.seat-selection-input');
// Обработчик события клика по месту в кинозале
function handleChairClick(event) {
  const chair = event.target;
  
  if (chair.classList.contains('blocked-chairs')) {
    chair.classList.remove('blocked-chairs');
    chair.classList.add('regular-chairs');
  } else if (chair.classList.contains('regular-chairs')) {
    chair.classList.remove('regular-chairs');
    chair.classList.add('vip-chairs');
  } else if (chair.classList.contains('vip-chairs')) {
    chair.classList.remove('vip-chairs');
    chair.classList.add('blocked-chairs');
  }
}

// Обработчик события клика по кнопке зал1
function choiceOneHallBtnClick() {
  const rows = parseInt(rowCount.value);
  const chairsPerRow = parseInt(placeCount.value);
  
  // Создаем двумерный массив для хранения мест
 const seats = [];

  for (let i = 0; i < rows; i++) {
    seats[i] = [];
    
    for (let j = 0; j < chairsPerRow; j++) {
      seats[i][j] = 'blocked-chairs';
    }
  }
  
  // Генерируем и добавляем новые места в зал
  for (let i = 0; i < rows; i++) {
    const row = document.createElement('div');
    row.classList.add('conf-step__row');
    
    for (let j = 0; j < chairsPerRow; j++) {
      const chair = document.createElement('div');
      chair.classList.add(seats[i][j]);
      chair.addEventListener('click', handleChairClick);
      
      const chairWrapper = document.createElement('div');
      chairWrapper.classList.add('conf-step__chair');
      chairWrapper.appendChild(chair);
      
      row.appendChild(chairWrapper);
    }
    
    frameHallWrapper.appendChild(row);
  }

  function updateHallConfiguration(hallid, rowcount, placecount, config) {
    const params = new FormData();
    params.set('rowcount', rowcount);
    params.set('placecount', placecount);
    params.set('config', JSON.stringify(config));
    params.set('price_standart', price_standart);
    params.set('price_vip', price_vip);

    
    
    fetch('https://shfe-diplom.neto-server.ru/hall/01', {
      method: 'post',
      body: params
    })
    .then(response => response.json())
    .then(data => console.log(data));
  }

  // Пример использования функции
  const arrayconfig = []; // Двумерный массив со схемой кинозала
  const hallid = '01';
  const rowcount = 10;
  const placecount = 10;
  const price_standart = 100;
  const price_vip = 350;
  
  updateHallConfiguration(hallid, rowcount, placecount, arrayconfig);
}

function cancelHallButtonClick() {
  frameHallWrapper.innerHTML = '';
}

// Добавляем обработчики событий
const oneHallBtn = document.querySelector('.choice-one-hall');
oneHallBtn.addEventListener('click', choiceOneHallBtnClick);
const twoHallBtn = document.querySelector('.choice-two-hall');
twoHallBtn.addEventListener('click', choiceOneHallBtnClick);
cancelHallButton.addEventListener('click', cancelHallButtonClick);
saveHallBtn.addEventListener('click', saveHallButtonClick);







// Получаем элементы списка фильмов
const movieList = document.querySelector('.movie-list');
const addMovieBtn = document.querySelector('.add-movie-btn');

// Функция для добавления фильма в список
function addMovie() {
  // Создаем элементы для нового фильма
  const newMovie = document.createElement('div');
  newMovie.className = 'movie-one';
  const moviePost = document.createElement('img');
  moviePost.className = 'movie-post';
  const movieContentText = document.createElement('div');
  movieContentText.className = 'movie-conteiner-text';
  const movieTitle = document.createElement('span');
  movieTitle.className = 'movie-text-top';
  const movieDuration = document.createElement('span');
  movieDuration.className = 'movie-text-button';
  const movieBtnContainer = document.createElement('div');
  movieBtnContainer.className = 'movie-conteiner-btn';
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'movie-btn-one';
  const deleteIcon = document.createElement('img');
  deleteIcon.className = 'imggg';

  // Настройка новых элементов
  deleteIcon.src = 'image/image.png/delete_icon.png';
  deleteIcon.alt = 'иконка удаления';
  deleteBtn.appendChild(deleteIcon);
  movieBtnContainer.appendChild(deleteBtn);
  movieContentText.appendChild(movieTitle);
  movieContentText.appendChild(movieDuration);
  newMovie.appendChild(moviePost);
  newMovie.appendChild(movieContentText);
  newMovie.appendChild(movieBtnContainer);

  // Добавляем новый фильм в список
  movieList.appendChild(newMovie);
}

// Функция для удаления фильма из списка
function deleteMovie(event) {
  const movieItem = event.target.closest('.movie-one');
  if (movieItem) {
    movieItem.remove();
  }
}

// Обработчик клика по кнопке "Добавить фильм"
addMovieBtn.addEventListener('click', addMovie);

// Обработчик клика по кнопке удаления фильма
movieList.addEventListener('click', deleteMovie);

// Получение необходимых элементов
const movieOneElements = Array.from(document.getElementsByClassName('movie-one'));
const movieHallOne = document.getElementsByClassName('movie-hall-add-one')[0];
const movieHallTwo = document.getElementsByClassName('movie-hall-add-two')[0];

// Обработчики событий для запуска перетаскивания фильмов
movieOneElements.forEach((movie) => {
    movie.addEventListener('dragstart', dragStart);
    movie.addEventListener('dragend', dragEnd);
});

// Обработчики событий для залов, в которые можно перетащить фильмы
movieHallOne.addEventListener('dragover', dragOver);
movieHallOne.addEventListener('dragenter', dragEnter);
movieHallOne.addEventListener('dragleave', dragLeave);
movieHallOne.addEventListener('drop', drop);

movieHallTwo.addEventListener('dragover', dragOver);
movieHallTwo.addEventListener('dragenter', dragEnter);
movieHallTwo.addEventListener('dragleave', dragLeave);
movieHallTwo.addEventListener('drop', drop);

// Функции для обработки событий перетаскивания
function dragStart() {
    this.classList.add('dragging');
}

function dragEnd() {
    this.classList.remove('dragging');
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add('hovered');
}

function dragLeave() {
    this.classList.remove('hovered');
}

function drop() {
    const droppedMovie = document.getElementsByClassName('dragging')[0];
    const movieCopy = droppedMovie.cloneNode(true);
    
    if (this.classList.contains('movie-hall-add-one')) {
        movieCopy.classList.remove('dragging');
        movieCopy.classList.remove('movie-one');
        movieCopy.classList.add('movie-one-hall-one');
        this.appendChild(movieCopy);
    } else if (this.classList.contains('movie-hall-add-two')) {
        movieCopy.classList.remove('dragging');
        movieCopy.classList.remove('movie-one');
        movieCopy.classList.add('movie-one-hall-two');
        this.appendChild(movieCopy);
    }
    
    droppedMovie.remove();
    this.classList.remove('hovered');
}

