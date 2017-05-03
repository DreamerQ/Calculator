'use strict';
function Calc() {
    'use strict';
    var calculator = new Calculator();

    var input = document.querySelector('[type="text"]');

    var rez = document.getElementById('rez');
    rez.innerHTML = calculator.calc(input.value);
}


function Calculator() {
    'use strict';

    this.calc = function(str) {
        var arrTemp = strBracketSplit(str);
        var openBracketPos = 0;
        var closeBracketPos = 0;

        while (arrTemp.some(item => item === '('))
        {
            for (var i = 0; i < arrTemp.length; i++) {
                if (arrTemp[i] === '(') openBracketPos = i;
            }

            var j = openBracketPos + 1;
            while (arrTemp[j] != ')') {
                j++;
            }
            closeBracketPos = j;

            arrTemp.splice(openBracketPos, closeBracketPos - openBracketPos + 1,
                calcOperations(arrTemp.slice(openBracketPos + 1, closeBracketPos).join('')));

        }

        return +calcOperations(arrTemp.join(''));
    };

    function strBracketSplit(str) {
        var Symbols = {'(': 1, ')': 1};
        var arr = [];
        var string = '';

        for (var i = 0; i < str.length; i++) {
            if (str[i] in Symbols) {
                if (string) {
                    arr.push(string);
                    string = '';
                }
                arr.push(str[i]);
                continue;
            }
            string += str[i];
            if (i === str.length - 1) arr.push(string);
        }
        console.log(arr);
        return arr;
    }

    function strOperSplit(str) {
        var Symbols = {'+': 1, '-': 1, '*': 1, '/': 1};
        var arr = [];
        var numb = '';

        for (var i = 0; i < str.length; i++) {
            if (str[i] in Symbols) {
                if (numb) {
                    arr.push(numb);
                    numb = '';
                }
                arr.push(str[i]);
                continue;
            }
            numb += str[i];
            if (i === str.length - 1) arr.push(numb);
        }
        console.log(arr);
        return arr;
    }

    //Вычисляет простое математическое выражение без скобок
    function calcOperations(str) {
        var arr = strOperSplit(str);

        if (arr[0] === '-') arr.splice(0,2, arr[0] + arr[1]);

        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === '*') {
                var rez = arr[i - 1] * arr[i + 1];
                arr.splice(i - 1, 3, rez.toString());
                i--;
            }
        }

        for (i = 0; i < arr.length; i++) {
            if (arr[i] === '/') {
                rez = arr[i - 1] / arr[i + 1];
                arr.splice(i - 1, 3, rez.toString());
                i--;
            }
        }

        for (i = 0; i < arr.length; i++) {
            if (arr[i] === '-') {
                rez = arr[i - 1] - arr[i + 1];
                arr.splice(i - 1, 3, rez.toString());
                i--;
            }
        }

        for (i = 0; i < arr.length; i++) {
            if (arr[i] === '+') {
                rez = +arr[i - 1] + +arr[i + 1];
                arr.splice(i - 1, 3, rez.toString());
                i--;
            }
        }


        return arr.join('');
    }
}