// const GameData = {
//     initial : [],
//     seed : [],
//     points : [],
//     ctr : 0,
//     probability : 0
// };

const GameData = function(points = [], score = 0, prob = []){
    this.initial = ['penguin1','penguin2','penguin3','penguin4','penguin5','penguin6','penguin7','penguin8','yeti'];
    // const temp = this.initial;
    this.seed = ['penguin1','penguin2','penguin3','penguin4','penguin5','penguin6','penguin7','penguin8','yeti'];
    this.points = points;
    this.score = score;
    this.probability = prob;
};