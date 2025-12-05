class HeroBannerVideo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['video-src'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'video-src') {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const videoSrc = this.getAttribute('video-src') || '';
    this.shadowRoot.innerHTML = `
        <style>
            .img-hero-mobile {
              width: 100%;
              height: auto;
              max-height:540px;
              height: 100vh;
           }
          .w100 {
            height:100%;
            width: 100%;
            object-fit: cover;
          }
            @media screen and (min-width: 2000px) {
                .img-hero-mobile{
                  max-height:900px
              }
            }
        @media(max-width: 991px) {
            .img-hero-mobile{
              height:100%;
              max-height:100%;
            }
        }
        </style>
        <div class="img-hero-mobile hero-banner-video">
          <video class="w100" playsinline muted loop autoplay>
            <source src="${videoSrc}" type="video/mp4">
          </video>
        </div>
      `;
  }
}

customElements.define('hero-banner-video', HeroBannerVideo);