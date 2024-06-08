class MountainPlainsIframe extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `<style>
            :host {
                display: block;
                width: 100%;
                height: 100%;
            }
            iframe {
                width: 100%;
                height: 100%;
                border: none;
            }
        </style>`;
    }

    connectedCallback() {
        this.loadContent();
    }

    loadContent() {
        const iframe = document.createElement('iframe');
        iframe.src = 'https://glencorahaskins.github.io/bbb/mountain_plains_iframe.html';
        this.shadowRoot.appendChild(iframe);
    }
}

customElements.define('mountain-plains-iframe', MountainPlainsIframe);
