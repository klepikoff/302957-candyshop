'use strict';
// модуль, который создаёт данные
(function () {
    window.data = {};
    window.data.NAMES = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби',
        'Хитрый баклажан', 'Горчичный вызов','Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград',
        'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет',
        'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];

    window.data.IMAGES = ['gum-cedar', 'gum-chile', 'gum-eggplant', 'gum-mustard', 'gum-portwine', 'gum-wasabi', 'ice-cucumber', 'ice-eggplant',
        'ice-garlic', 'ice-italian', 'ice-mushroom', 'ice-pig', 'marmalade-beer', 'marmalade-caviar', 'marmalade-corn', 'marmalade-new-year',
        'marmalade-sour', 'marshmallow-bacon', 'marshmallow-beer', 'marshmallow-shrimp', 'marshmallow-spicy', 'marshmallow-wine', 'soda-bacon',
        'soda-celery', 'soda-cob', 'soda-garlic', 'soda-peanut-grapes', 'soda-russian'];

    window.data.CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца',
        'ароматизатор дуба идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор',
        'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];

    window.data.BOOLEANS = [true, false];

    window.data.RATINGS = ['stars__rating--one', 'stars__rating--two', 'stars__rating--three', 'stars__rating--four', 'stars__rating--five'];


    window.data.getRandomNumber = function(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    };

    window.data.getRandomContent = function(arr){
        var randomContent = arr[window.data.getRandomNumber(0, arr.length - 1)];
    
        for (var j = 0; j <  window.data.getRandomNumber(0, arr.length - 1); j++) {
            randomContent += ', ' + arr[window.data.getRandomNumber(0, arr.length - 1)];
        }
        return randomContent;
    };

    window.data.gt = function(node, indx) {
        for (var i = 0; i <= indx; i++) {
            node = node.parentNode;
        }
        return(node);
    };

    window.data.createArr = function(quantity, arr){
        for (var i = 0; i < quantity; i++){
            arr[i] = {
                name: window.data.NAMES[ window.data.getRandomNumber(0, window.data.NAMES.length - 1)],
                picture: 'img/cards/' + window.data.IMAGES[ window.data.getRandomNumber(0, window.data.IMAGES.length)] + '.img',
                amount:  window.data.getRandomNumber(0, 20),
                price:  window.data.getRandomNumber(100, 1500),
                weight:  window.data.getRandomNumber(30, 300),
                rating: {
                    value:  window.data.getRandomNumber(1, 5),
                    number:  window.data.getRandomNumber(10, 900)
                },
                nutritionFacts: {
                    sugar: window.data.BOOLEANS[ window.data.getRandomNumber(0, window.data.BOOLEANS.length)],
                    energy:  window.data.getRandomNumber(70, 500),
                    contents:  window.data.getRandomContent(window.data.CONTENTS)
                }
            };
        }
        return arr;
    };
})();