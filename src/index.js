const basketBtnOne = document.querySelector('.basket-button-one');
basketBtnOne.addEventListener('click', function() {
  // Действия при нажатии на кнопку
  console.log('Кнопка "зал 1" нажата');
});


/*function addNextHall() {
    const wrapper = document.querySelector(".choosing-list-managament");
    
    const hallDiv = document.createElement("div");
    hallDiv.classList.add("choosing-hall-one");
    
    const dashDiv = document.createElement("div");
    dashDiv.classList.add("dash-one");
    dashDiv.innerHTML = "<span>-</span>";
    
    const hallTextDiv = document.createElement("div");
    hallTextDiv.classList.add("choosing-hall-text");
    hallTextDiv.innerHTML = "<span>зал" + (wrapper.children.length + 1) + "</span>";
    
    const basketButton = document.createElement("button");
    basketButton.classList.add("basket-button-one");
    basketButton.innerHTML = '<img src="image/image.png/popcorn.png" alt="popcorn basket button">'
    basketButton.addEventListener("click", function() { removeHall(this); });
    
    hallDiv.appendChild(dashDiv);
    hallDiv.appendChild(hallTextDiv);
    hallDiv.appendChild(basketButton);
    
    wrapper.appendChild(hallDiv);
  }
  
  function removeHall(button) {
    const hallDiv = button.parentElement;
    const wrapper = document.querySelector(".choosing-list-managament");
    
    wrapper.removeChild(hallDiv);
  }*/

  /* конфигурация зала */

  /*function addnexthall() {
    var button = document.createElement("button");
    button.classList.add("choice-one-hall");
    button.setAttribute("type", "button");
    var buttonText = document.createTextNode("зал");
  
    var halls = document.getElementsByClassName("choice-one-hall");
    var hallNumber = halls.length + 1;
    var hallName = "зал " + hallNumber;
  
    var span = document.createElement("span");
    span.classList.add("hall-button-text");
    span.appendChild(document.createTextNode(hallName));
  
    button.appendChild(span);
    document.getElementsByClassName("choice-list")[0].appendChild(button);
  }
  
  document.getElementsByClassName("create-hall-button")[0].addEventListener("click", addnexthall);
  */

  // Получаем ссылки на кнопки и присваиваем им обработчики событий
var createHallButton = document.querySelector('.create-hall-button');
var basketButtonOne = document.querySelector('.basket-button-one');
var choiceOneHallButton = document.querySelector('.choice-one-hall');

createHallButton.addEventListener('click', function() {
  // Показываем кнопки "basket-button-one" и "choice-one-hall"
  basketButtonOne.style.display = 'block';
  choiceOneHallButton.style.display = 'block';
});

basketButtonOne.addEventListener('click', function() {
  // Скрываем кнопки "basket-button-one" и "choice-one-hall"
  basketButtonOne.style.display = 'none';
  choiceOneHallButton.style.display = 'none';
});
