const mobileBreakpoint = 480; // (px) Plugin is not activated on screens of less than this width
const delayLoadingByMs = 500; // (recommended!) Delay before loading preview after hovering on link

if (screen.width >= mobileBreakpoint) initPetrapixelPreviewPlugin();

function initPetrapixelPreviewPlugin() {
  const linkEls = document.querySelectorAll("a[href].pppp-link");
  linkEls.forEach((linkEl) => {
    let previewEl = document.createElement("div");
    previewEl.classList.add("pppp-preview");
    previewEl.innerHTML = `<iframe></iframe>`;
    previewEl.setAttribute("sandbox", "allow-same-origin");
    let waitABit;
    linkEl.addEventListener("mouseenter", () => {
      waitABit = setTimeout(() => {
        const thisPreviewEl = linkEl.querySelector(".pppp-preview");
        if (!thisPreviewEl) {
          linkEl.appendChild(previewEl);
          const iFrameEl = previewEl.querySelector("iframe");
          iFrameEl.setAttribute("src", linkEl.getAttribute("href"));
          previewEl.classList.add("pppp-preview--visible");
          previewEl.classList.add("pppp-preview--loading");
          iFrameEl.onload = () => {
            previewEl.classList.remove("pppp-preview--loading");
          };
          iFrameEl.onerror = () => {
            iFrameEl.setAttribute("src", "");
            previewEl.classList.remove("pppp-preview--visible");
          };
        } else {
          thisPreviewEl.classList.add("pppp-preview--visible");
        }
      }, delayLoadingByMs);
    });

    linkEl.addEventListener("mouseleave", () => {
      clearTimeout(waitABit);
      const thisPreviewEl = linkEl.querySelector(".pppp-preview");
      if (thisPreviewEl)
        thisPreviewEl.classList.remove("pppp-preview--visible");
    });
  });
}
