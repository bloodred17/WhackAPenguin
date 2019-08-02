//Get game data from local storage if available or else return a new gameData object
const getGameData = () => {
    const gameDataJSON = localStorage.getItem('GameData');
    try{
        // return gameDataJSON ? JSON.parse(gameDataJSON) : new GameData([], 0, 0);
        if(gameDataJSON){
            console.log("retrieving from local storage...");
            return JSON.parse(gameDataJSON);
        }else{
            console.log("initializing...");
            return new GameData();
        }
    }catch(e){
        console.log("reinitializing");
        return new GameData();
    }
};

//Save and updata game values in gameData to local storage
const saveGameData = (gameData) => {
    localStorage.setItem('GameData', JSON.stringify(gameData));
};

//Shuffle: To shuffle an Array
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

//Previous logic: Generating a unique 9 digit pin and shuffling elements in an array according to the pin position
//generate random position
// const pos = (size, gameData) => {
//     console.log("%c Pin Size: "+size,"color: coral");
//     let sum = 0;
//     let flag = false;
//     let ctr = 0;
//     //Taking the numbers of the exposed penguins from gameData.points
//     const pattern = /[1-9]/;
//     const exposed_penguins = gameData.points.map((elem) => {
//         return parseInt(elem[elem.search(pattern)]);
//     });
//     console.log("exposed_penguins: "+ exposed_penguins);
//     //Generating digit for PIN
//     while(size > 0){
//         let num = Math.floor(Math.random() * (9));
//         // console.log("num: "+ num+ "  includes: "+ exposed_penguins.includes(num));
//         if(exposed_penguins.includes(num)){
//             continue;
//         }
//         // console.log("Continuty test // num: "+ num);
//         //Checking for uniqueness
//         for(let i = sum; i > 0; i = parseInt(i/10)){
//             //zero fix... sometimes it generates 8 digit pin instead of 9
//             if(ctr === 8 && !(""+sum).includes("0")){
//                 num = 0;
//                 break;
//             }
//             if(i%10 === num || (ctr === 0 && num === 1)){
//                 flag = true;
//                 break;
//             }
//         }
//         if(!flag){
//             sum = (sum*10) + num;
//             flag = false;
//             ctr++;
//         }else{
//             flag = false;
//             continue;
//         }
//         size--;
//     }
//     return sum;
// };

//------- Notice: Bug in the Old seeder logic ------------
//assign random positions to penguins
// const seeder = (gameData) => {
//     const pin = pos(gameData.seed.length, gameData);
//     console.log("%cPIN: ","color:red; font-size: 15px;");
//     const pin_str = String(pin);
//     gameData.seed = gameData.seed.filter((elem) => {
//         return (elem)? true: false;
//     });
//     console.log("%cFiltered Seed: ","color: blue; background-color: white;"+"gameData.seed");
//     console.log(gameData.seed);
//     // let dispense = pin_arr.split("").map((elem) => {
//         //    return gameData.seed[elem];
//         // });
//     console.log(pin_str);

//  ------- Possible source of bug ---------------------------
//     // const dispense = pin_str.split("").map((num) => {
//     //     return gameData.seed[num];
//     // });
//     // return dispense;
// };

//Better Seeder
const seeder = (gameData) => {
    gameData.seed = gameData.seed.filter((elem) => {
        return (elem)? true: false;
    });
    return shuffle(gameData.seed);
};

//penguins are put into boxes
const dispenser = (data) => {
    console.log("Dispensed data: "+data);
    //Get boxes
    const box = document.getElementsByClassName("unexposed");
    const box_arr = [...box];
    //supply seeds to boxes
    box_arr.forEach((cloud, idx) => {
        cloud.firstChild.nextSibling.nextSibling.nextSibling.innerHTML = data[idx];
        //controls (adding click event listener to get clicked cloud)
        //when box is clicked, assigned penguin should be called and saved
        cloud.addEventListener('mouseup',(event) => {
            const gameData = getGameData();
            let clicked = "";
            let img = "";
            //find target
            if(event.target.className === "unexposed"){
                const selected_box = event.target;
                //get target's value (seed)
                clicked = selected_box.firstChild.nextSibling.nextSibling.nextSibling;
                selected_box.classList.remove("unexposed");
                selected_box.classList.add("exposed");
                img = selected_box.firstChild.nextSibling;
            }
            if(event.target.className === "image"){
                const selected_box = event.target;
                //get target's value (seed)
                clicked = selected_box.nextSibling.nextSibling;
                selected_box.parentNode.classList.remove("unexposed");
                selected_box.parentNode.classList.add("exposed");
                img = clicked.parentNode.firstChild.nextSibling;
            }
            console.log(img);
            renderImages(clicked.innerHTML, img);
            selected(clicked.innerHTML, gameData);
        });
        
        //When user hovers over box display question mark
        cloud.addEventListener('mouseenter',(event) => {
            let img = "hello";
            const selected_box = event.target;
            if(selected_box.className.split(" ").includes("unexposed")){
                img = selected_box.firstChild.nextSibling;
            }
            if(selected_box.className === "image"){
                img = selected_box.nextSibling.nextSibling.parentNode.firstChild.nextSibling;
            }
            img.src = "./resources/images/mound_hover.png";
        });
        
        //When user leaves the box display cloud
        cloud.addEventListener('mouseleave',(event) => {
            let img = "hello";
            const selected_box = event.target;
            if(selected_box.className.split(" ").includes("unexposed")){
                img = selected_box.firstChild.nextSibling;
            }
            if(selected_box.className === "image"){
                img = selected_box.nextSibling.nextSibling.parentNode.firstChild.nextSibling;
            }
            img.src = "./resources/images/mound.png";
        });
    });

};

const selected = (input, gameData) => {
    normalMode(input, gameData);
};

//--------- Change in game structure: Dividing the control according to game modes ---------------
// const selected = (input, gameData) => {
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
//     //Calling game maker to re-render box values and continuing game
// };

//Keeps game running
const gameMaker = () => {
    const gameData = getGameData();
    dispenser(seeder(gameData));
};

//On game over
const gameOver = (gameData) => {
    //remove the Game Layout from the display
    const main_game = document.querySelector("#main_game");
    main_game.style.display = "none";
    //Display Outro
    document.querySelector(".game_over").style.display = "block";
    const game_runtime = [...document.querySelectorAll(".game_runtime")];
    game_runtime.forEach((elem) => elem.style.display = "none");
    document.querySelector(".score_value").innerHTML = gameData.score;
    localStorage.removeItem("GameData");
};

const scoreCalc = (gameData) => {
    const show_score_elements = [...document.querySelectorAll(".score_value")];
    //--previous logic--
    // const probability = ((gameData.seed.length - gameData.points.length - 1)/gameData.seed.length)*100;
    const probability = gameData.seed.filter((elem) => {
        return (/penguin[0-8]/.test(elem))? true: false;
    }).length / gameData.seed.length;
    // console.log("Probability: "+probability);
    gameData.probability.push(probability);
    let score = 100 - (probability*100);
    if(!gameData.points.includes("yeti")){
        gameData.score += parseInt(score);
    }
    console.log("Contains Yeti: "+gameData.points.includes("yeti"));
    show_score_elements.forEach((elem) => {
        elem.innerHTML = gameData.score;
    });
    console.log("Score: "+gameData.score);
    saveGameData(gameData);
};

const renderImages = (input, imgElem) => {
    console.log("Clicked: "+input);
    imgElem.src = `./resources/images/${input}.png`;
    console.log("%cPutting penguin image: ","color: Yellow; font-size: 15px");
    console.log(imgElem);
};

//Stops the user from revealing hidden penguins by disabling the pointer
//Removes the 'image' class so that eventListeners cannot point to the image 
const disablePointer = () => {
    const box = document.getElementsByClassName("unexposed");
    const box_arr = [...box];
    box_arr.forEach((cloud) => {
        cloud.classList.add("disable_pointer");
        cloud.firstChild.nextSibling.classList.remove("image");
        //Cross browser solution below
        // element.className = element.className.replace(/\bmystyle\b/g, "");
    });
};

