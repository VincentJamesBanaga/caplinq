// Styles
import './main.style.css';

// Components
import Modal from './components/modal/Modal';
import List from './components/list/List';
import Accordion from './components/accordion/Accordion';

// Data
import suppliers from './data/suppliers';
import products from './data/products';

class App {
    constructor() {
        this.products = products;
        this.selectedSupplier = {
            id: null,
            name: null
        }

        this.ProductList = new Accordion();
        this.SupplierList = new List({ items: suppliers });
        this.POModal = this.bindModal();
    }

    bindModal() {
        this.POModal = new Modal({
            prefix: `<div class="product-selected">0 product selected</div>`,
            onSearch: (value) => {
                this.SupplierList.searchValue = value;
                this.POModal.render(this.SupplierList.render());
            }
        });
        this.bindSuppliers();
        return this.POModal;
    }

    bindSuppliers() {
        this.selectedSupplier = { id: null, name: null };
        this.POModal.render(this.SupplierList.render());
        this.POModal.modal.querySelector('.list-items').addEventListener('click', (event) => {
            const target = event.target.closest('.list-item')
            if (target) {
                const id = target.getAttribute('data-id');
                const name = target.getAttribute('data-name');
                this.selectedSupplier = { id, name };
                setTimeout(() => {
                    this.bindProducts();
                }, 50);
            }
        })
    }

    bindProducts() {
        this.POModal.render(this.ProductList.render({
            items: this.products.data
                .filter((item) => item.supplierId === this.selectedSupplier.id)
                .sort((a, b) => a.name.localeCompare(b.name))
        }));

        this.POModal.modal.querySelector('.accordion').addEventListener('click', (event) => {
            const targetItem = event.target.closest('.accordion-item');
            const targetHeader = event.target.closest('.accordion-header');
            if (targetItem && targetHeader) {
                targetItem.classList.toggle('active');
            }
        });
    }

    render() {
        const main = document.createElement('main');
        main.innerHTML = `<label>Click anywhere to toggle modal</label>`;
        main.addEventListener('click', (event) => {
            if (!event.target.closest('.modal')) {
                this.bindSuppliers();
                this.POModal.show();
            }
        });
        main.appendChild(this.POModal.modal);
        return main;
    }
}
const app = new App();
document.querySelector('#app').appendChild(app.render());