const cols = document.querySelectorAll(".col");

//Оновлюємо кольори по натисканню пробіла
document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() === "space") {
    setRendomColors();
  }
});

//функція делегування події
document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;
  if (type === "lock") {
    const node =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0];
    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyToClicboard(event.target.textContent);
  }
});

//функція генерації автомаичного кольору без використання бібліотеки chroma js
function generateRandomColor() {
  const hexCodes = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return "#" + color;
}

//функція для копіюваня хеш кольору
function copyToClicboard(text) {
  return navigator.clipboard.writeText(text);
}

//функція генерації кольору і присвоювання його для кожного елемента, додавання хеш кольорів в адресну строку, для подальшого копіювання для розповсюдження
function setRendomColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];
  cols.forEach((col, index) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    const button = col.querySelector("button");

    if (isLocked) {
      colors.push(text.textContent);
      return;
    }
    const color = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random();

    if (!isInitial) {
      colors.push(color);
    }

    text.textContent = color;
    col.style.background = color;
    setTextColor(text, color);
    setTextColor(button, color);
  });
  updateColorsHash(colors);
}

//метод адаптації кольору шрифта до фонового кольору
function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}


//функція для додавання кольору в масив
function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((col) => col.toString().substring(1))
    .join("-");
}



1
function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
}

setRendomColors(true);
