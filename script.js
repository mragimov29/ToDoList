let form = document.querySelector('.form'), 
    input = document.querySelectorAll('input'),
    removeButton = document.querySelectorAll('.remove'),
    sortButton = document.querySelector('.sort'),
    addButton = document.querySelector('.add');
let items;

inputEnter();

function addInputLine() {
    let div = document.createElement('div');
    div.innerHTML = `<input placeholder="Введите текст" type="text" maxlength="25">
    <img src="/images/remove.svg" class="remove" alt="remove">`;
    div.classList.add('input-line');
    div.draggable = true;
    form.append(div);
    let li = document.createElement('li');
    document.querySelector('ul').append(li);
    li.append(div);
    li.draggable = true;
    li.classList.add('task');
    
    form = document.querySelector('.form');
    input = document.querySelectorAll('input');
    removeButton = document.querySelectorAll('.remove');
}

addButton.addEventListener('click', (e) => {
    addInputLine();
    inputEnter();
    dragAndDrop();
    
    
    if (input.length > 5) {
        form.style.overflowY = 'auro';
        form.style.overflow = 'scroll';
        form.style.overflowX = 'hidden';
    } else
    form.style.overflowY = 'hidden';
    form.scrollTop = form.scrollHeight;
});

function inputEnter() {
    input.forEach(item => {
        item.addEventListener('keyup', (event) => {
            event.preventDefault();
            if (event.key == 'Enter') {
                if(item.value != ''){
                    item.readOnly = true;
                }
            }
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
                
                if (document.querySelectorAll('input').length == 0) {
                    addInputLine();
                    inputEnter();
                }
            });
        });
    });
}

function dragAndDrop() {
    let items = document.getElementsByTagName("li"), current = null;

    for (let i of items) {
        i.draggable = true;

        i.ondragstart = (ev) => {
            current = i;
        };

        i.ondragover = (evt) => { evt.preventDefault(); };

        i.ondrop = (evt) => {
            evt.preventDefault();
            if (i != current) {
                let currentPos = 0, droppedPos = 0;
                for (let it = 0; it < items.length; it++) {
                    if (current == items[it]) { currentPos = it; }
                    if (i == items[it]) { droppedPos = it; }
                }

                let flag = items[droppedPos].querySelector('input').value;
                items[droppedPos].querySelector('input').value = items[currentPos].querySelector('input').value;
                items[currentPos].querySelector('input').value = flag;
            }
        };
    }
}



sortButton.addEventListener('mouseover', (event) => {
    if (event.target.id == 'up')
        event.target.src = '/images/up_black.svg';
    else
        event.target.src = '/images/down_black.svg';
});

sortButton.addEventListener('mouseout', (event) => {
    if (event.target.id == 'up')
        event.target.src = '/images/up_gray.svg';
    else
        event.target.src = '/images/down_gray.svg';
});

sortButton.addEventListener('click', (event) => {
    let input = document.querySelectorAll('input');

    let data = []
    input.forEach((item) => {
        data.push(item.value);
    });

    if (event.target.id != 'up') {
        event.target.src = '/images/up_black.svg';
        event.target.id = 'up';
        data.sort();
    } else if (event.target.id != 'down') {
        event.target.src = '/images/down_black.svg';
        event.target.id = 'down';

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