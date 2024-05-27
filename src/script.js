// авторризация
const form = document.querySelector('.authorization');
  const email = document.querySelector('.authorization-input-email').value; // Получаем значение поля email
  const password = document.querySelector('.authorization-input-password').value; // Получаем значение поля password

  function sendData(e) {
    e.preventDefault(); 
    fetch('https://shfe-diplom.neto-server.ru/login', {
      method: "POST",
      body: form
    })
     
    .then(response => response.json()) 
      .then(data => {
       
          if (data.success) {
          localStorage.setItem("user", data.user);
        } else {
          alert("Неверный логин/пароль");
        }
      })
      
      .catch(error => {
        console.error(error);
        alert("Ошибка сервера");
      });
  }
   
  document.getElementById("btn-autoriz").addEventListener("click", sendData);
      
  //создание зала
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
const createHall = async () => {
  try {
    const response = await fetch('https://shfe-diplom.neto-server.ru/hall', {
      method: 'POST',
      body: JSON.stringify({
        hallName: 'New Hall',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) { 
      choosingHallOne.style.display = 'flex';
      choiceOneHall.style.display = 'flex';
      priceOneHall.style.display = 'flex';
      salesOneHall.style.display = 'flex';
      console.log('Hall created!');
    } else {
      console.error('Failed to create hall');
    }
  } catch (error) {
    console.error('Error:', error);
  }
  let clickCount = 0;

  createHallBtn.addEventListener('click', () => {
     if (clickCount === 0) {
      choosingHallTwo.style.display = 'flex';
      choiceTwoHall.style.display = 'flex';
      priceTwoHall.style.display = 'flex';
      salesTwoHall.style.display = 'flex';
      createHallBtn.disabled = true;
    }
  
    clickCount++;

  basketButtonOne.forEach((buttonOne) => {
  buttonOne.addEventListener('click', () => {
    choosingHallOne.style.display = 'none';
    choiceOneHall.style.display = 'none';
    priceOneHall.style.display = 'none';
  });
});

basketButtonTwo.forEach((buttonTwo) => {
  buttonTwo.addEventListener('click', () => {
    choosingHallTwo.style.display = 'none';
    choiceTwoHall.style.display = 'none';
    priceTwoHall.style.display = 'none';
  });
});
  });
  
  };
  createHallBtn.addEventListener('click', createHall);
//!!!!!!!!!!!!!!!!! конец создания залов

// Получаем элементы DOM
const pointRowInput = document.querySelector('.point-row-input-text');
const pointChairsInput = document.querySelector('.point-chairs-input-text');
const frameHallWrapper = document.querySelector('.frame_hall-wrapper');
const cancelHallButton = document.querySelector('.seat-selection-button');
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
  const rows = parseInt(pointRowInput.value);
  const chairsPerRow = parseInt(pointChairsInput.value);
  
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
}

function cancelHallButtonClick() {
  frameHallWrapper.innerHTML = '';
}


// Добавляем обработчики событий
const oneHallBtn = document.querySelector('.choice-one-hall');
oneHallBtn.addEventListener('click', choiceOneHallBtnClick);
 
cancelHallButton.addEventListener('click', cancelHallButtonClick);








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

