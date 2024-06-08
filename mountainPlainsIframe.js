class MountainPlainsIframe extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.loadContent();
    }

    async loadContent() {
        const url = 'https://raw.githubusercontent.com/glencorahaskins/testing/main/mountain_plains_bbbrc_map_contained.html';
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const html = await response.text();
            console.log('Fetched HTML content:', html);

            // Insert content into the shadow DOM
            this.shadowRoot.innerHTML = html;

        } catch (error) {
            console.error('Failed to fetch content:', error);
            this.shadowRoot.innerHTML = '<p>Failed to load content.</p>';
        }
    }
}

customElements.define('mountain-plains-iframe', MountainPlainsIframe);
