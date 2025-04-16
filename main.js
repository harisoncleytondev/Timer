let rodando = false;
let inputs = document.querySelectorAll(".number");
let input_hour = document.querySelector("#number_hour");
let input_minute = document.querySelector("#number_minute");
let input_second = document.querySelector("#number_second");
let interval =  null;

function fecharPopFora(event) {
    if (event.target === event.currentTarget) {
        let modal = document.querySelector('.modal');
        modal.style.display = 'none';
    }
}

function fecharPop() {
    let modal = document.querySelector('.modal');
    modal.style.display = 'none';
}

function abrirOpcoes() {
    let options = document.querySelector('.options');
    if (options.style.display == 'none' || options.style.display == '') {
        options.style.display = 'block';
        options.classList.add('options_mostrar');
        options.classList.remove('options_esconder');
    } else {
        options.classList.remove('options_mostrar');
        options.classList.add('options_esconder');
        options.style.display = 'none'
    }
}

let hour, minute, second, millisecond = 0;

function carregarInputs() {
    hour = input_hour.value;
    minute = input_minute.value;
    second = input_second.value;
}

document.addEventListener('input', () => {
    inputs.forEach(input => {

        let value = input.value || "";
        input.addEventListener('blur', () => {
            input.value = value.toString().padStart(2, "0");
        });
    });

})

function setarInputs() {
    input_hour.value = hour;
    input_minute.value = minute;
    input_second.value = second;
    inputs.forEach(input => {
        let value = input.value || "";
        input.value = value.toString().padStart(2, "0");
    });
    //coloca um 0 se o numero for menor.
}

function desabilitarInput() {
    inputs.forEach(input => input.disabled = true);
}

function habilitarInput() {
    inputs.forEach(input => input.disabled = false);
}

function rodar() {
    
    if (hour != '') {
        if (minute == '' && second == '') {
            hour--;
            minute = 60;
            minute--;
            second = 60;
        } else if (minute != '' && second == '') {
            minute--;
            second = 60;
            
        }

        if (minute != '' && second == '') {
            second = 60;
        }
        setarInputs();
    }
    
    interval = setInterval(() => {
        if (rodando) {
            
            second--;

            if (second <= 0) {
                if (minute > 0) {
                    minute--;
                    menosMinuto();
                    second = 60;
                } else if (minute <= 0) {
                    
                    if (hour > 0) {
                        hour--;
                        minute = 60;
                    }
                    
                } else if (minute > 0) {
                    if (hour > 0) {
                        hour--;
                        minute--;
                        menosMinuto();
                    } else if (hour < 0) {
                        minute--;
                        menosMinuto();
                    }
                }
            }

            if (hour == 0 && minute == 0 && second == 0) {
                timerFinalizado();
            }
            
        }
        setarInputs();
    }, 1000);
}

function menosMinuto() {
    let body = document.querySelector('body');

    body.style.backgroundColor = 'white';
    setTimeout(() => {
        body.style.backgroundColor = '';
    }, 350);
    
}

function timerFinalizado() {
    let modal = document.querySelector('.modal');
    modal.style.display = 'block';
    navigator.vibrate([200, 100, 200]);
    zerarTimer();
}


function habilitarTimer() {
    if (rodando) return;

    /*var number = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];*/

    
    clearInterval(interval);
    rodando = true;
    carregarInputs();
    desabilitarInput();
    rodar();
}

function desabilitarTimer() {
    if (!rodando) return;
    clearInterval(interval);
    habilitarInput();
    rodando = false;
}

function zerarTimer() {
    if (!rodando) return;
    clearInterval(interval);
    habilitarInput();
    hour = ''; minute = ''; second = '';
    setarInputs();
    carregarInputs();
    inputs.forEach(input => input.value = "");
    rodando = false;
}
