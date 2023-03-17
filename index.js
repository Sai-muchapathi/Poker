"use strict";

if(localStorage == null) {
    localStorage.setItem("total", 100);
}

var random1 = Math.floor(Math.random() * 52) + 1;
var randomCardImage1 = random1 + ".png";
var randomImageSource1 = "images/" + randomCardImage1;

var random2 = Math.floor(Math.random() * 52) + 1;
var randomCardImage2 = random2 + ".png";
var randomImageSource2 = "images/" + randomCardImage2;


onload = () => {
    var image1 = document.querySelectorAll("img")[0];
    image1.setAttribute("src", randomImageSource1);

    var image2 = document.querySelectorAll("img")[1];
    image2.setAttribute("src", randomImageSource2);

    document.getElementById("points").innerHTML = parseInt(localStorage.getItem("total"));
}

function generate() {
    
    var random3 = Math.floor(Math.random() * 52) + 1;
    var randomCardImage3 = random3 + ".png";
    var randomImageSource3 = "images/" + randomCardImage3;
    var image3 = document.querySelectorAll("img")[2];
    image3.setAttribute("src", randomImageSource3);

    var random4 = Math.floor(Math.random() * 52) + 1;
    var randomCardImage4 = random4 + ".png";
    var randomImageSource4 = "images/" + randomCardImage4;
    var image4 = document.querySelectorAll("img")[3];
    image4.setAttribute("src", randomImageSource4);

    var random5 = Math.floor(Math.random() * 52) + 1;
    var randomCardImage5 = random5 + ".png";
    var randomImageSource5 = "images/" + randomCardImage5;
    var image5 = document.querySelectorAll("img")[4];
    image5.setAttribute("src", randomImageSource5);

    document.getElementById("betting").innerHTML = "next game";
    if(document.getElementById("betting").innerHTML == "next game") {
        document.getElementById("betting").setAttribute("onclick", "location.reload()");
    }

    Calculate(random1, random2, random3, random4, random5);
}

function Calculate(random1, random2, random3, random4, random5) {
    var element = document.getElementById("numbers");
    var score = 100;
    var bet = element.options[element.selectedIndex].value;    

    let randomArray = [random1, random2, random3, random4, random5];

    let royalFlush = [
        [1, 13, 12, 11, 10],
        [14, 26, 25, 24, 23],
        [27, 39, 38, 37, 36],
        [40, 52, 51, 50, 49]
    ];

    let suites = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
        [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
        [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52]
    ];


    let Asuite = [1, 14, 27, 40];
    let two = [2,15,28,41];
    let three = [3,16,29,42];
    let four = [4,17,30,43];
    let five = [5,18,31,44];
    let six = [6,19,32,45];
    let seven = [7,20,33,46];
    let eight = [8,21,34,47];
    let nine = [9,22,35,48];
    let ten = [10,23,36,49];
    let joker = [11,24,37,50];
    let queen = [12,25,38,51];
    let king = [13,26,39,52];

    let temp = [];

    for(var i = 0 ; i < randomArray.length + 1; i++) {
        if(Asuite.includes(randomArray[i])) {
            temp[i] = "Asuite";
        } else if(two.includes(randomArray[i])) {
            temp[i] = "two";
        } else if(three.includes(randomArray[i])) {
            temp[i] = "three";
        } else if(four.includes(randomArray[i])) {
            temp[i] = "four";
        } else if(five.includes(randomArray[i])) {
            temp[i] = "five";
        } else if(six.includes(randomArray[i])) {
            temp[i] = "six";
        }else if(seven.includes(randomArray[i])) {
            temp[i] = "seven";
        }else if(eight.includes(randomArray[i])) {
            temp[i] = "eight";
        }else if(nine.includes(randomArray[i])) {
            temp[i] = "nine";
        } else if(ten.includes(randomArray[i])) {
            temp[i] = "ten";
        } else if(joker.includes(randomArray[i])) {
            temp[i] = "joker";
        } else if(queen.includes(randomArray[i])) {
            temp[i] = "queen";
        } else if(king.includes(randomArray[i])) {
            temp[i] = "king";
        }
    }
    
    const elementCounts = {};
    
    temp.forEach(element => {
      elementCounts[element] = (elementCounts[element] || 0) + 1;
    });

    
    for(var i = 0 ; i < royalFlush.length; i++) {
        if(randomArray.sort().toString() == royalFlush[i].sort().toString() ) {
            console.log("Royal Flush");
            document.getElementById("royal").style.backgroundColor = "yellow";
            score = parseInt(localStorage.getItem("total")) + bet * 10;
            document.getElementById("points").innerHTML = score;
            localStorage.setItem("total", score);
            return;
        }
    }
        
    
    for(var i = 0 ; i < suites.length; i++){
        const containAll = randomArray.every(item => {
            return suites[i].includes(item);
        });      
        if(containAll) {
            score = parseInt(localStorage.getItem("total")) + bet * 5;
            console.log("Flush");
            document.getElementById("flush").style.backgroundColor = "yellow";
            document.getElementById("points").innerHTML = score;
            localStorage.setItem("total", score);
            return;
        }
    }
    
    var cal = [];
    cal = Object.values(elementCounts);
    var countOnes = 0;
    console.log("cal: ", cal);
    for(var  i = 0 ; i < cal.length ; i++) {
        if(cal[i] == 4) {
            score = parseInt(localStorage.getItem("total")) + bet * 8;
            console.log("Four of a kind");
            document.getElementById("four").style.backgroundColor = "yellow";
            document.getElementById("points").innerHTML = score;
            localStorage.setItem("total", score);
        } else if(cal[i] == 3) {
            if(cal[i + 1] == 2) {
                score = parseInt(localStorage.getItem("total")) + bet * 7;
                console.log("Full House");
                document.getElementById("full").style.backgroundColor = "yellow";
                document.getElementById("points").innerHTML = score;
                localStorage.setItem("total", score);
                break;
            } else {
                score = parseInt(localStorage.getItem("total")) + bet * 3;
                console.log("Three of a kind");
                document.getElementById("three").style.backgroundColor = "yellow";
                document.getElementById("points").innerHTML = score;
                localStorage.setItem("total", score);
                break;
            }
        } else if(cal[i] == 2) {
            if(cal[i + 1] == 3) {
                score = parseInt(localStorage.getItem("total")) + bet * 7;
                document.getElementById("full").style.backgroundColor = "yellow";
                console.log("Full House");
                localStorage.setItem("total", score);
                break;
            } else {
                    if(cal[i + 1] == 2) {
                        console.log("Two pair");
                        score = parseInt(localStorage.getItem("total")) + bet * 2;
                        console.log(score);
                        document.getElementById("two").style.backgroundColor = "yellow";
                        document.getElementById("points").innerHTML = score;
                        localStorage.setItem("total", score);
                        break;
                    } else {
                        if(cal[i + 2] == 2) {
                            console.log("Two pair");
                            score = parseInt(localStorage.getItem("total")) + bet * 2;
                            console.log(score);
                            document.getElementById("two").style.backgroundColor = "yellow";
                            document.getElementById("points").innerHTML = score;
                            localStorage.setItem("total", score);
                            break;
                        } else {
                            console.log("Pair");
                            score = parseInt(localStorage.getItem("total")) + bet * 1;
                            document.getElementById("points").innerHTML = score;
                            document.getElementById("pair").style.backgroundColor = "yellow";
                            localStorage.setItem("total", score);
                            break;
                        }
                    }
            }
        } else if(cal[i] == 1) {
            countOnes++;
            continue;
        } 
    }
    console.log(countOnes);
    if(countOnes == 5) {
        score = parseInt(localStorage.getItem("total")) - bet;
        document.getElementById("points").innerHTML = score;
        localStorage.setItem("total", score);
        console.log("Lost:" , score);
    }
}