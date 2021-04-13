/*

// Существует меньше способов выбрать узел DOM с устаревшими браузерами
var form  = document.getElementsByTagName('form')[0];
var email = document.getElementById('email');
var btn = document.getElementById('btn');


// Ниже приведён трюк для достижения следующего узла Element Element в DOM
// Это опасно, потому что вы можете легко построить бесконечный цикл.
// В современных браузерах вам следует использовать элемент element.nextElementSibling
var error = email;
while ((error = error.nextSibling).nodeType != 1);

// As per the HTML5 Specification
var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Многие устаревшие браузеры не поддерживают метод addEventListener.
// Вот простой способ справиться с этим; это далеко не единственный.
function addEvent(element, event, callback) {
    var previousEventCallBack = element["on"+event];
    element["on"+event] = function (e) {
        var output = callback(e);

        // колбэк, который возвращает `false`, останавливает цепочку колбэков
        // и прерывает выполнение колбэка события.
        if (output === false) return false;

        if (typeof previousEventCallBack === 'function') {
            output = previousEventCallBack(e);
            if(output === false) return false;
        }
    }
};

// Теперь мы можем перестроить наше ограничение валидации
// Поскольку мы не полагаемся на псевдокласс CSS, мы должны
// явно установить допустимый / недопустимый класс в поле электронной почты
addEvent(window, "load", function () {
// Здесь мы проверяем, пусто ли поле (помните, что поле не требуется)
    // Если это не так, мы проверяем, является ли его контент корректным адресом электронной почты.
    var test = email.value.length === 0 || emailRegExp.test(email.value);

    btn.

    email.className = test ? "valid" : "invalid";
});

// Это определяет, что происходит, когда пользователь вводит в поле
addEvent(email, "input", function () {

    var test = email.value.length === 0 || emailRegExp.test(email.value);
    if (test) {
        email.className = "valid";
        error.innerHTML = "";
        error.className = "error";
    } else {
        email.className = "invalid";
    }
});

// Это определяет, что происходит, когда пользователь пытается отправить данные
addEvent(form, "submit", function () {
    var test = email.value.length === 0 || emailRegExp.test(email.value);

    if (!test) {
        email.className = "invalid";
        error.innerHTML = "I expect an e-mail, darling!";
        error.className = "error active";
        alert("KEKVV");

        // Некоторые устаревшие браузеры не поддерживают метод event.preventDefault ()
        return false;
    } else {
        email.className = "valid";
        error.innerHTML = "";
        error.className = "error";
    }
});


 */
const form = document.querySelector('#form');

const name = document.getElementById('name');
const email = document.getElementById('email');
const date = document.getElementById('date');
const party_num = document.getElementById('party_num');

const btn = document.getElementById('btn');
const modal = document.getElementById("myModal");

var name_isvalid = email_isvalid = date_isvalid = party_num_isvalid = false;
btn.disabled = true;

name.addEventListener('input', validate);
email.addEventListener('input', validate);
date.addEventListener('input', validate);
party_num.addEventListener('input', validate);

const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

form.addEventListener('submit', function (e) {
    e.preventDefault();

    modal.style.display = "block";
    return true;
});


function validate(e){
    if (e.target.name === "name"){
        name_isvalid = e.target.value.length > 0;
    }
    if (e.target.name === "email"){
        email_isvalid = emailRegExp.test(e.target.value);
    }
    if(e.target.name === "date"){
        date_isvalid = new Date(e.target.value).getTime() >= new Date(new Date().toDateString()).getTime();
        //console.log(new Date(e.target.value).getTime());
        //console.log(new Date(new Date().toDateString()).getTime());
    }
    if(e.target.name === "party_num"){
        party_num_isvalid = e.target.value !== "placeholder";
    }

    btn.disabled = !(name_isvalid && email_isvalid && date_isvalid && party_num_isvalid);

    //console.log(name_isvalid);
    //console.log(email_isvalid);
    //console.log(date_isvalid);
    //console.log(party_num_isvalid);
    //console.log("");
}



// Get the button that opens the modal

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}


