'use strict';
//модуль, который работает с карточками товаров и корзиной
(function () {
    window.catalog = {};
    var goods = [];
    
    var goodsQuantity = 6;

    window.data.createArr(goodsQuantity, goods);

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

        goodElement.querySelector('.stars__rating').classList.add(window.data.RATINGS[goodElementRating - 1]);

        goodElement.querySelector('.star__count').textContent = '(' + goods.rating.number + ')';

        var goodElementSugar = 'Без сахара';
        if(goods.nutritionFacts.sugar) {
            goodElementSugar = 'С сахаром';
        }

        goodElement.querySelector('.card__characteristic').textContent = goodElementSugar + '. ' + goods.nutritionFacts.energy + ' ккал';

        goodElement.querySelector('.card__composition-list').textContent = goods.nutritionFacts.contents;

        return(goodElement);
    };

    for (var i = 0; i < goodsQuantity; i++){
        fragment.appendChild(renderGoods(goods[i]));
    }
    catalogCards.appendChild(fragment);

    var basketCards = document.querySelector('.goods__cards');

    var basketTemplate = document.querySelector('#card-order').content.querySelector('.card-order');

    //4.1.1 избранное;
    var buttonFavorite = document.querySelectorAll('.card__btn-favorite');
    for(i = 0; i < buttonFavorite.length; i++){
        buttonFavorite[i].addEventListener('click', function() {
            this.classList.toggle('card__btn-favorite--selected');
        });
    }

    //4.1.2 добавление в корзину
    var buttonAdd = document.querySelectorAll('.card__btn');
    // var basketContainer = document.querySelector('.goods__cards');
    var basketGoods = [];

    var newFragment = document.createDocumentFragment();

    for(i = 0; i < buttonAdd.length; i++){

        buttonAdd[i].addEventListener('click', function() { // ставим обработчики

            // убираем заглушку
            basketCards.classList.remove('goods__cards--empty');
            document.querySelector('.goods__card-empty').classList.add('visually-hidden');

            var thisCard = window.data.gt(this, 2);

            var basketGood = {
                name: thisCard.querySelector('.card__title').textContent,
                picture: thisCard.querySelector('.card__img').src,
                price: thisCard.querySelector('.card__price').textContent,
                orderedAmount: 1 //количество товара
            };
            
            function testArr(arr, smth){ //проверка на похожесть товара на витрине и в корзине
                for(var j = 0; j < arr.length; j++){
                    if(smth.name === arr[j].name) {
                        arr[j].orderedAmount += 1;
                    
                        document.querySelectorAll('.card-order__count')[j].value = arr[j].orderedAmount;
                        return false;
                    }
                }
                return true;
            }
        
            if(testArr(basketGoods, basketGood)){
                basketGoods.push(basketGood);

                //добавляем цифру в шапке
                document.querySelector('.main-header__basket').textContent = 'В корзине ' + (basketGoods.length) + ' шт. товаров';

                var basketElement = basketTemplate.cloneNode(true);
                basketElement.querySelector('.card-order__title').textContent = basketGoods[basketGoods.length - 1].name;
                basketElement.querySelector('.card-order__price').textContent = basketGoods[basketGoods.length - 1].price;
                basketElement.querySelector('.card-order__count').value = basketGoods[basketGoods.length - 1].orderedAmount;

                newFragment.appendChild(basketElement);

                basketCards.appendChild(newFragment);
            }
        });
    }

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
        deliverCourierTab.classList.add('visually-hidden');
    });

    deliverCourierBtn.addEventListener('click', function() {
        deliverStoreTab.classList.add('visually-hidden');
        deliverCourierTab.classList.remove('visually-hidden');
    });

})();