// Style
import './notification.style.css'

class Notification {
    constructor() {
        this.notification = this.createNotification();
    }

    createNotification(type = 'success', message = '') {
        const notification = document.createElement("div");
        notification.classList.add(`notification`);
        notification.classList.add(`${type}`);

        const messageElement = document.createElement("span");
        messageElement.innerText = message;

        const closeButton = document.createElement("span");
        closeButton.innerHTML = "&times;";
        closeButton.classList.add("close-btn");
        closeButton.addEventListener("click", () => {
            notification.style.opacity = "0";
            setTimeout(() => {
                notification.remove();
            }, 500);
        });

        notification.appendChild(messageElement);
        notification.appendChild(closeButton);

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = "1";
        }, 10);

        setTimeout(() => {
            notification.style.opacity = "0";
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);

        return notification
    }

    render(props = {}) {
        this.notification = this.createNotification(props.type, props.message)
        return this.notification
    }
}

export default Notification