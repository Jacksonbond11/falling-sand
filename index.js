let gravity = 20;

let celltype = "land";

document.addEventListener("DOMContentLoaded", function () {
  let grid = document.getElementById("grid");
  let isMouseDown = false;

  document.addEventListener("mousedown", function () {
    isMouseDown = true;
  });

  document.addEventListener("mouseup", function () {
    isMouseDown = false;
  });

  for (let i = 0; i < 1600; i++) {
    let cell = document.createElement("div");
    cell.setAttribute("id", i.toString());
    cell.addEventListener("mouseenter", function () {
      if (isMouseDown) {
        sandFall(i);
      }
    });

    cell.className = "cell";
    grid.appendChild(cell);
  }

  let button = document.getElementById("clear");
});

function sandFall(index) {
  if (celltype === "land") {
    function fall(i) {
      let currentCell = document.getElementById(i.toString());
      let nextIndex = i + 40;
      let nextCell = document.getElementById(nextIndex.toString());

      if (
        i < 1600 &&
        currentCell &&
        !currentCell.classList.contains("land") &&
        !currentCell.classList.contains("pending")
      ) {
        currentCell.classList.add("pending");
      }

      if (nextCell && !nextCell.classList.contains("land")) {
        currentCell.classList.remove("pending", "land");
        nextCell.classList.add("pending");

        setTimeout(() => fall(nextIndex), gravity);
      } else if (currentCell.classList.contains("pending")) {
        currentCell.classList.replace("pending", "land");
      }
    }

    fall(index);
  }

  //bullet logic
  if (celltype === "bullet") {
    function fall(i) {
      let currentCell = document.getElementById(i.toString());
      let nextIndex = i + 40;
      let nextCell = document.getElementById(nextIndex.toString());
      let leftCell = document.getElementById((i - 1).toString());
      let rightCell = document.getElementById((i + 1).toString());

      if (
        i < 1600 &&
        currentCell &&
        !currentCell.classList.contains("bullet") &&
        !currentCell.classList.contains("bulletpending")
      ) {
        currentCell.classList.add("bulletpending");
      }

      if (
        nextCell &&
        !nextCell.classList.contains("bullet") &&
        !nextCell.classList.contains("land")
      ) {
        currentCell.classList.remove("bullet", "bulletpending");
        nextCell.classList.add("bulletpending");

        setTimeout(() => fall(nextIndex), gravity);
      } else if (nextCell.classList.contains("land")) {
        currentCell.classList.remove("bulletpending", "bullet");
        nextCell.classList.remove("land");
        leftCell.classList.remove("land");
        rightCell.classList.remove("land");
      } else if (!nextCell || i >= 1600) {
        currentCell.classList.remove("bulletpending", "bullet");
      }
    }

    fall(index);
  }
}

//buttons
document.getElementById("btnland").addEventListener("click", () => {
  celltype = "land";
});
document.getElementById("btnbullet").addEventListener("click", () => {
  celltype = "bullet";
});
