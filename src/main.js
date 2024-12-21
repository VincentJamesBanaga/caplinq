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
        this.page = 'browse';
        this.products = products;
        this.selectedSupplier = {
            id: null,
            name: null
        }
        this.ProductList = new Accordion({});
        this.SupplierList = new List({ items: suppliers });
        this.POModal = this.bindModal();
    }

    bindModal() {
        this.POModal = new Modal({
            prefix: `<div class="product-selected">0 product selected</div>`,
            onSearch: (value) => {
                if (this.page === 'browse') {
                    this.ProductList.searchValue = value;
                    this.bindProducts();
                } else {
                    this.SupplierList.searchValue = value;
                    this.bindSuppliers();
                }
            },
            onBack: () => {
                switch (this.page) {
                    case 'browse':
                        this.POModal.modal.querySelector('.search-input').classList.remove('hide');
                        break;
                    case 'products':
                        this.POModal.modal.querySelector('.search-input').classList.remove('hide');
                        this.page = 'browse';
                        this.bindSuppliers();
                        this.reset();
                        break;
                    case 'selection':
                        this.page = 'products';
                        this.POModal.modal.querySelector('.modal-title').innerHTML = this.selectedSupplier.name;
                        this.bindProducts();
                        break;
                    default:
                        break;
                }

            },
            onSubmit: () => {
                const productItems = this.POModal.modal.querySelectorAll('.list-item');
                if (productItems.length) {
                    const productSelected = Array.from(productItems).reduce((data, item) => {
                        if (item.querySelector('.list-checkbox:checked')) {
                            data.push({
                                qty: item.querySelector('.list-input').value,
                                sku: item.getAttribute('data-sku'),
                                name: item.getAttribute('data-name'),
                                id: item.getAttribute('data-id')
                            });
                        }
                        return data;
                    }, []);

                    if (!productSelected.length) return
                    const products = new Accordion({ droppable: false });
                    this.page = 'selection';
                    this.POModal.modal.querySelector('.modal-title').innerHTML = 'Selection';
                    this.POModal.modal.querySelector('.search-input').classList.add('hide');
                    this.POModal.render(products.render({ items: productSelected }));
                }
            }
        });
        this.POModal.modal.querySelector('label.modal-title').innerHTML = 'Browse';
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
                this.reset();
                this.page = 'products';
                this.POModal.modal.querySelector('.modal-title').innerHTML = name;
                this.POModal.modal.querySelector('.back-button').classList.remove('hide');
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
            if (targetItem && targetHeader) targetItem.classList.toggle('active');
            if (targetItem && event.target.closest('.list-checkbox')) {
                const checked = this.POModal.modal.querySelectorAll('.list-checkbox:checked');
                this.POModal.modal.querySelector('.product-selected').innerHTML = `${checked.length} product selected`;
            }
        });
    }

    reset() {
        this.POModal.modal.querySelector('.product-selected').innerHTML = `0 product selected`;
        this.POModal.modal.querySelector('.modal-title').innerHTML = 'Browse';
        this.POModal.modal.querySelector('.back-button').classList.add('hide');
        this.page = 'browse'
    }

    render() {
        const main = document.createElement('main');
        main.innerHTML = `<label label > Click anywhere to toggle modal</label > `;
        main.addEventListener('click', (event) => {
            if (!event.target.closest('.modal')) {
                this.bindSuppliers();
                this.reset();
                this.POModal.show();
            }
        });
        main.appendChild(this.POModal.modal);
        return main;
    }
}
const app = new App();
document.querySelector('#app').appendChild(app.render());