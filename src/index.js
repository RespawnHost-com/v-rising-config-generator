import Router from "./router";
import getConfig from "./utils/getConfig";

export const routes = new Router();
routes.add("Nav-Generator", () => import("./pages/generator"));
routes.add("Nav-ServerGameSettings", () =>
  import("./pages/serverGameSettings")
);

function setActiveNav(activeId) {
  const navBtns = document.querySelectorAll("nav button[data-route]") || [];
  navBtns.forEach((btn) => {
    btn.classList.remove("active");
    btn.removeAttribute("data-active");
  });
  const activeBtn = document.getElementById(activeId);
  if (activeBtn) {
    activeBtn.classList.add("active");
    activeBtn.setAttribute("data-active", "");
  }
}

routes.switch("Nav-Generator");

document.getElementById("generate-btn").onclick = () => {
  routes.switch("Nav-ServerGameSettings");
  setActiveNav("Nav-ServerGameSettings");
};

const navBtns = document.querySelectorAll("nav button[data-route]") || [];
navBtns.forEach((e) => {
  e.onclick = () => {
    routes.switch(e.getAttribute("id"));
    setActiveNav(e.getAttribute("id"));
  };
});

// document.querySelector("[data-share]").onclick = () => {
//   const loc = window.location.href;
//   console.log(loc, JSON.stringify(getConfig()));
//   const base = window.btoa(JSON.stringify(getConfig()));
//   console.log(base);
//   const config = encodeURIComponent(base);
//   console.log(config);
//   const url = `${loc}?config=${config}`;
//   console.log(url);
// };

document.querySelector("[data-copy]").onclick = () => {
  const copyBtn = document.querySelector("[data-copy]");
  const originalHTML = copyBtn.innerHTML;

  navigator.clipboard.writeText(JSON.stringify(getConfig(), null, 2)).then(() => {
    copyBtn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Copied!`;
    setTimeout(() => {
      copyBtn.innerHTML = originalHTML;
    }, 2000);
  });
};
