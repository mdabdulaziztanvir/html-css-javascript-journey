const learningCavas = /** @type {HTMLCanvasElement} */ (
  document.getElementById("learningCavas")
);

const ctx = learningCavas.getContext("2d");
function draw() {
  // beginpath
  // path method
  // close path
  // stroke
  // fill

  ctx.beginPath();
  ctx.moveTo(75, 50);
  ctx.lineTo(100, 75);
  ctx.lineTo(75, 25);
  ctx.lineTo(75, 50);
  ctx.stroke();
}

draw();
let isDrawing = false;
learningCavas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

learningCavas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  ctx.lineWidth = 6;
  ctx.lineCap = "round";

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

learningCavas.addEventListener("mouseup", () => {
  isDrawing = false;
});
const downloadCanvasButton = document.getElementById("downloadCanvasButton");
const plainDate = Temporal.Now.instant();
downloadCanvasButton.addEventListener("click", () => {
  learningCavas.toBlob((blob) => {
    // console.log(blob);
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${plainDate}-canvas.png`;
    a.click();
    URL.revokeObjectURL(url);
  }, "image/png");
});
// console.log(downloadCanvas);
console.log(plainDate.toString());
