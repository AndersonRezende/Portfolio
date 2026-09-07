/**
 * Anderson OS — Phase 2
 *
 * Minimal window manager:
 * - open / close
 * - minimize
 * - maximize / restore
 * - focus / z-index
 * - drag by title bar
 * - dock reflects open/minimized state
 *
 * This intentionally does not use Bootstrap Modal.
 * Bootstrap remains the visual/layout foundation while the desktop
 * has its own window-management behavior.
 */

const desktop = document.querySelector("#desktop");
const windowLayer = document.querySelector("#window-layer");
const dock = document.querySelector("#dock");

let zIndex = 100;
let windowOffset = 0;

const apps = {
  home: {
    title: "Home",
    icon: "bi-house-door-fill",
    width: 720,
    height: 470,
    content: `
      <div class="app-home">
        <div class="app-hero">
          <div class="app-avatar"><i class="bi bi-person-fill"></i></div>
          <div>
            <h2>Anderson Rezende</h2>
            <p>Backend Developer</p>
          </div>
        </div>

        <hr>

        <p>
          Bem-vindo ao meu portfólio interativo.
          A ideia é apresentar minha experiência como se você estivesse
          explorando um desktop Linux.
        </p>

        <div class="row g-3 mt-2">
          <div class="col-md-4">
            <div class="info-card">
              <i class="bi bi-code-slash"></i>
              <strong>Backend</strong>
              <span>PHP · Go · Python · Java · ShellScript · Kotlin</span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="info-card">
              <i class="bi bi-database"></i>
              <strong>Data</strong>
              <span>MySql · PostgreSQL · SQLite · Oracle · SQLServer · Redis</span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="info-card">
              <i class="bi bi-boxes"></i>
              <strong>Infra</strong>
              <span>Docker · Linux · Git · CI/CD · Nginx</span>
            </div>
          </div>
        </div>
      </div>
    `,
  },

  about: {
    title: "About Me",
    icon: "bi-person-fill",
    width: 650,
    height: 540,
    content: `
      <div class="app-content">
        <h2>Sobre</h2>
        <p class="lead">
          Desenvolvedor Backend focado em construir sistemas robustos,
          escaláveis e de alta disponibilidade.
        </p>

        <p>
          Desenvolvedor Backend Sênior com mais de 8 anos de experiência em sistemas corporativos, plataformas web e soluções de pagamentos de alta disponibilidade. Atua no desenvolvimento do EBANX Pay, plataforma que processa milhões de transações financeiras diárias em cerca de 15 países. Possui sólida experiência em arquiteturas de software, APIs, sistemas distribuídos, processamento assíncrono e integrações financeiras. Tem domínio de PHP, Domain-Driven Design (DDD), Clean Architecture e Arquitetura Hexagonal, além de participar ativamente de definições arquiteturais, code reviews e mentoring. É orientado a boas práticas de engenharia de software, com foco em desempenho, escalabilidade e evolução contínua de sistemas.
        </p>

        <div class="terminal-note">
          <span class="prompt">anderson@portfolio:~$</span> cat about.txt
        </div>
      </div>
    `,
  },

  projects: {
    title: "Projects",
    icon: "bi-folder-fill",
    width: 820,
    height: 540,
    content: `
      <div class="app-content">
        <h2>Projects</h2>
        <p class="text-secondary">Projetos públicos que desenvolvi com o intuito de aprimorar conhecimentos e/ou ajudar outros</p>

        <div class="project-grid">
          <article class="project-card">
            <div class="project-icon"><i class="bi bi-code-slash"></i></div>
            <div>
              <h3>Experimentos</h3>
              <p>Aplicações gerais com foco no aprimoramento de conhecimentos.
              <a href="https://github.com/AndersonRezende/GravitacaoUniversal">GravitacaoUniversal</a>
              <a href="https://github.com/AndersonRezende/Skirtshot_OS">Skirtshot_OS</a>
              <a href="https://github.com/AndersonRezende/GO_Hexagonal_Architecture">GO_Hexagonal_Architecture</a>
              </p>
              <div class="tags">
                <span>PHP</span><span>Go</span><span>C</span><span>C++</span><span>Rust</span><span>Java</span>
              </div>
            </div>
          </article>

          <article class="project-card">
            <div class="project-icon"><i class="bi bi-boxes"></i></div>
            <div>
              <h3>Pacotes/Libs</h3>
              <p>Bibliotecas e/ou códigos úteis.
              <a href="https://github.com/AndersonRezende/formula-executor">formula-executor</a>,
              <a href="https://github.com/AndersonRezende/infixa-posfixa">infixa-posfixa</a>,
              <a href="https://github.com/AndersonRezende/Ordenacao">Ordenacao</a>.
              </p>
              <div class="tags">
                <span>PHP</span><span>Java</span>
              </div>
            </div>
          </article>

          <article class="project-card">
            <div class="project-icon"><i class="bi bi-cpu"></i></div>
            <div>
              <h3>Embedded Projects</h3>
              <p>Projetos com ESP32, displays TFT e interfaces físicas. <a href="https://github.com/AndersonRezende/ESP32_Button_Box">ESP32_Button_Box</a></p>
              <div class="tags">
                <span>ESP32</span><span>Arduino</span><span>C++</span><span>IoT</span>
              </div>
            </div>
          </article>
          <article class="project-card">
            <div class="project-icon"><i class="bi bi-terminal"></i></div>
            <div>
              <h3>Automação</h3>
              <p>Projetos de automação, como o <a href="https://github.com/AndersonRezende/LinuxPostInstall">LinuxPostInstall</a>.</p>
              <div class="tags">
                <span>Shell Script</span><span>Python</span><span>Linux</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    `,
  },

  terminal: {
    title: "Terminal",
    icon: "bi-terminal-fill",
    width: 760,
    height: 470,
    content: `
      <div class="terminal-app">
        <div><span class="prompt">anderson@portfolio</span>:<span class="path">~</span>$ whoami</div>
        <div class="terminal-output">anderson_rezende</div>

        <div><span class="prompt">anderson@portfolio</span>:<span class="path">~</span>$ echo "Backend Developer"</div>
        <div class="terminal-output">Backend Developer</div>

        <div><span class="prompt">anderson@portfolio</span>:<span class="path">~</span>$ skills</div>
        <div class="terminal-output">Go  PHP  PostgreSQL  Docker  Linux  Git</div>

        <div class="terminal-cursor">
          <span class="prompt">anderson@portfolio</span>:<span class="path">~</span>$
          <span class="cursor"></span>
        </div>
      </div>
    `,
  },

  resume: {
    title: "Resume",
    icon: "bi-file-earmark-person-fill",
    width: 700,
    height: 500,
    content: `
      <div class="app-content">
        <h2>Resume</h2>
        <p class="text-secondary">
          Nesta janela entraremos com o currículo completo ou um visualizador
          de PDF na próxima etapa.
        </p>

        <div class="resume-placeholder">
          <i class="bi bi-file-earmark-pdf"></i>
          <strong>Curriculum Vitae</strong>
          <span>PDF viewer — próxima evolução</span>
        </div>
      </div>
    `,
  },

  github: {
    title: "GitHub",
    icon: "bi-github",
    width: 720,
    height: 460,
    content: `
      <div class="app-content">
        <div class="github-heading">
          <i class="bi bi-github"></i>
          <div>
            <h2>GitHub</h2>
            <p>Repositórios e projetos open source</p>
          </div>
        </div>

        <p>
          
        </p>

        <button class="btn btn-dark" id="github-external">
          <i class="bi bi-box-arrow-up-right"></i>
          Abrir GitHub
        </button>
      </div>
    `,
  },
};

function getOpenWindow(appId) {
  return document.querySelector(`.os-window[data-app="${appId}"]`);
}

function openApplication(appId) {
  const app = apps[appId];

  if (!app) return;

  const existingWindow = getOpenWindow(appId);

  if (existingWindow) {
    if (existingWindow.classList.contains("is-minimized")) {
      restoreWindow(existingWindow);
    }

    focusWindow(existingWindow);
    return;
  }

  createWindow(appId, app);
}

function createWindow(appId, app) {
  const windowElement = document.createElement("article");

  const offset = (windowOffset++ % 5) * 28;

  windowElement.className = "os-window";
  windowElement.dataset.app = appId;
  windowElement.style.width = `${app.width}px`;
  windowElement.style.height = `${app.height}px`;

  windowElement.innerHTML = `
    <header class="window-header">
      <div class="window-title">
        <i class="bi ${app.icon}"></i>
        <span>${app.title}</span>
      </div>

      <div class="window-controls">
        <button type="button" class="window-control minimize" title="Minimizar" aria-label="Minimizar">
          <i class="bi bi-dash"></i>
        </button>
        <button type="button" class="window-control maximize" title="Maximizar" aria-label="Maximizar">
          <i class="bi bi-square"></i>
        </button>
        <button type="button" class="window-control close" title="Fechar" aria-label="Fechar">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </header>

    <div class="window-body">
      ${app.content}
    </div>
  `;

  windowLayer.appendChild(windowElement);

  // Center the first window and cascade subsequent windows.
  const desktopRect = desktop.getBoundingClientRect();
  const maxX = Math.max(0, desktopRect.width - app.width - 30);
  const maxY = Math.max(28, desktopRect.height - app.height - 90);

  const centeredX = Math.max(15, (desktopRect.width - app.width) / 2);
  const centeredY = Math.max(40, (desktopRect.height - app.height) / 2);

  windowElement.style.left = `${Math.min(centeredX + offset, maxX)}px`;
  windowElement.style.top = `${Math.min(centeredY + offset, maxY)}px`;

  bindWindowEvents(windowElement);
  focusWindow(windowElement);
  updateDock(appId, "open");

  const githubButton = windowElement.querySelector("#github-external");
  if (githubButton) {
    githubButton.addEventListener("click", () => {
      window.open("https://github.com/", "_blank", "noopener,noreferrer");
    });
  }
}

function bindWindowEvents(windowElement) {
  windowElement.addEventListener("mousedown", () => {
    focusWindow(windowElement);
  });

  windowElement
    .querySelector(".close")
    .addEventListener("click", (event) => {
      event.stopPropagation();

      const appId = windowElement.dataset.app;
      windowElement.remove();
      updateDock(appId, "closed");

      const remaining = [...document.querySelectorAll(".os-window")]
        .filter((item) => !item.classList.contains("is-minimized"));

      if (remaining.length) {
        focusWindow(remaining.at(-1));
      }
    });

  windowElement
    .querySelector(".minimize")
    .addEventListener("click", (event) => {
      event.stopPropagation();
      minimizeWindow(windowElement);
    });

  windowElement
    .querySelector(".maximize")
    .addEventListener("click", (event) => {
      event.stopPropagation();
      toggleMaximize(windowElement);
    });

  enableDragging(windowElement);
}

function focusWindow(windowElement) {
  if (!windowElement || windowElement.classList.contains("is-minimized")) {
    return;
  }

  zIndex += 1;
  windowElement.style.zIndex = zIndex;

  document.querySelectorAll(".os-window").forEach((item) => {
    item.classList.remove("is-focused");
  });

  windowElement.classList.add("is-focused");

  updateDock(windowElement.dataset.app, "active");
}

function minimizeWindow(windowElement) {
  const appId = windowElement.dataset.app;

  windowElement.classList.add("is-minimized");
  updateDock(appId, "minimized");
}

function restoreWindow(windowElement) {
  windowElement.classList.remove("is-minimized");
  focusWindow(windowElement);
  updateDock(windowElement.dataset.app, "active");
}

function toggleMaximize(windowElement) {
  windowElement.classList.toggle("is-maximized");

  const maximizeButton = windowElement.querySelector(".maximize i");

  maximizeButton.className = windowElement.classList.contains("is-maximized")
    ? "bi bi-fullscreen-exit"
    : "bi bi-square";

  focusWindow(windowElement);
}

function updateDock(appId, state) {
  const dockItem = dock.querySelector(`[data-app="${appId}"]`);

  if (!dockItem) return;

  dockItem.classList.remove("is-open", "is-active", "is-minimized");

  if (state === "open") {
    dockItem.classList.add("is-open", "is-active");
  }

  if (state === "active") {
    dockItem.classList.add("is-open", "is-active");
  }

  if (state === "minimized") {
    dockItem.classList.add("is-open", "is-minimized");
  }
}

function enableDragging(windowElement) {
  const header = windowElement.querySelector(".window-header");

  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  header.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".window-controls")) return;
    if (windowElement.classList.contains("is-maximized")) return;

    dragging = true;

    const rect = windowElement.getBoundingClientRect();

    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;

    header.setPointerCapture(event.pointerId);
    focusWindow(windowElement);
  });

  header.addEventListener("pointermove", (event) => {
    if (!dragging) return;

    const desktopRect = desktop.getBoundingClientRect();
    const windowRect = windowElement.getBoundingClientRect();

    let x = event.clientX - desktopRect.left - offsetX;
    let y = event.clientY - desktopRect.top - offsetY;

    // Keep the title bar reachable.
    x = Math.max(0, Math.min(x, desktopRect.width - windowRect.width));
    y = Math.max(28, Math.min(y, desktopRect.height - 70));

    windowElement.style.left = `${x}px`;
    windowElement.style.top = `${y}px`;
  });

  header.addEventListener("pointerup", (event) => {
    dragging = false;

    if (header.hasPointerCapture(event.pointerId)) {
      header.releasePointerCapture(event.pointerId);
    }
  });

  header.addEventListener("pointercancel", () => {
    dragging = false;
  });
}

// Desktop icons + dock open applications.
document.querySelectorAll("[data-app]").forEach((element) => {
  element.addEventListener("click", () => {
    openApplication(element.dataset.app);
  });
});

// Escape closes the focused window.
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  const focused = [...document.querySelectorAll(".os-window.is-focused")]
    .at(-1);

  if (focused) {
    focused.querySelector(".close").click();
  }
});
