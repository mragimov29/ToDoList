function inputEnter() {
    input.forEach(item => {
        item.addEventListener('keyup', (event) => {
            event.preventDefault();
            if (event.key == 'Enter')
                item.readOnly = true;
        });

        removeButton.forEach(button => {
            button.addEventListener('mouseover', (event) => {
                event.target.src = '/images/remove_purple.svg';
            });
            button.addEventListener('mouseout', (event) => {
                event.target.src = '/images/remove.svg';
            });
            button.addEventListener('click', (event) => {
                button.parentElement.remove();
            });
        });
    });
}``

let form = document.querySelector('.form'),
    sortButton = document.querySelector('.sort'), 
    addButton = document.querySelector('.add');
let counter = 0;
let removeButton, input;

addButton.addEventListener('click', (e) => {
    let div = document.createElement('div');
    div.innerHTML = `<input placeholder="Введите текст" type="text" class="task-${myClass}" maxlength="25">
    <img src="/images/remove.svg" class="remove" alt="remove">`;
    div.classList.add('input-line');
    form.append(div);

    input = document.querySelectorAll('input');
    removeButton = document.querySelectorAll('.remove');
    inputEnter();
    if (counter == 4) {
        form.style.overflow = 'scroll';
        form.style.overflowX = 'hidden';
    } else counter++;
    form.scrollTop = form.scrollHeight;
});


sortButton.addEventListener('click', (event) => {
    let input = document.querySelectorAll('input');

    let data = []
    input.forEach((item) => {
        data.push(item.value);
    });

    if (event.target.src.substring(21) != '/images/up_gray.svg') {
        event.target.src = '/images/up_gray.svg';

        data.sort((a, b) => {
            if (a < b) return -1;
            else if (a == b) return 0;
            else return 1;
        });
    } else if (event.target.src.substring(21) == '/images/up_gray.svg') {
        event.target.src = '/images/down_gray.svg';

        data.sort((a, b) => {
            if (a < b) return 1;
            else if (a == b) return 0;
            else return -1;
        });
    }

    for (let i = 0; i < data.length; i++)
        input[i].value = data[i];

    inputEnter();
});