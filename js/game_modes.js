// const hardcoreMode = (input, gameData) => {
//     const p = "penguin";
//     const pattern = /^penguin+[1-8]$/;
//     console.log("Selected: "+input);

//     console.log("Update data: "+pattern.test(input));
//     if(pattern.test(input)){
//         gameData.seed.splice(gameData.seed.indexOf(input),1,"yeti");
//         gameData.points.push(input);
//         console.log("seed: "+gameData.seed);
//         console.log("points: "+gameData.points);
//         console.log("Saving Game data...");
//         scoreCalc(gameData);
//         saveGameData(gameData);
//         gameMaker();
//     }else if(/yeti/.test(input) || !gameData.seed.find((e) => pattern.test(e))){
//         gameData.points.push(input);
//         console.log("game over");
//         gameOver();
//     }else{
//         console.log("invalid choice");
//     }
// };
//TODO: Fix hardcore mode

const normalMode = (input, gameData) => {
    const pattern = /^penguin+[1-8]$/;
    console.log("Selected: "+input);

    console.log("Update data: "+pattern.test(input));
    if(pattern.test(input)){
        if(!gameData.points.includes(input)){
            gameData.points.push(input);
            gameData.seed.splice(gameData.seed.indexOf(input),1);
            scoreCalc(gameData);
            console.log("seed: "+gameData.seed);
            console.log("points: "+gameData.points);
        }
        gameMaker();
    }else if(/yeti/.test(input) || !gameData.seed.find((e) => pattern.test(e))){
        gameData.points.push(input);
        console.log("%cGame Over","font-family: Helvetica; font-size:25px; color: red");
        disablePointer();
        window.setTimeout(() => {
            gameOver(gameData);
        },2000);
    }else{
        console.log("invalid choice");
    }
    saveGameData(gameData);
    console.log("%cSaving Game data...", "color: aqua; font-size: 17px;");
};