
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
// Конец стоимость билетов
   
//------------Сетка сеансов

// Функция для добавления фильма в список

const movieDataEntrySection = document.querySelector(".movie-data-entry");
const addNewMovieBtn =  document.querySelector(".add-movie-btn");
  
    addNewMovieBtn.addEventListener('click', function() {
    movieDataEntrySection.style.display = 'flex';
    });
    

    const movieClosePopUp = document.getElementById('movie-close-pop-up');
    movieClosePopUp.addEventListener('click', function() {
      movieDataEntrySection.style.display = 'none';
    });

//создание и отправка фильма

const movieForm = document.getElementById('movie-form');
const movieSend = document.getElementById('movie-send');

movieSend.addEventListener('click', function(event) {
  movieDataEntrySection.style.display = 'none';
    event.preventDefault();
    
    const filmName = document.getElementById('movie-n').value;
    const filmDuration = document.getElementById('movie-d').value;
    const filmDescription = document.getElementById('movie-des');
    const filmOrigin = document.getElementById('movie-o');
    const fileInput = document.getElementById('file-p');
    const filePoster = fileInput.files[0];

    if (!filePoster) {
        alert("Выберите изображение постера");
        return;
    }

    // добавление нового фильма в (movie-list)
    const newMovie = document.createElement("div"); 
    newMovie.className = "movie-one";
    newMovie.innerHTML = `
    <div id="movie-delete">
        <div class="movie-one" id="movie-new">
            <img class="movie-post" src="">
            <div class="movie-conteiner-text">
                <span class="movie-text-top" draggable="true">${filmName}</span>
                <span class="movie-text-time">${filmDuration}</span>
            </div>
            <div class="movie-conteiner-btn">
                <button class="movie-btn-one">
                    <img class="imggg">
                </button>
            </div>
       </div>
       </div>
    `;

    const movieList = document.querySelector(".movie-list");
    movieList.appendChild(newMovie);

    // добавление постера
    const reader = new FileReader();
    reader.onload = function(e) {
        const imgElement = newMovie.querySelector('.movie-post');
        imgElement.src = e.target.result;
    };
    reader.readAsDataURL(filePoster);

    //отправка фильма на сервер
    const params = new FormData();
    params.append('filmName', filmName);
    params.append('filmName', filmName);
    params.append('filmDuration', filmDuration);
    params.append('filmDescription', filmDescription);
    params.append('filmOrigin', filmOrigin);
    params.append('filePoster', filePoster);

    fetch('https://shfe-diplom.neto-server.ru/film', {
        method: 'POST',
        body: params

    })
    .then(response => response.json())
    .then(data => {
      let lndexFilm = data.result.films.length - 1;
      
      let idFilm = data.result.films[lndexFilm].id;
     
      window.localStorage.setItem('IDFilm', `${(idFilm)}`);
      console.log(idFilm);
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

//удаление из списка фильмов
const delMovie = document.querySelector('.movie-btn-one');
const movieAdd = document.getElementById('movie-delete');
delMovie.addEventListener('click', function() {
  newMovie.remove(); 
  const params = new FormData()
      const filmId = JSON.parse(window.localStorage.getItem('IDFilm'));
     
      params.set('config', JSON.stringify(arrayConfiguration))
      
      fetch(`https://shfe-diplom.neto-server.ru/film/${filmId}`, {
        method: 'DELETE',
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
})
   }); 


document.addEventListener('DOMContentLoaded', (event) => {
  const movieHallTimeFrames = document.querySelectorAll('.movie-hall-time-frame');
  const movieList = document.querySelector('.movie-list');

  movieList.addEventListener('dragstart', (e) => {
    if (e.target && e.target.classList.contains("movie-text-top")) {
      e.dataTransfer.setData('text/plain', e.target.closest('.movie-one').id);
    }
  });

  movieHallTimeFrames.forEach((frame) => {
    frame.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    frame.addEventListener('drop', (e) => {
      e.preventDefault();
      const movieId = e.dataTransfer.getData('text');
      const originalMovie = document.getElementById(movieId).querySelector('.movie-conteiner-text');
      if (originalMovie) {
        const duplicateMovie = originalMovie.cloneNode(true);
        const newMovieContainer = document.createElement('div');
        newMovieContainer.classList.add('movie-one');
        newMovieContainer.id = `movie-${Date.now()}`; // уникальный id для дубликата
        newMovieContainer.appendChild(duplicateMovie);
        frame.appendChild(newMovieContainer);
      }
    });
  });
});

