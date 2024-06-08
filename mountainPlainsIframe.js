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
        </style>`;
    }

    connectedCallback() {
        this.loadContent();
    }

    loadContent() {
        fetch('https://glencorahaskins.github.io/testing/mountain_plains_bbbrc_map_contained.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch HTML');
                }
                return response.text();
            })
            .then(html => {
                // Inject the HTML into the Shadow DOM
                this.shadowRoot.innerHTML = html;
            })
            .catch(error => {
                console.error('Error fetching HTML:', error);
            });
    }
}

customElements.define('mountain-plains-iframe', MountainPlainsIframe);
