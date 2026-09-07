/**
 * Anderson OS — Phase 1
 *
 * For now this file only handles desktop interactions.
 * Phase 2 will replace the alerts with the window manager.
 */

const clock = document.querySelector("#clock");
const desktopIcons = document.querySelectorAll(".desktop-icon");
const dockItems = document.querySelectorAll(".dock-item");

function updateClock() {
  const now = new Date();

  clock.textContent = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function openApplication(app) {
  /*
   * Temporary behavior.
   *
   * In Phase 2:
   *   openApplication("projects")
   *       -> creates/opens the Projects window
   */
  console.log(`Opening application: ${app}`);

  const names = {
    home: "Home",
    about: "About Me",
    projects: "Projects",
    terminal: "Terminal",
    resume: "Resume",
    github: "GitHub",
  };

  if (app === "github") {
    window.open(
      "https://github.com/AndersonRezende/",
      "_blank",
      "noopener,noreferrer"
    );
    return;
  }

  window.alert(
    `${names[app] ?? app}\n\n` +
    "Em progresso"
  );
}

desktopIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    openApplication(icon.dataset.app);
  });
});

dockItems.forEach((item) => {
  item.addEventListener("click", () => {
    document
      .querySelectorAll(".dock-item")
      .forEach((dockItem) => dockItem.classList.remove("active"));

    item.classList.add("active");
    openApplication(item.dataset.app);
  });
});

updateClock();
setInterval(updateClock, 1000);
