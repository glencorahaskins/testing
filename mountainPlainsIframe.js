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
            #content-container {
                width: 100%;
                height: 100%;
            }
        </style>`;
    }

    connectedCallback() {
        this.loadContent();
    }

    loadContent() {
        fetch('https://glencorahaskins.github.io/testing/mountain_plains_iframe.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch HTML');
                }
                return response.text();
            })
            .then(html => {
                // Create a container element
                const container = document.createElement('div');
                container.id = 'content-container';
                container.innerHTML = html;
                
                // Append the container to the Shadow DOM
                this.shadowRoot.appendChild(container);
            })
            .catch(error => {
                console.error('Error fetching HTML:', error);
            });
    }
}

customElements.define('mountain-plains-iframe', MountainPlainsIframe);
