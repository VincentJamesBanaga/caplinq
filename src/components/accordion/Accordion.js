// Style
import './accordion.style.css';

// Image
import image from '../../assets/image.png';

// Components
import List from '../list/List';

class Accordion {
    constructor({ droppable = true }) {
        this.droppable = droppable;
        this.searchValue = '';
        this.activeIndex = null;
        this.accordion = this.createAccordion({});
    }

    createAccordion({ items = [], selected = [] }) {
        const accordion = document.createElement('div');
        accordion.classList.add('accordion');
        accordion.innerHTML = this.filteredItems(items).map((item, index) => this.createAccordionItem(item, selected, index)).join('');
        return accordion;
    }

    createAccordionItem(item, selected, index) {
        const list = new List({ items: item.childProducts, selected, checkbox: true, input: true });
        return `
            <div class="accordion-item" data-index="${index}" data-id="${item.id}" data-sku="${item.sku}">
                <div class="accordion-header">
                    <div class="accordion-details">
                        <div class="accordion-logo">
                            <img class="accordion-image" src="${image}" alt="logo" />
                        </div>
                        <div class="accordion-info">
                            <span class="accordion-name">${this.droppable ? item.name : `<b>${item.sku}</b>`}</span>
                            <span class="accordion-id">${this.droppable ? `SKU: ${item.sku ? item.sku : item.id}` : `${item.name}`}</span>
                        </div>
                    </div>
                    ${this.droppable ? `<span class="accordion-icon">&#8250;</span>` : `<div class="accordion-actions">
                        <input type="number" min='0' readonly="true" value="${item?.qty ?? 0}" class="list-input" /> 
                        <span class="list-delete fa">&#xf014;</span>
                    </div>`}
                </div>
                ${this.droppable ? `<div class="accordion-content">${list.render()}</div>` : ``}
            </div>
        `;
    }

    filteredItems(items) {
        return items.filter(({ name }) =>
            name.toLowerCase().includes(this.searchValue.toLowerCase())
        );
    }

    render(props = {}) {
        this.accordion = this.createAccordion(props);
        return this.accordion.outerHTML;
    }

}

export default Accordion;