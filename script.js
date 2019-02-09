const parseHTML = (domstring) => {
    const html = new DOMParser().parseFromString(domstring, 'text/html');
    return html.body.firstChild;
};
const arrNames = ['Маргарита', 'Пеперони', 'Цезарь', 'Салями', 'Охотничья', 'Гавайская', 'Барбекю', 'Грибная', 'Куриная',
    'Овощная', 'Веганская', 'Черная', 'Сырная', 'Фитнес', 'Чесночная', 'Сладкая', 'Ананас-грибы', 'Детская'];
const arrProducts = ['колбаса, помидоры, сыр, соус', 'салями, грибы, сыр, соус', 'салат, курица, помидоры, яйца',
    'салями, грибы, сыр, соус', 'колбаски, помидоры, сыр, грибы', 'овощи, соус, сыр', 'соус, колбаса, ветчина, помидор, зелень',
    'грибы, соус, салями, сыр', 'курица, соус, ананас, зелень', 'помидор, кукуруза, горох, соус, сыр', 'зелень, соус, тофу',
    'чернила корокатицы, колбаса, помидор, сыр', 'сыр, соус, тесто', 'овощи, сметана, нежирный сыр', 'чеснок, перец чили, колбаса, соус',
    'фрукты, мороженое, желе, крем', 'ананас, грибы, сыр, соус', 'сыр, кетчуп, куриное филе'];
const arrPrice = ['100грн.', '110грн.', '200грн.', '130грн.', '220грн.', '115грн.', '150грн.', '250грн.', '170грн.',
    '160грн.', '125грн.', '185грн.', '235грн.', '145грн.', '190грн.', '205грн.', '105грн.', '165грн.'];
const arrCalories = ['60ккл', '63ккл', '62ккл', '61ккл', '65ккл', '60ккл', '67ккл', '69ккл', '70ккл', '63ккл', '69ккл', '71ккл', '67ккл',
    '60ккл', '60ккл', '60ккл', '60ккл', '60ккл'];
const arrImg = ['img/pizza-1.jpg', 'img/pizza-2.jpg', 'img/pizza-3.jpg', 'img/pizza-1.jpg', 'img/pizza-2.jpg', 'img/pizza-3.jpg',
    'img/pizza-1.jpg', 'img/pizza-2.jpg', 'img/pizza-3.jpg', 'img/pizza-1.jpg', 'img/pizza-2.jpg', 'img/pizza-3.jpg',
    'img/pizza-1.jpg', 'img/pizza-2.jpg', 'img/pizza-3.jpg', 'img/pizza-1.jpg', 'img/pizza-2.jpg', 'img/pizza-3.jpg'];
const cards = document.getElementsByClassName('cards')[0];
const arrPizza = [];
const buttonGrid = document.getElementById('sort__grid');
const buttonColumn = document.getElementById('sort__column');
const filter = document.getElementsByClassName('filters')[0];
const ingredientSearch = document.getElementById('ingredient__search');
const priceSearchUp = document.getElementById('price__search-up');
const priceSearchDown = document.getElementById('price__search-down');
const nameSearchUp = document.getElementById('name__search-up');
const nameSearchDown = document.getElementById('name__search-down');

function Pizza(name, price, consist, calorific, img) {
    this.name = name;
    this.price = price;
    this.consist = consist;
    this.calorific = calorific;
    this.img = img;
}

const createArrPizza = () => {
    for (let i = 0; i < 18; i++) {
        arrPizza.push(new Pizza(arrNames[i], arrPrice[i], arrProducts[i], arrCalories[i], arrImg[i]));
    }
};

const createCardPizza = () => {
    cards.classList.remove('col');
    if (cards.hasChildNodes()) {
        [...document.getElementsByClassName('card')].forEach((item) => item.remove());
    }
    for (let i = 0; i < 18; i++) {
        const card = `<div class="card">
            <div class="card__img">
                <img src = ${arrPizza[i].img}  alt="pizza">
            </div>
            <div class="card__description">
                <p class="name">${arrPizza[i].name}</p>
                <p class="consist">${arrPizza[i].consist}</p>
                <p class="calorific">${arrPizza[i].calorific}</p>
                <p class="price">${arrPizza[i].price}</p>
            </div>
        </div>`;
        cards.appendChild(parseHTML(card));
    }
};
const createCardPizzaForColumn = () => {
    createCardPizza();
    const card = [...document.getElementsByClassName('card')];
    card.forEach((item) => {
            item.style.display = 'flex';
            item.style.width = '400px';
        }
    );
    const consists = [...document.getElementsByClassName('consist')];
    consists.forEach((item) => item.style.display = 'none');
    const calorifics = [...document.getElementsByClassName('calorific')];
    calorifics.forEach((item) => item.style.display = 'none');
    const cardDescription = [...document.getElementsByClassName('card__description')];
    cardDescription.forEach((item) => item.style.display = 'flex');
    cards.classList.add('col');
};

const showSearch = (filter) => {
    const search = document.getElementsByClassName(filter)[0];
    search.style.display = 'flex';
};

const filters = (input, arr) => {
    const inputs = document.getElementById(input).value;
    const array = [...document.getElementsByClassName(arr)];
    array.forEach((item) => {
        item.parentNode.parentNode.style.display = 'block';
        if (item.innerText.toLowerCase().indexOf(inputs.toLowerCase()) === -1) {
            item.parentNode.parentNode.style.display = 'none';
        }
    });
};
const sortPriceIncrease = (firsItem, nextItem) => parseInt(firsItem.price) - parseInt(nextItem.price);
const sortPriceDecrease = (firsItem, nextItem) => parseInt(nextItem.price) - parseInt(firsItem.price);

const sortNameIncrease = (firsItem, nextItem) => firsItem.name.toLowerCase().localeCompare(nextItem.name.toLowerCase());
const sortNameDecrease = (firsItem, nextItem) => nextItem.name.toLowerCase().localeCompare(firsItem.name.toLowerCase());

const sorting = (sort) => {
    [...document.getElementsByClassName('card')].forEach((item) => item.remove());
    arrPizza.sort(sort);
    createCardPizzaForColumn();
};

window.onload = () => {
    createArrPizza();
    buttonGrid.addEventListener('click', () => {
        if (filter.hasChildNodes()) {
            document.getElementsByClassName('filters__column')[0].style.display = 'none';
        }
        showSearch('filters__ingredient');
        createCardPizza();
    });
    buttonColumn.addEventListener('click', () => {
        if (filter.hasChildNodes()) {
            document.getElementsByClassName('filters__ingredient')[0].style.display = 'none';
        }
        showSearch('filters__column');
        createCardPizzaForColumn();
    });
    ingredientSearch.addEventListener('click', () => filters('ingredient', 'consist'));
    priceSearchUp.addEventListener('click', () => sorting(sortPriceIncrease));
    priceSearchDown.addEventListener('click', () => sorting(sortPriceDecrease));
    nameSearchUp.addEventListener('click', () => sorting(sortNameIncrease));
    nameSearchDown.addEventListener('click', () => sorting(sortNameDecrease));
};