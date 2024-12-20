// Style
import './accordion.style.css';

// Image
import image from '../../assets/image.png';

// Components
import List from '../list/List';

class Accordion {
    constructor() {
        this.activeIndex = null;
        this.accordion = this.createAccordion({});
    }

    createAccordion({ items = [] }) {
        const accordion = document.createElement('div');
        accordion.classList.add('accordion');
        accordion.innerHTML = items.map((item, index) => this.createAccordionItem(item, index)).join('');
        return accordion;
    }

    createAccordionItem(item, index) {
        const list = new List({ items: item.childProducts, checkbox: true, input: true });
        return `
            <div class="accordion-item" data-index="${index}">
                <div class="accordion-header">
                    <div class="accordion-details">
                        <div class="accordion-logo">
                            <img class="accordion-image" src="${image}" alt="logo" />
                        </div>
                        <div class="accordion-info">
                            <span class="accordion-name">${item.name}</span>
                            <span class="accordion-id">SKU: ${item.id}</span>
                        </div>
                    </div>
                    <span class="accordion-icon">&#8250;</span>
                </div>
                <div class="accordion-content">
                    ${list.render()}
                </div>
            </div>
        `;
    }

    render(props = {}) {
        this.accordion = this.createAccordion(props);
        return this.accordion.outerHTML;
    }

}

export default Accordion;