
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
              console.log(data);
         
            })
            .catch(error => {
              console.error('Ошибка:', error);
            });
            
        
           
            const newHallnew = document.querySelector(".choosing-list-managament"); // Находим элемент nav
    newHallnew.appendChild(newHall); // Добавляем новый зал в nav
          
    const newHallBtn = document.createElement("div"); // Создаем новый элемент div
           newHallBtn.ById = "hall-btn"; // Добавляем класс "choosing-hall-one"
           newHallBtn.innerHTML = 
           `<div><button class="choice-one-hall" type="button">
           <span class="hall-button-text">${(newName)}</span></button>
        </div>`
        const choiceOneHallBtn = newHallBtn.querySelector(".choice-one-hall"); // находим newhallbtn
        
        choiceOneHallBtn.addEventListener('click', choiceOneHallBtnClick);
        const btnConfig = document.querySelector('.choice-list');
           btnConfig.appendChild(newHallBtn);

    newHall.querySelector('.basket-button').addEventListener('click', function() {
      newHall.remove(); 
      newHallBtn.remove(); 
    
    })

  });

    });
   
//!!!!!!!!!!!!!!!!! конец создания залов
//НАЧАЛО РАССТАНОВКИ
const pointRowInput = document.querySelector('.point-row-input-text');
const pointChairsInput = document.querySelector('.point-chairs-input-text');
const frameHallWrapper = document.querySelector('.frame_hall-wrapper');
const cancelHallButton = document.querySelector('.seat-selection-button');
const saveHallBtn = document.querySelector('.seat-selection-input')
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

// кнопка зал

function choiceOneHallBtnClick() {
  const rows = parseInt(pointRowInput.value);
  const chairsPerRow = parseInt(pointChairsInput.value);

  // Хранение мест
  const config = [];

  for (let i = 0; i < rows; i++) {
    config[i] = [];

    for (let j = 0; j < chairsPerRow; j++) {
      config[i][j] = 'blocked-chairs';
    }
  }

  // Новые места в зал
  for (let i = 0; i < rows; i++) {
    const row = document.createElement('div');
    row.classList.add('conf-step__row');

    for (let j = 0; j < chairsPerRow; j++) {
      const chair = document.createElement('div');
      chair.classList.add(config[i][j]);
      chair.addEventListener('click', handleChairClick);

      const chairWrapper = document.createElement('div');
      chairWrapper.classList.add('conf-step__chair');
      chairWrapper.appendChild(chair);

      row.appendChild(chairWrapper);
    }

    frameHallWrapper.appendChild(row);
  }
 
  function saveHallButtonClick() {
   
    const config = [];
    const params = new FormData();

    params.set('rowCount', rows);
    params.set('placeCount', chairsPerRow);
    params.set('config', JSON.stringify(config));
 
    const url = 'https://shfe-diplom.neto-server.ru/hall/{hallId}';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
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
   saveHallBtn.addEventListener('click', saveHallButtonClick);
}

   

      


function cancelHallButtonClick() {
  frameHallWrapper.innerHTML = '';
  fetch(`https://shfe-diplom.neto-server.ru/hall/{hallId}`,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
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
    