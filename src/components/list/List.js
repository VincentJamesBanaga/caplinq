// Style
import './list.style.css';

class List {
    constructor({ items = [] }) {
        this.searchValue = '';
        this.items = items;
        this.ul = this.createListItems();
    }

    createListItems() {
        const ul = document.createElement('ul');
        ul.classList.add('list-items');
        this.filteredItems().forEach(({ name }) => {
            const li = this.createListItem(name);
            ul.appendChild(li);
        });

        return ul;
    }

    createListItem(name) {
        const li = document.createElement('li');
        li.classList.add('list-item');
        li.innerHTML = `<span>${name}</span> <span>&#8250;</span>`;
        return li;
    }

    filteredItems() {
        return this.items.filter(({ name }) =>
            name.toLowerCase().includes(this.searchValue.toLowerCase())
        );
    }

    render() {
        this.ul = this.createListItems();
        return this.ul;
    }
}

export default List;