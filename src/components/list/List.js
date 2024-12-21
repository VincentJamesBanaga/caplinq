// Style
import './list.style.css';

class List {
    constructor({ items = [], selected = [], checkbox = false, input = false }) {
        this.items = items;
        this.selected = selected;
        this.checkbox = checkbox;
        this.input = input;
        this.searchValue = '';
        this.ul = this.createListItems();
    }

    createListItems() {
        const ul = document.createElement('ul');
        ul.classList.add('list-items');
        this.filteredItems().forEach((items) => {
            const li = this.createListItem(items);
            ul.appendChild(li);
        });

        return ul;
    }

    createListItem({ id, name, sku }) {
        const selectedItem = this.selected.find(obj => obj.id === id);
        const li = document.createElement('li');
        li.setAttribute('data-id', id);
        li.setAttribute('data-name', name);
        li.setAttribute('data-sku', sku);
        li.classList.add('list-item');
        li.innerHTML = `
            <div class="list-details">
                ${this.checkbox ? `<input type="checkbox" ${selectedItem?.id ? 'checked' : ''}  class="list-checkbox" />` : ''}
                <div class="list-info">
                    <span class="list-name">${name}</span>
                    ${sku ? `<span class="list-id">SKU: ${sku}</span>` : ''}
                </div>
            </div>
            ${this.input ? `<input type="number" min='0' value='${selectedItem?.qty ?? 0}' class="list-input" />` : `<span>&#8250;</span>`}
        `;

        return li;
    }

    filteredItems() {
        return this.items.filter(({ name }) =>
            name.toLowerCase().includes(this.searchValue.toLowerCase())
        );
    }

    render() {
        this.ul = this.createListItems();
        return this.ul.outerHTML;
    }
}

export default List;