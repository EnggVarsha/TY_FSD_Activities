// Page-level events
function pageLoaded() {
    alert("Page loaded!");
}
function pageUnloaded() {
    alert("Page closed!");
}
function pageResized() {
    alert("Window resized!");
}

// Sun onclick
function sunClicked() {
    document.getElementById("message").innerText = "☀️ Sun clicked!";
    const sun = document.getElementById("sun");
    sun.style.transform = "scale(1.2)";
    setTimeout(() => sun.style.transform = "scale(1)", 500);
}

// Tree hover
function treeHovered() {
    document.getElementById("message").innerText = "🌳 Tree hovered!";
    document.getElementById("tree").style.transform = "scale(1.1)";
}
function treeUnhovered() {
    document.getElementById("message").innerText = "Cursor left the tree.";
    document.getElementById("tree").style.transform = "scale(1)";
}

// Bird right-click
function birdRightClick(event) {
    event.preventDefault();
    document.getElementById("message").innerText = "🐦 Bird right-clicked!";
}

// Flower focus/blur
function flowerFocus(element) {
    document.getElementById("message").innerText = "🌸 Flower focused!";
    element.style.border = "3px solid pink";
}
function flowerBlur(element) {
    document.getElementById("message").innerText = "Flower blurred.";
    element.style.border = "none";
}

// Keyboard events
function keyDown() { console.log("Key down"); }
function keyUp() { console.log("Key up"); }
function keyPress() { console.log("Key press"); }

// Form events
function selectionChanged() {
    document.getElementById("message").innerText = "Selection changed!";
}
function formSubmitted(event) {
    event.preventDefault();
    document.getElementById("message").innerText = "Form submitted!";
}

// Keyboard events
function keyDown() {
    document.getElementById("message").innerText = "Key down detected!";
}

function keyUp() {
    document.getElementById("message").innerText = "Key released!";
}

function keyPress() {
    document.getElementById("message").innerText = "Key press detected!";
}

