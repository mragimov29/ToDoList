let form = document.querySelector('.form');
let sortButton = document.querySelector('.sort');
let addButton = document.querySelector('.add');
let removeLi = document.getElementsByClassName('remove-li');
let formHeight = 30, height = 246, counter = 0, myClass = 0;
let dragged, id, index, indexDrop, list, removeButton, inputLine, input;

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
    }
    counter++;
    form.scrollTop = form.scrollHeight;
});