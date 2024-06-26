
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
    // "создать зал"
    const createHallButton =  document.getElementById("btn-create-hall");
    createHallButton.addEventListener("click", function() {
      // Получаем название нового кинозала
      
      const newName = prompt("Введите название нового кинозала:");
  
        const newHall = document.createElement("div"); 
        newHall.className = "choosing-hall-one"; 
        newHall.innerHTML = 
            ` <div class="choosing-hall-one" id="hall-btn-one">
          
            <div class="dash-one">
                <span>-</span>
            </div>
            <div class="choosing-hall-text">
                <span>${(newName)}</span>
            </div>
            <button class="basket-button">
            </button>
            </div>`

            const hallName = new FormData();
            hallName.set('hallName', `${(newName)}`)
            fetch('https://shfe-diplom.neto-server.ru/hall', {
              method: 'POST',
              body: hallName
            })
            .then(response => {
              return response.json();
            })
            .then(data => {
              let lastIndex = data.result.halls.length - 1;
              let IdHall = data.result.halls[lastIndex].id;
      
              console.log(IdHall);
              window.localStorage.setItem('IDHall', `${(IdHall)}`)
              console.log(data);
               
              })
            .catch(error => {
              console.error('Ошибка:', error);
            });
            
        
           
            const newHallnew = document.querySelector(".choosing-list-managament");
    newHallnew.appendChild(newHall); 
          // кнопка конфигурация зала
    const newHallBtn = document.createElement("div"); 
           newHallBtn.ById = "hall-btn"; 
           newHallBtn.innerHTML = 
           `<div><button class="choice-one-hall" type="button">
           <span class="hall-button-text">${(newName)}</span></button>
        </div>`
        const choiceOneHallBtn = newHallBtn.querySelector(".choice-one-hall"); 
        choiceOneHallBtn.addEventListener('click', choiceOneHallBtnClick);

        const btnConfig = document.querySelector('.choice-list');
           btnConfig.appendChild(newHallBtn);
           // кнопка стоимость билетов
           const newHallpriceBtn = document.createElement("div"); 
           newHallpriceBtn.className = "price-one-hall"; 
           newHallpriceBtn.innerHTML = 
           `<button class="price-one-hall" type="button">
            <span class="hall-button-text">${(newName)}</span></button>`
           

        const pricebtnConfig = document.querySelector(".price-list");
        pricebtnConfig.appendChild(newHallpriceBtn);
       
       // кнопка корзина
    newHall.querySelector('.basket-button').addEventListener('click', function() {
      newHall.remove(); 
      newHallBtn.remove(); 
      newHallpriceBtn.remove();
    })

  });

});
   
//!!!!!!!!!!!!!!!!! конец создания залов

// получаем элементы со страницы
const pointRowInput = document.querySelector('.point-row-input-text');
const pointChairsInput = document.querySelector('.point-chairs-input-text');
const frameHallWrapper = document.querySelector('.frame_hall-wrapper');
const cancelHallButton = document.querySelector('.seat-selection-button');
const saveHallBtn = document.querySelector('.seat-selection-input');

let arrayConfiguration = [];

// Обработчик события клика по месту в кинозале
function handleChairClick(event) {
  const chair = event.target;
  const rowIndex = chair.dataset.rowindex;
  const colIndex = chair.dataset.colindex;

  if (chair.classList.contains('blocked-chairs')) {
    chair.classList.remove('blocked-chairs');
    chair.classList.add('regular-chairs');
    arrayConfiguration[rowIndex][colIndex] = 'standart';
  } else if (chair.classList.contains('regular-chairs')) {
    chair.classList.remove('regular-chairs');
    chair.classList.add('vip-chairs');
    arrayConfiguration[rowIndex][colIndex] = 'vip';
  } else if (chair.classList.contains('vip-chairs')) {
    chair.classList.remove('vip-chairs');
    chair.classList.add('blocked-chairs');
    arrayConfiguration[rowIndex][colIndex] = 'disabled';
  }
}

// Кнопка 'Зал'
function choiceOneHallBtnClick() {
  const rows = parseInt(pointRowInput.value);
  const chairsPerRow = parseInt(pointChairsInput.value);

  // Очистить текущую конфигурацию и массив
  frameHallWrapper.innerHTML = '';
  arrayConfiguration = new Array(rows).fill(0).map(() => new Array(chairsPerRow).fill('blocked-chairs'));

  // Новые места в зал
  for (let i = 0; i < rows; i++) {
    const row = document.createElement('div');
    row.classList.add('conf-step__row');

    for (let j = 0; j < chairsPerRow; j++) {
      const chair = document.createElement('div');
      chair.classList.add(arrayConfiguration[i][j]);
      chair.dataset.rowindex = i;
      chair.dataset.colindex = j;
      chair.addEventListener('click', handleChairClick);

      const chairWrapper = document.createElement('div');
      chairWrapper.classList.add('conf-step__chair');
      chairWrapper.appendChild(chair);

      row.appendChild(chairWrapper);
    }

    frameHallWrapper.appendChild(row);
  }
}
// отправка массива на сервер при нажатии кнопки "Сохранить"
function saveHallBtnClick() {
  const rows = parseInt(pointRowInput.value);
  const chairsPerRow = parseInt(pointChairsInput.value);

      const params = new FormData()
      const hallId = JSON.parse(window.localStorage.getItem('IDHall'));
      params.set('rowCount', rows)
      params.set('placeCount', chairsPerRow)
      params.set('config', JSON.stringify(arrayConfiguration))
      
      fetch(`https://shfe-diplom.neto-server.ru/hall/${hallId}`, {
        method: 'POST',
        body: params
      })
      .then(response => response.json())
      .then(data => {
        // Обработка информации об измененном кинозале
        console.log(data);
      })
      .catch(error => {
        // Обработка ошибки
        console.error(error);
      });
  
    }
// Добавление обработчика клика на кнопку "Сохранить"
saveHallBtn.addEventListener('click', saveHallBtnClick);
  
function cancelHallButtonClick() {
  const hallId = JSON.parse(window.localStorage.getItem('IDHall'));
  frameHallWrapper.innerHTML = '';
  fetch(`https://shfe-diplom.neto-server.ru/hall/${hallId}`,{
    method: 'DELETE',
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    // Выводим список всех кинозалов после удаления
    console.log(data);
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });
}

cancelHallButton.addEventListener('click', cancelHallButtonClick);
 
    //Конец РАССТАНОВКИ
    
    // Цена билетов
    const priceStandartInput = document.querySelector('.price-regular-input-text');
const priceVipInput = document.querySelector('.price-vip-input-text');
const addNewMovieBtn =  document.querySelectorAll(".add-movie-btn");
addNewMovieBtn.addEventListener("click", function() {
  // Получаем название нового кинозала

    const newMovie = document.createElement("div"); 
    newMovie.className = "choosing-hall-one"; 
    newMovie.innerHTML = 
})
        
 
    function priceSaveHallBtnClick() {
      const standartPrice = parseInt(priceStandartInput.value);
      const vipPrice= parseInt(priceVipInput.value);
      const hallId = JSON.parse(window.localStorage.getItem('IDHall'));
      const params = new FormData()
      params.set('priceStandart', standartPrice)
      params.set('priceVip', vipPrice)
      fetch( `https://shfe-diplom.neto-server.ru/price/${hallId}`, {
          method: 'POST',
          body: params 
      })
          .then( response => response.json())
          .then( data => console.log( data ));
    }
const priceSaveHallBtn = document.getElementById('price_save');
    priceSaveHallBtn.addEventListener('click', priceSaveHallBtnClick);

      
// Получаем элементы списка фильмов
const movieList = document.querySelector('.movie-list');
const addMovieBtn = document.querySelector('.add-movie-btn');

// Функция для добавления фильма в список
function addMovie() {
  // Создаем элементы для нового фильма
  

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

