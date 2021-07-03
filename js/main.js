container = createMainContainer();

const divArr = createFlexBox();
const [div_1, div_2, div_3, div_4] = divArr;

class Store {
    constructor(storeName, inventory) {
        this.storeName = storeName;
        this.inventory = inventory;
    }
    addItem(id) {
        if(!this.inventory[id]) {
            this.inventory[id] = {};
            this.inventory[id].id = id;
            this.inventory[id].quantity = 1;
            this.inventory[id].td = findClearTd(1);
            addItemInTable(this.inventory[id].id, this.inventory[id].td);
        }
        else {
            this.inventory[id].quantity++;
            addIndex(this.inventory[id].quantity, this.inventory[id].td);
        }
    }

    hasItem(id) {
        return Boolean(this.inventory[id]);
    }

   delItem(id) {
       if(!this.inventory[id]) {
       }
       else if(this.inventory[id].quantity === 1) {
           deleteItemInTable(this.inventory[id].td);
           delete this.inventory[id];
           return;
       }
       else {
       this.inventory[id].quantity--;
       deleteIndex(this.inventory[id].quantity, this.inventory[id].td);
       }
   }
}

class PlayerStats {
    constructor(playerName, inventory, credits) {
        this.playerName = playerName;
        this.inventory = inventory;
        this.credits = credits;
    }

    addItem(id) {
        if(!this.inventory[id]) {
            this.inventory[id] = {};
            this.inventory[id].id = id;
            this.inventory[id].quantity = 1;
            this.inventory[id].td = findClearTd(0);
            addItemInTable(this.inventory[id].id, this.inventory[id].td);
        }
        else {
            console.log('добавление индекса');
            this.inventory[id].quantity++;
            addIndex(this.inventory[id].quantity, this.inventory[id].td);
        }
    }

     hasItem(id) {
         return Boolean(this.inventory[id]);
     }

    delItem(id) {
        if(!this.inventory[id]) {
        }
        else if(this.inventory[id].quantity === 1) {
            deleteItemInTable(this.inventory[id].td);
            delete this.inventory[id];
            return;
        }
        else {
        this.inventory[id].quantity--;
        deleteIndex(this.inventory[id].quantity, this.inventory[id].td);
        }
    }

    buy(td) {
        // if (parseInt(td.getAttribute('id') < 101)) {
        //     return;
        // }
        const item = arrOfItems.find(elem =>{
          return  elem.src === td.firstElementChild.getAttribute('src')});
            console.log(item);
        const isNotValued = this.credits < item.cost;
            if(isNotValued) {

            }
            else {
                console.log(this.credits);
                this.credits -= item.cost;
                div_2.querySelector('.coin-text').textContent = `Credits: ${this.credits}`;
                testStore.delItem(item.id);
                testPlayer.addItem(item.id);
                if(this.credits < item.cost) {
                    div_4.children[1].classList.add('disabled');
                }
            }
    }

    sell(td) {
        // if (parseInt(td.getAttribute('id') > 100)) {
        //     return;
        // }
        console.log(td);
        const item = arrOfItems.find(elem =>{
          return  elem.src === td.firstElementChild.getAttribute('src')});
             this.credits += item.cost;
            div_2.querySelector('.coin-text').textContent = `Credits: ${this.credits}`;
            testStore.addItem(item.id);
            testPlayer.delItem(item.id);       
    }
}

class Item {
    constructor(id, name, src, cost) {
        this.id = id;
        this.name = name;
        this.src = src;
        this.cost = cost;
    }
}

const testPlayer = new PlayerStats ("TestPlayer", {}, 1000);

const testStore = new Store("TestStore", {});

const arrOfItems = [
    sword = new Item('sword', 'id_0', 'img/sword.png', 150),
    shield = new Item('shield', 'id_1', 'img/shield.png', 100)
]

addFragment(div_3,
    createButton('btn-start', 'Открыть магазин', joinShop, div_3)
);

function createMainContainer() {
    console.log('Создание главного контейнера');
    const background = document.createElement('div');
    const container = document.createElement('div');

    // background.classList.add('container');
    background.classList.add('background');

container.classList.add('container');
container.classList.add('main-container');
document.body.appendChild(background);
background.appendChild(container);
// background.style.backgroundImage = 'url(img/shield.png)';

return container;
}

function createFlexBox() {
    console.log('Создание дочерних контейнеров');
    const divArr = [];
    for(i = 0;i < 4;i++){
        const div = document.createElement('div');
        div.classList.add('container');
        div.classList.add('container-child');
        div.setAttribute('id', `container-${i}`);
        container.appendChild(div);
        divArr[i] = div;
    }
    return divArr;
}

function createButton(btnClass, text, func) {
    console.log('Создание кнопки: ' + btnClass);

    const btn = document.createElement('btn');

    btn.classList.add(btnClass);
    btn.textContent = text;

    btn.addEventListener('click', func);

    return btn;
}

let index = 0;

let choseTab;
function joinShop() {
    // let choseTab;
    console.log('Загрузка магазина');

    clearContainer(div_3);

    // addFragment(div_3,
    //     createDiv('shop-div'),
    //     createDiv('shop-div-1'));

    addFragment(div_2, 
        createCoinDiv());

     addFragment(div_3,
         createInventoryDiv(),
         createShopDiv());

         function goBuy() {
            if (div_4.children[1].classList.contains('disabled')) {
                return;
             }
             testPlayer.buy(choseTab);
         }

         function goSell() {
            if (div_4.children[0].classList.contains('disabled')) {
                return;
             }
            testPlayer.sell(choseTab);
         }
    
    addFragment(div_4,
        // createImput(),
        createButton('down-button', 'Продать предмет', goSell),
        createButton('down-button', 'Купить предмет', goBuy),
        
        )

        div_4.children[0].classList.add('disabled');
        div_4.children[1].classList.add('disabled');

        testPlayer.addItem(arrOfItems[0].id);
        testPlayer.addItem(arrOfItems[0].id);

        testPlayer.addItem(arrOfItems[1].id);
        testPlayer.addItem(arrOfItems[1].id);
        testPlayer.addItem(arrOfItems[1].id);
        testPlayer.addItem(arrOfItems[1].id);

        testStore.addItem(arrOfItems[0].id);
        testStore.addItem(arrOfItems[1].id);
        testStore.addItem(arrOfItems[0].id);
        testStore.addItem(arrOfItems[1].id);

        testStore.addItem(arrOfItems[0].id);
        testStore.addItem(arrOfItems[0].id);
        testStore.addItem(arrOfItems[0].id);
        testStore.addItem(arrOfItems[0].id);
        testStore.addItem(arrOfItems[0].id);
        testStore.addItem(arrOfItems[0].id);
        testStore.addItem(arrOfItems[0].id);
        testStore.addItem(arrOfItems[0].id);
        testStore.addItem(arrOfItems[0].id);
        testStore.addItem(arrOfItems[0].id);
        testStore.addItem(arrOfItems[0].id);
        testStore.addItem(arrOfItems[0].id);

        // testPlayer.delItem(arrOfItems[0].id);

        // testPlayer.delItem(arrOfItems[1].id);
        //  testPlayer.addItem(arrOfItems[0].name);
        // testPlayer.addItem(arrOfItems[1]);
        // testPlayer.addItem(arrOfItems[0]);

        // addItemInInventory(findClearTd(0));
        
        // addItemInTable(arrOfItems[0], findClearTd(0));
        // addItemInTable(arrOfItems[0], findClearTd(0));
        // addItemInTable(arrOfItems[1], findClearTd(0));
        // addItemInTable(arrOfItems[0], findClearTd(0));

        // addItemInTable(arrOfItems[0], findClearTd(1));
        // addItemInTable(arrOfItems[1], findClearTd(1));
        // addItemInTable(arrOfItems[0], findClearTd(1));
        // addItemInTable(arrOfItems[1], findClearTd(1));
}

function clearContainer(div) {
    console.log('Очищение контейнера');
    const elemArray = Array.from(div.children);
    elemArray.forEach(vaule => {
        div.removeChild(vaule);
    })
}

function addFragment(div) {
    console.log('Создание фрагмента');

    const fragment = document.createDocumentFragment();
    const elemArr = Array.from(arguments);

    elemArr.forEach((value, key) => {
        if (!key) return;
        fragment.appendChild(value);
    })
    console.log('Добавление фрагмента');

    div.appendChild(fragment);
}

function createText(txtClass, text) {
    console.log('Создание текста');

    const txt = document.createElement('p');

    txt.classList.add(txtClass);
    txt.textContent = text;

    return text;
}

function createInventoryDiv() {
    console.log('Создание окна инвентаря ');
    
    const div = createDiv('menu-div');

    const table = createTable('menu-table', 'Инвентарь', 10, 10);
    
    // table.addEventListener('click', e => e.target.classList.toggle('choseTd'));
    table.addEventListener('click', e => choseTd(e));

    div.appendChild(table);

    return div;
}

function createShopDiv() {
    console.log('Создание окна магазина ');
    
    const div = createDiv('menu-div');

    const table = createTable('menu-table', 'Магазин', 10, 10);

    table.addEventListener('click', e => choseTd(e));

    div.appendChild(table);

    return div;
}

  function createDiv(divClass) {
    const div = document.createElement('div');

    div.classList.add('container');
    div.classList.add(divClass);

     return div;
  }

  function createTable(tableClass, text, x, y) {
    const table = document.createElement('table');

    table.classList.add(tableClass);

    const head = document.createElement('thead');

    head.textContent = text;
    table.appendChild(head);

    while (x) {
        const tr = document.createElement('tr');
        let newY = y;
        while (y) {
            const td = document.createElement('td');
            index++;
            td.setAttribute('id', index + 'id');
            // td.textContent = index;
            tr.appendChild(td);
            y--;
        }
        table.appendChild(tr);
        x--;
        y = newY;
    }


     return table;
  }


  function choseTd(e) {
    let target;
    if (e.target.tagName === "TD") {
       target = e.target;
    }
    else if (e.target.tagName === "DIV") {
        target = e.target.parentElement;
     }
     else if (e.target.tagName === "P") {
        target = e.target.parentElement.parentElement;
     }
     else {return};
    //  const item = arrOfItems.find(elem =>{
    //     return  elem.src === target.firstElementChild.getAttribute('src')});
    //   const isNotValued = testPlayer.credits < item.cost;
    //   console.log(isNotValued);
    //   if(isNotValued) {
    //     div_4.children[1].classList.add('disabled');
    //   }
    if(!target.classList.contains('choseTd')) {
    //     let parseFloat;
    //     console.log(parseInt(e.target.getAttribute('id')));
    //     if(parseInt(e.target.getAttribute('id')) <= 100) {
    //     tdArr = Array.from(div_3.firstElementChild.querySelector('table').children);
    // }
    //     else {
    //     tdArr = Array.from(div_3.children[1].querySelector('table').children);
    //     }
         if(parseInt(target.getAttribute('id')) <= 100) {
             if(target.firstElementChild) {
            div_4.children[0].classList.remove('disabled');
            div_4.children[1].classList.add('disabled');
            // choseTab = target;
        }
            else {div_4.children[0].classList.add('disabled');
            div_4.children[1].classList.add('disabled');}
            // choseTab = target;
         }
         else {
            if(target.firstElementChild){
        const item = arrOfItems.find(elem =>{
        return  elem.src === target.firstElementChild.getAttribute('src')});
      const isNotValued = testPlayer.credits < item.cost;
      if(isNotValued) {
        div_4.children[1].classList.add('disabled');
        div_4.children[0].classList.add('disabled');
      } else {
            div_4.children[1].classList.remove('disabled');
            div_4.children[0].classList.add('disabled');
}}
            else {
                div_4.children[1].classList.add('disabled');
            div_4.children[0].classList.add('disabled');
            }
            // choseTab = target;
         }
    const tdArr = Array.from(div_3.firstElementChild.querySelector('table').children);
    const tdArr2 = Array.from(div_3.children[1].querySelector('table').children);
        tdArr.forEach(elem =>{
            const elemArr = Array.from(elem.children);
            elemArr.forEach(elem =>
                elem.classList.remove('choseTd') )
            });
            tdArr2.forEach(elem =>{
                const elemArr = Array.from(elem.children);
                elemArr.forEach(elem =>
                    elem.classList.remove('choseTd') )
                });
    }
    choseTab = target;
    target.classList.toggle('choseTd');
  }

  function findClearTd(x) {
    let clearTd;
    const arrTr = Array.from(div_3.children[x].querySelector('table').children);
    arrTr.forEach(elem => {
        if(!clearTd) {
            const arrElem = Array.from(elem.children);
            arrElem.forEach(elem => {
            if(!clearTd) {
            if (!elem.firstElementChild) {
                clearTd = elem;
            } }
        }) }
    })
    return clearTd;
  }

  function addItemInTable(id, td) {
      const img = document.createElement('div');
      img.classList.add('tableImg');
      img.style.backgroundImage = `url(${arrOfItems.find(elem => elem.id === id).src})`;
    //   img.setAttribute('id', arrOfItems.find(elem => elem.id === id).src);
      img.setAttribute('src', arrOfItems.find(elem => elem.id === id).src);
      td.appendChild(img);
  }

//   function addItemInInventory(table) {
//       for (item in testPlayer.inventory) {
//         const img = document.createElement('img');
//         img.classList.add('tableImg');
//         img.setAttribute('src', item.src);
//         table.appendChild(img);
//         if(item.quantity > 1) {
//             const p = document.createElement('p');
//             p.classList.add('quantity');
//             p.textContent = item.quantity;
//             table.appendChild(p);
//         }
//       }
//   }


function addIndex(value, td) {
    let index;
    index = td.querySelector('.index');
    if(!index) {
        index = document.createElement('p');
        index.classList.add('index');
        td.firstElementChild.appendChild(index);
        // td.insertAdjacentElement('afterbegin', index);
    }
    index.textContent = value;
}

function deleteItemInTable(td) {
    const item = td.querySelector('.tableImg');
    td.removeChild(item);
    console.log('удаление');
    if( parseInt(td.getAttribute('id')) < 101) {
        div_4.children[0].classList.add('disabled');
    }
    else {
        div_4.children[1].classList.add('disabled');
    }
}

function deleteIndex(value, td) {
    index = td.querySelector('.index');
    if(value > 1) {
        index.textContent = value;
    }
    else {
        td.firstElementChild.removeChild(index);
    }
}

function createCoinDiv() {
    const div = document.createElement('div');
    // div.classList.add('container');
    div.classList.add('coin-div');
    const text = document.createElement('p');
    text.classList.add('coin-text');
    text.textContent = `Credits: ${testPlayer.credits}`;
    div.appendChild(text);
    return div;
}