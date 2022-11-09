let form = document.querySelector('.form'),
sortButton = document.querySelector('.sort'), 
addButton = document.querySelector('.add');
let removeButton, input, inputLine, items, tasksListElement = document.querySelector(`.tasks-list`), counter = 0;

addButton.addEventListener('click', (e) => {
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
    inputEnter();
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
                item.readOnly = true;
                dragAndDrop();
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
            });
        });
    });

    
}
function dragAndDrop() {
    let items = document.getElementsByTagName("li"), current = null;

  // (B) MAKE ITEMS DRAGGABLE + SORTABLE
  for (let i of items) {
    // (B1) ATTACH DRAGGABLE
    i.draggable = true;
    
    // (B2) DRAG START - YELLOW HIGHLIGHT DROPZONES
    i.ondragstart = (ev) => {
      current = i;
      for (let it of items) {
        if (it != current) { it.classList.add("hint"); }
      }
    };
    
    // (B3) DRAG ENTER - RED HIGHLIGHT DROPZONE
    i.ondragenter = (ev) => {
      if (i != current) { i.classList.add("active"); }
    };

    // (B4) DRAG LEAVE - REMOVE RED HIGHLIGHT
    i.ondragleave = () => {
      i.classList.remove("active");
    };

    // (B5) DRAG END - REMOVE ALL HIGHLIGHTS
    i.ondragend = () => { for (let it of items) {
        it.classList.remove("hint");
        it.classList.remove("active");
    }};
 
    // (B6) DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
    i.ondragover = (evt) => { evt.preventDefault(); };
 
    // (B7) ON DROP - DO SOMETHING
    i.ondrop = (evt) => {
      evt.preventDefault();
      if (i != current) {
        let currentpos = 0, droppedpos = 0;
        for (let it=0; it<items.length; it++) {
          if (current == items[it]) { currentpos = it; }
          if (i == items[it]) { droppedpos = it; }
        }
        if (currentpos < droppedpos) {
          i.parentNode.insertBefore(current, i.nextSibling);
        } else {
          i.parentNode.insertBefore(current, i);
        }
      }
    };
  }
}



sortButton.addEventListener('mouseover', (event) => {
    if(event.target.id == 'up')
        event.target.src = '/images/up_black.svg';
    else
        event.target.src = '/images/down_black.svg';
});

sortButton.addEventListener('mouseout', (event) => {
    if(event.target.id == 'up')
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
        event.target.src = '/images/up_gray.svg';
        event.target.id = 'up';
        data.sort();
    } else if (event.target.id != 'down') {
        event.target.src = '/images/down_gray.svg';
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