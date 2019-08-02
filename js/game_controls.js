const start_game = document.querySelector(".start_game");
const begin_game = document.querySelector("#begin_game");
const main_game = document.querySelector("#main_game");
const restart_game = document.querySelector(".restart_game");
const game_runtime = [...document.querySelectorAll(".game_runtime")];

var welcomeTrack = new Howl({
    src: ['./resources/audio/welcomeTest.mp3'],
    autoplay: true,
    loop: true,
    volume: 0.5,
    rate: 1.5,
    onend: function() {
            console.log('Finished!');
        }
    });

var puzzler = new Howl({
    src: ['./resources/audio/game_music.mp3'],
    loop: true,
    volume: 0.0,
    rate: 1, 

    onend: function() {
            console.log('Finished!');
        }
    });
    // sound.play();
// Start game-----------------------------------
start_game.addEventListener('click', () => {
    begin_game.style.display = "none";
    main_game.style.display = "grid";
    game_runtime.forEach((elem) => elem.style.display = "inline-block");
    welcomeTrack.fade(0.5,0,3000);
    puzzler.play();
    puzzler.fade(0, 0.5,3000);
});

// Restart game----------------------------------
restart_game.addEventListener('click', () => {
    localStorage.removeItem("GameData");
    location.reload();
    main_game.style.display = "grid";
    game_runtime.forEach((elem) => elem.style.display = "inline-block");
    puzzler.fade(0.5, 0, 3000);
    welcomeTrack.play();
    welcomeTrack.fade(0, 0.5, 3000);
});

