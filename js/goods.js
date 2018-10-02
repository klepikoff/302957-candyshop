'use strict';
//3.1.1
var NAMES = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби',
'Хитрый баклажан', 'Горчичный вызов','Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград',
'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет',
'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];

var IMAGES = ['gum-cedar', 'gum-chile', 'gum-eggplant', 'gum-mustard', 'gum-portwine', 'gum-wasabi', 'ice-cucumber', 'ice-eggplant', 
'ice-garlic', 'ice-italian', 'ice-mushroom', 'ice-pig', 'marmalade-beer', 'marmalade-caviar', 'marmalade-corn', 'marmalade-new-year',
'marmalade-sour', 'marshmallow-bacon', 'marshmallow-beer', 'marshmallow-shrimp', 'marshmallow-spicy', 'marshmallow-wine', 'soda-bacon',
'soda-celery', 'soda-cob', 'soda-garlic', 'soda-peanut-grapes', 'soda-russian'];

var CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 
'ароматизатор дуба идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 
'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];

var BOOLEANS = [true, false];

var RATINGS = ['stars__rating--one', 'stars__rating--two', 'stars__rating--three', 'stars__rating--four', 'stars__rating--five'];

// случайное целое
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
};

function getRandomContent(arr){
  var randomContent = arr[getRandomNumber(0, arr.length - 1)];

  for (var j = 0; j < getRandomNumber(0, arr.length - 1); j++) {
    randomContent += ', ' + arr[getRandomNumber(0, arr.length - 1)]
  }
  return randomContent;
}

// подъем на несколько родителей
function gt(node, indx) {
    var parent;
    for (var i = 0; i <= indx; i++) {
        node = node.parentNode;
    }
    return(node);
}

var createArr = function(quantity, arr){
    for (var i = 0; i < quantity; i++){
        arr[i] = {
            name: NAMES[getRandomNumber(0, NAMES.length - 1)],
            picture: 'img/cards/' + IMAGES[getRandomNumber(0, IMAGES.length)] + '.img',
            amount: getRandomNumber(0, 20),
            price: getRandomNumber(100, 1500),
            weight: getRandomNumber(30, 300),
            rating: {
                value: getRandomNumber(1, 5),
                number: getRandomNumber(10, 900)
            },
            nutritionFacts: {
                sugar: BOOLEANS[getRandomNumber(0, BOOLEANS.length)],
                energy: getRandomNumber(70, 500),
                contents:  getRandomContent(CONTENTS)
            }
        }
    }
    return arr;
}

var goods = []; //

var goodsQuantity = 6; //

createArr(goodsQuantity, goods); //

//3.1.2 
var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');

var catalogLoad = document.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');

var fragment = document.createDocumentFragment();

var catalogTemplate = document.querySelector('#card').content.querySelector('.catalog__card');

var renderGoods = function(goods){
    var goodElement = catalogTemplate.cloneNode(true);

    goodElement.querySelector('.card__title').textContent = goods.name;
   
    if(goods.amount === 0){ 
        goodElement.classList.remove('card--in-stock');
        goodElement.classList.add('card--soon');
    } else if ((goods.amount > 0) && (goods.amount <= 5)) {
        goodElement.classList.remove('card--in-stock');
        goodElement.classList.add('card--little');
    }

    var goodElementTextCurrency = goodElement.querySelector('.card__currency');
    var goodElementTextWeight = goodElement.querySelector('.card__weight');

    goodElement.querySelector('.card__price').textContent = goods.price + ' ';
    goodElement.querySelector('.card__price').appendChild(goodElementTextCurrency);
    goodElement.querySelector('.card__price').appendChild(goodElementTextWeight);

    goodElement.querySelector('.stars__rating').classList.remove('stars__rating--five');

    var goodElementRating = goods.rating.value;

    goodElement.querySelector('.stars__rating').classList.add(RATINGS[goodElementRating - 1]);

    goodElement.querySelector('.star__count').textContent = '(' + goods.rating.number + ')';

    var goodElementSugar = 'Без сахара';
    if(goods.nutritionFacts.sugar) {
        goodElementSugar = 'С сахаром';
    }

    goodElement.querySelector('.card__characteristic').textContent = goodElementSugar + '. ' + goods.nutritionFacts.energy + ' ккал';

    goodElement.querySelector('.card__composition-list').textContent = goods.nutritionFacts.contents;

    return(goodElement);
}

for (var i = 0; i < goodsQuantity; i++){
    fragment.appendChild(renderGoods(goods[i]));
}
catalogCards.appendChild(fragment);


//3.1.3 корзина (решение удалено, см. соответствующие коммиты)

var basketCards = document.querySelector('.goods__cards');

var basketTemplate = document.querySelector('#card-order').content.querySelector('.card-order');

//4.1.1 избранное
var buttonFavorite = document.querySelectorAll('.card__btn-favorite');
for(var i = 0; i < buttonFavorite.length; i++){
    buttonFavorite[i].addEventListener('click', function() {
        this.classList.toggle('card__btn-favorite--selected');
    });
}

//4.1.2 добавление в корзину
var buttonAdd = document.querySelectorAll('.card__btn');
var basketContainer = document.querySelector('.goods__cards');
var basketGoods = [];

var newFragment = document.createDocumentFragment();

for(var i = 0; i < buttonAdd.length; i++){

    buttonAdd[i].addEventListener('click', function() { // ставим обработчики

        // убираем заглушку
        basketCards.classList.remove('goods__cards--empty'); 
        document.querySelector('.goods__card-empty').classList.add('visually-hidden');

        //добавляем цифру в шапке
        document.querySelector('.main-header__basket').textContent = 'В корзине ' + basketGoods.length + ' шт. товаров';

        var thisCard = gt(this, 2);
        
        var basketGood = {
            name: thisCard.querySelector('.card__title').textContent,
            picture: thisCard.querySelector('.card__img').src,
            price: thisCard.querySelector('.card__price').textContent,
            orderedAmount: 1 //количество товара                     
        }
        function testArr(arr, smth){ //проверка на похожесть товара на витрине и в корзине
            for(var j = 0; j < arr.length; j++){
                if(smth.name === arr[j].name) {
                    arr[j].orderedAmount += 1; 
                    document.querySelectorAll('.card-order__count')[j].value = arr[j].orderedAmount;
                    return false;
                } 
            }
            return true
        }

 
        if(testArr(basketGoods, basketGood)){
            basketGoods.push(basketGood);

        var basketElement = basketTemplate.cloneNode(true);
        basketElement.querySelector('.card-order__title').textContent = basketGoods[basketGoods.length - 1].name;
        basketElement.querySelector('.card-order__price').textContent = basketGoods[basketGoods.length - 1].price;
        basketElement.querySelector('.card-order__count').value = basketGoods[basketGoods.length - 1].orderedAmount;

        newFragment.appendChild(basketElement);        
        
        basketCards.appendChild(newFragment);
        }
    })
};

/* СДЕЛАТЬ!
Ещё один момент, который нужно учесть, что в корзину должно быть невозможно добавить больше товаров, 
чем указано в количестве товара (amount). Получается, что при добавлении и удалении товара, в списке 
товаров нужно обновлять свойство amount у соответствующего товара. */

// 4.1.3 переключение способов доставки
var deliverStoreBtn = document.querySelector('#deliver__store'); 
var deliverCourierBtn = document.querySelector('#deliver__courier');

var deliverStoreTab = document.querySelector('.deliver__store'); 
var deliverCourierTab = document.querySelector('.deliver__courier');

deliverStoreBtn.addEventListener('click', function() {
    deliverStoreTab.classList.remove('visually-hidden');
    deliverCourierTab.classList.add('visually-hidden')
})

deliverCourierBtn.addEventListener('click', function() {
    deliverStoreTab.classList.add('visually-hidden');
    deliverCourierTab.classList.remove('visually-hidden')
})

// 4.1.4 обработчик на фильтр, первая фаза
var rangeBtnLeft = document.querySelector('.range__btn--left');
var rangeBtnRight = document.querySelector('.range__btn--right');

var rangePriceMin = document.querySelector('.range__price--min');
var rangePriceMax = document.querySelector('.range__price--max');

rangeBtnLeft.addEventListener('mouseup', function(evt) {
    console.log(evt.clientX);
    console.log(evt.clientY);
});

rangeBtnRight.addEventListener('mouseup', function(evt) {
    console.log(evt.clientX);
    console.log(evt.clientY);
});

// нужен переключатель, координаты из которого нужно занести в rangePriceMin/max textContent

// 5.1
var rangeSize = 5;

var rangeFillLine = document.querySelector('.range__fill-line');

rangeBtnLeft.addEventListener('mousedown', function(evt){ // левый
    evt.preventDefault();

    var startCoords = {
        x: evt.clientX,
    };
    var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
    
        var shift = { // смещение
          x: startCoords.x - moveEvt.clientX,
        };
    
        startCoords = {
          x: moveEvt.clientX,
        };

        if(((rangeBtnLeft.offsetLeft - shift.x) >= 0) && ((rangeBtnLeft.offsetLeft - shift.x) < rangeBtnRight.offsetLeft - rangeSize)){
            rangeBtnLeft.style.left = (rangeBtnLeft.offsetLeft - shift.x) + 'px';
            rangePriceMin.textContent = rangeBtnLeft.offsetLeft + 24;

            rangeFillLine.style.left = (rangeBtnLeft.offsetLeft - shift.x + rangeSize) + 'px';
            console.log( rangeFillLine.style.left);
        }
    };
    var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
    
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});


rangeBtnRight.addEventListener('mousedown', function(evt){ // правый
    evt.preventDefault();
    var startCoords = {
        x: evt.clientX,
    };

    var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
    
        var shift = { // смещение
          x: startCoords.x - moveEvt.clientX,
        };
    
        startCoords = {
          x: moveEvt.clientX,
        };

        if(((rangeBtnRight.offsetLeft - shift.x) <= 240) && ((rangeBtnRight.offsetLeft - shift.x) > rangeBtnLeft.offsetLeft + rangeSize)){
            rangeBtnRight.style.left = (rangeBtnRight.offsetLeft - shift.x) + 'px';
            rangePriceMax.textContent = rangeBtnRight.offsetLeft + 32;

            rangeFillLine.style.right = 245 - rangeSize - (rangeBtnRight.offsetLeft - shift.x) + 'px';
        }
    };
    var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
    
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
})


// 4.2 валидация форм (банковской карты и тд). 1234567890123456
console.log('4377731425300255  99/99');

var modalClose = document.querySelectorAll('.modal__close');
var modal = document.querySelectorAll('.modal');

for (var i = 0; i < modal.length; i++){
    modalClose[i].addEventListener('click', function(){
        modal[1].classList.add('modal--hidden');
        modal[0].classList.add('modal--hidden');
    });
};


function multiplyEvenNumbers(arr){
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] % 2 != 0){
            arr[i] *=  2;
        } else {
            arr[i] = + arr[i];
        }    
    }
    
    for (var j = 0; j < arr.length; j++) {
        if (arr[j] >= 10) {
            arr[j] = arr[j] - 9;
        }
    }
        return(arr);
}

var result;

var orderBtn = document.querySelector('.buy__submit-btn');

orderBtn.addEventListener('click', function(){
    var cardNumber = document.querySelector('#payment__card-number').value;
    var cardNumbers = cardNumber.split('');
    var cardNumbersMitliplied = multiplyEvenNumbers(cardNumbers);
  

    var sumResult = cardNumbersMitliplied.reduce(function(sum, current) {
        return sum + current;
    }, 0);

    if (sumResult % 10 !== 0){
        document.querySelector('#payment__card-number').setCustomValidity('У вас поломанная карта');
        //modal[0].classList.remove('modal--hidden');
        console.log(false)

    } else {
        //modal[1].classList.remove('modal--hidden');
        console.log(true);

    }
 })

document.querySelector('form').addEventListener('invalid', function(){
     modal[0].classList.remove('modal--hidden');   
})

orderBtn.addEventListener('submit', function() {
   // modal[0].classList.remove('modal--hidden'); 
    alert('aaaaa');
});

