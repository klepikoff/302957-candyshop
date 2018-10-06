'use strict';
//модуль, содержащий логику формы оформления заказа
(function () {
    window.order = {};

    // 4.2 валидация форм (банковской карты и тд). 1234567890123456
    // console.log('4377731425300255  99/99');

    var modalClose = document.querySelectorAll('.modal__close');
    var modal = document.querySelectorAll('.modal');

    for (var i = 0; i < modal.length; i++){
        modalClose[i].addEventListener('click', function(){
            modal[1].classList.add('modal--hidden');
            modal[0].classList.add('modal--hidden');
        });
    }


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
            // console.log(false);

        } else {
        //modal[1].classList.remove('modal--hidden');
        // console.log(true);

        }
    });

    document.querySelector('form').addEventListener('invalid', function(){
        modal[0].classList.remove('modal--hidden');
    });

    orderBtn.addEventListener('submit', function() {
    // modal[0].classList.remove('modal--hidden');
        alert('aaaaa');
    });
});