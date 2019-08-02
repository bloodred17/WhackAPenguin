// const main_text = document.querySelector(".title");
const penguin = document.querySelector(".penguins");
const penguin_fat_div = penguin.firstElementChild;
const penguin_tall_img = penguin_fat_div.nextElementSibling;
const penguin_cone_img = penguin_tall_img.nextElementSibling;
const penguin_fat_img = penguin_fat_div.firstElementChild;

const run_animation = document.querySelector(".run_animation");
const runner = run_animation.nextElementSibling;

penguin_fat_div.style.position = "absolute";
penguin_fat_div.style.top = "40vh";
penguin_fat_div.style.right = "10vw";

// run_animation.style.border = "2px solid blue";
run_animation.style.position = "absolute";
// run_animation.style
run_animation.style.animation = "move 10s ease-in-out infinite";
run_animation.style.right = "-400px";
// runner.style.position = "absolute";


penguin_fat_div.addEventListener("mouseover", () => {
    penguin_fat_div.style.animation = "tackle 3s forwards";
    penguin_fat_img.style.animation = "roll 0.7s 4";
    // penguin_tall_img.style.transition = "translate 9s ease-out 4s";
    penguin_tall_img.style.transform = "translate(200px, -800px)";
    penguin_cone_img.style.transform = "translate(800px, -800px)";
    // setTimeout(() => {
    //     location.reload();
    // }, 4500);
});