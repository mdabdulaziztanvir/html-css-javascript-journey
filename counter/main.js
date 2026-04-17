let count = 0;

function updateCDount() {
  document.getElementById("counter-0").innerHTML = count;
}

function increaseCount() {
  count++;
  updateCDount();
}
// function to reset count
function resetCount() {
  count = 0;
  updateCDount();
}
// function to decrease count
function decreaseCount() {
  count--;
  updateCDount();
}
// function that save the count variable to localstorage
function saveCount() {
  localStorage.setItem("count", count);
}
// load previous count
function loadCount() {
  let previosusSavedCount = localStorage.getItem("count");
  if (previosusSavedCount !== null) {
    count = Number(previosusSavedCount);
  }
  updateCDount();
}
