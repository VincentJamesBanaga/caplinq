class Accordion {
    constructor(container, items) {
        this.container = container;
        this.items = items;
        this.activeIndex = null;
        this.accordion = this.createAccordion;
    }

    createAccordion() {
        const accordion = document.createElement('div');
        accordion.classList.add('accordion');
        accordion.innerHTML = this.items.map(this.createAccordionItem).join('');

        // Events
        const headers = accordion.querySelectorAll('.accordion-header');
        headers.forEach((header) => {
            header.addEventListener('click', () => {
                const index = parseInt(header.dataset.index);
                this.toggleItem(index);
            });
        });

        return accordion;
    }

    createAccordionItem(item, index) {
        return `
            <div class="accordion-item">
                <button class="accordion-header" data-index="${index}">
                    ${item.title}
                    <span class="accordion-icon">+</span>
                </button>
                <div class="accordion-content">
                    ${item.content}
                </div>
            </div>
        `;
    }


    toggleItem(index) {
        if (this.activeIndex === index) this.closeItem(index);
        else {
            if (this.activeIndex !== null) this.closeItem(this.activeIndex);
            this.openItem(index);
        }
    }

    openItem(index) {
        const elements = this.getItemElements(index);
        elements.header.classList.add('active');
        elements.content.classList.add('active');
        elements.icon.textContent = '-';
        this.activeIndex = index;
    }

    closeItem(index) {
        const elements = this.getItemElements(index);
        elements.header.classList.remove('active');
        elements.content.classList.remove('active');
        elements.icon.textContent = '+';
        this.activeIndex = null;
    }

    getItemElements(index) {
        return {
            header: this.container.querySelectorAll('.accordion-header')[index],
            content: this.container.querySelectorAll('.accordion-content')[index],
            icon: this.container.querySelectorAll('.accordion-icon')[index]
        };
    }

    render() {
        return
    }

}