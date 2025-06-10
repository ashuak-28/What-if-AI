const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
const numStars = 200;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * canvas.width,
  });
}

function moveStars() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < numStars; i++) {
    let star = stars[i];
    star.z -= 2;
    if (star.z <= 0) {
      star.z = canvas.width;
    }

    let k = 128.0 / star.z;
    let x = star.x - canvas.width / 2;
    let y = star.y - canvas.height / 2;

    x = x * k + canvas.width / 2;
    y = y * k + canvas.height / 2;

    if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
      let size = (1 - star.z / canvas.width) * 3;
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  requestAnimationFrame(moveStars);
}

moveStars();
