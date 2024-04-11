let gravity = 20;

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
  function fall(i) {
    let currentCell = document.getElementById(i.toString());
    let nextIndex = i + 40;
    let nextCell = document.getElementById(nextIndex.toString());

    if (
      i < 1600 &&
      currentCell &&
      !currentCell.classList.contains("clicked") &&
      !currentCell.classList.contains("pending")
    ) {
      currentCell.classList.add("pending");
    }

    if (nextCell && !nextCell.classList.contains("clicked")) {
      currentCell.classList.remove("clicked", "pending");
      nextCell.classList.add("pending");

      setTimeout(() => fall(nextIndex), gravity);
    } else if (currentCell.classList.contains("pending")) {
      currentCell.classList.replace("pending", "clicked");
    }
  }

  fall(index);
}
