// Style
import './modal.style.css';

// Helper
import { debounce } from '../../utils/main.helper';

class Modal {
    constructor({ title = "Modal Title", prefix = null, onSearch = () => { }, onSubmit = () => { } }) {
        this.title = title;
        this.prefix = prefix;
        this.onSearch = onSearch;
        this.onSubmit = onSubmit;
        this.modal = this.createModal();
    }

    createModal() {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-body">
                <div class="modal-header">
                    <div class="modal-title">
                        <label class="modal-title">${this.title}</label>
                        <span class="close-button">&times;</span>
                    </div>
                    <input type="text" placeholder="Search supplier" class="search-input" />
                </div>
                <div class="modal-content"></div>
                <div class="modal-footer">
                    <div class="modal-prefix">
                        ${this.prefix}
                    </div>
                    <div class="modal-suffix">
                        <button class="cancel-button">Cancel</button>
                        <button class="submit-button primary">Add</button>
                    </div>
                </div>
            </div>
        `;

        modal.querySelector('.close-button').addEventListener('click', () => this.hide());

        modal.querySelector('.cancel-button').addEventListener('click', () => this.hide());

        modal.querySelector('.search-input').addEventListener('input', debounce((event) => {
            if (typeof this.onSearch === 'function') this.onSearch(event.target.value);
        }, 500));

        return modal;
    }

    show() {
        this.modal.classList.add('show');
        setTimeout(() => {
            this.modal.classList.add('visible');
        }, 10);
    }

    hide() {
        this.modal.classList.remove('visible');
        this.modal.addEventListener('transitionend', () => {
            this.modal.classList.remove('show');
        }, { once: true });
    }

    render(content) {
        this.modal.querySelector('.modal-content').innerHTML = '';
        this.modal.querySelector('.modal-content').innerHTML = content;
    }
}

export default Modal;