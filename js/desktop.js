const clock = document.querySelector("#clock");

function updateClock() {
  const now = new Date();

  clock.textContent = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

updateClock();
setInterval(updateClock, 1000);
