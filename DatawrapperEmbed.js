class DatawrapperEmbed extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const htmlUrl = this.getAttribute('data-url');
        if (htmlUrl) {
            this.fetchAndRenderHTML(htmlUrl);
        }
    }

    async fetchAndRenderHTML(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const htmlContent = await response.text();
            this.renderHTML(htmlContent);
        } catch (error) {
            console.error('Error fetching the HTML content:', error);
        }
    }

    renderHTML(htmlContent) {
        this.shadowRoot.innerHTML = htmlContent;
        this.executeDatawrapperRender();
    }

    executeDatawrapperRender() {
        if (window.datawrapper && window.datawrapper.render) {
            const embedCodes = {
                "embed-method-responsive": "<iframe title=\"\" aria-label=\"Map\" id=\"datawrapper-chart-XhkW4\" src=\"https://datawrapper.dwcdn.net/XhkW4/1/\" scrolling=\"no\" frameborder=\"0\" style=\"width: 0; min-width: 100% !important; border: none;\" height=\"409\" data-external=\"1\"></iframe><script type=\"text/javascript\">!function(){\"use strict\";window.addEventListener(\"message\",(function(a){if(void 0!==a.data[\"datawrapper-height\"]){var e=document.querySelectorAll(\"iframe\");for(var t in a.data[\"datawrapper-height\"])for(var r=0;r<e.length;r++)if(e[r].contentWindow===a.source){var i=a.data[\"datawrapper-height\"][t]+\"px\";e[r].style.height=i}}}))}();\n</script>",
                "embed-method-iframe": "<iframe title=\"\" aria-label=\"Map\" id=\"datawrapper-chart-XhkW4\" src=\"https://datawrapper.dwcdn.net/XhkW4/1/\" scrolling=\"no\" frameborder=\"0\" style=\"border: none;\" width=\"600\" height=\"409\" data-external=\"1\"></iframe>",
                "embed-method-web-component": "<div style=\"min-height:409px\"><script type=\"text/javascript\" defer src=\"https://glencorahaskins.github.io/testing/DatawrapperEmbed.js\" charset=\"utf-8\"></script><noscript><img src=\"https://datawrapper.dwcdn.net/XhkW4/full.png\" alt=\"\" /></noscript></div>"
            };

            window.datawrapper.render({
                chart: {
                    id: 'XhkW4',
                    publicUrl: 'https://datawrapper.dwcdn.net/XhkW4/',
                    metadata: {
                        publish: {
                            "embed-height": 409
                        }
                    },
                    title: '',
                    embedCodes
                }
            });
        }
    }
}

customElements.define('datawrapper-embed', DatawrapperEmbed);
