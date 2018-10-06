'use strict';
//модуль для работы с фильтром
(function () {
// 4.1.4 обработчик на фильтр, первая фаза
    var rangeBtnLeft = document.querySelector('.range__btn--left');
    var rangeBtnRight = document.querySelector('.range__btn--right');

    var rangePriceMin = document.querySelector('.range__price--min');
    var rangePriceMax = document.querySelector('.range__price--max');

    rangeBtnLeft.addEventListener('mouseup', function() {
    // console.log(evt.clientX);
    // console.log(evt.clientY);
    });

    rangeBtnRight.addEventListener('mouseup', function() {
    // console.log(evt.clientX);
    // console.log(evt.clientY);
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
            // console.log( rangeFillLine.style.left);
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
    });
})();
