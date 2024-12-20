// Styles
import './main.style.css';

// Components
import Modal from './components/modal/Modal';
import List from './components/list/List';

// Data
import suppliers from './data/suppliers';

class App {
    constructor() {
        this._searchValue = '';

        // Initialize Components
        this.SupplierList = new List({ items: suppliers });
        this.POModal = new Modal({
            title: 'Browse',
            prefix: `<div class="product-selected">0 product selected</div>`,
            onSearch: (value) => {
                this.SupplierList.searchValue = value;
                this.POModal.render(this.SupplierList.render().outerHTML);
            }
        });
        this.POModal.render(this.SupplierList.ul.outerHTML);
    }

    render() {
        const main = document.createElement('main');
        main.innerHTML = `<label>Click anywhere to toggle modal</label>`;
        main.addEventListener('click', (event) => {
            if (!event.target.closest('.modal')) {
                this.POModal.modal.classList.contains('show') ? this.POModal.hide() : this.POModal.show();
            }
        });
        main.appendChild(this.POModal.modal);
        return main;
    }
}
const app = new App();
document.querySelector('#app').appendChild(app.render());