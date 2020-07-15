//Global variables:


//Question-related variables:

var questionText = document.querySelector("#questionText");     //The text of the question
var questionBox = document.querySelector("#questionBox");       //The element the question will be put into



//Response variables that will hold the possible answers each round:

var response1 = document.querySelector("#response1");
var response2 = document.querySelector("#response2");
var response3 = document.querySelector("#response3");
var response4 = document.querySelector("#response4");



//Response set for each question round: 

const answers1 = ["Lisinopril", "Irbesartan", "Aliskiren", "Metformin"];

const answers2 = ["Diabetes type I", "Diabetes type II", "Diabetes insipidus", "Heart failure"];

const answers3 = ["Medulla oblongata", "Temporal lobe", "Thalamus", "Substantia nigra"];

const answers4 = ["AIDS", "SARS", "SIDS", "PICA"];

const answers5 = ["Diaphragm", "Hepatocyte", "Neuron", "Nephron"];

const answers6 = ["Phenylketoneuria", "Cystic fibrosis", "Pancreatitis", "Huntingtons Disease"];

const answers7 = ["Fluorine", "Phosphorous", "Nitrogen", "Hydrogen"];

const answers8 = ["Liraglutide", "Exenatide", "Dulaglutide", "Lixisenatide"];

const answers9 = ["Eukarya", "Bacteria", "Archaea", "Protista"];

const answers10 = ["Apical shoots", "Apical roots", "Influorescent structures", "Xylem cells"];



//An array of arrays to hold each deck of possible responses:

const answerArray = [answers1, answers2, answers3, answers4, answers5, answers6, answers7, answers8, answers9, answers10]; 



//The array of the questions themselves:

const questions =   [
    "QUESTION 1: Which of the following medications are NOT used for blood pressure maintenance?", 
    "QUESTION 2: Which of the following medical conditions CAN be treated with Januvia?", 
    "QUESTION 3: Which of the following brain structures is believed to play an important role in the pathophysiology of Parkinson's disease?", 
    "QUESTION 4: Severe Acute Respiratory Syndrome Coronavirus-2, more commonly known by its infectious disease namesake COVID-19, is caused by a virus most closely related to which disease associated with a similar pathophysiology?", 
    "QUESTION 5: In terms of microbiology, what is the fundamental microscopic unit of the kidney underlying its functionality?", 
    "QUESTION 6: Which of the following diseases does NOT have a stricly genetic etiology?", 
    "QUESTION 7: Which of the following chemical elements are NOT normally incorporated or found within the molecular structure of DNA?", 
    "QUESTION 8: Which of the following medications commonly used to treat diabetes today is actually a synthetic form of a deadly venom produced by the the Gila Monster?", 
    "QUESTION 9: In terms of biological cladistics and the less modern design of the so-called tree of life, which of the following kingdoms exhibits the greatest amount of interspecies diversity? ", 
    "QUESTION 10: Which of the following plant structures or parts are NOT composed of meristematic cells?"
                    ];



//The array containing the correct answers for each round:

const correctAnswers =  [
"Metformin", 
"Diabetes type II", 
"Substantia nigra", 
"SARS", 
"Nephron", 
"Pancreatitis", 
"Fluorine", 
"Exenatide", 
"Bacteria", 
"Xylem cells"
                        ];


//Timer function:

var count=60;                           //60 sec on the clock

var counter=setInterval(timer, 1000);   //one-second decrements

function timer() {

    count=count-1;
    if (count <= 0)
    {
        clearInterval(counter);
        alert("TIME UP! Your score is: " + score);  //display score at end
        return;
    }
    document.getElementById("timer").innerHTML=count + " secs"; //show countdown
}



//Scoreboard monitor:

var score = 0;

function scoreboard() {            
    document.getElementById("scoreboard").innerText = ("Score: " + score);
}

                        

//Iterator keeps track of the round; I found it easier to use it outside the main function for better flexibility and ease of coding:

var iterator = 0;



//Calling the almighty inquizitor function that does all the work:

inquizitor();                             



//Giving the inquizition its legs:

function inquizitor() {                    
    

    //Housekeeping:

    questionBox.innerHTML = "";             //initialize the question box each round
    response1.innerHTML = "";               //initialize the response boxes each round
    response2.innerHTML = "";
    response3.innerHTML = "";
    response4.innerHTML = "";



    //Display of the questions:
    
    var question = questions[iterator];     //display the next question
    var q = document.createElement("q");    //create an element in the DOM
    q.textContent = question;               //set the content of the element to the current question
    questionBox.appendChild(q);             //append the question to the element

    

    //Setting up the possible responses each round:
    
    var answerSet = answerArray[iterator];  //get this questions's answer set
        
    var ans1 = answerSet[0];
    var A = document.createElement("A");    //Q1
    A.textContent = ans1;
    response1.appendChild(A);
    
    var ans2 = answerSet[1];                //Q2
    var B = document.createElement("B");
    B.textContent = ans2;
    response2.appendChild(B);

    var ans3 = answerSet[2];                //Q3
    var C = document.createElement("C");
    C.textContent = ans3;
    response3.appendChild(C);
    
    var ans4 = answerSet[3];                //A4
    var D = document.createElement("D");
    D.textContent = ans4;
    response4.appendChild(D);
   
 
        
    //create the listeners and handlers for all four buttons together
    
    window.onload=function() {                                      //Fix for function the DOM loading slower than the function itself. Forces it to wait.
        var buttons = document.querySelectorAll("button"), i;       //A neat trick I learned to apply the same listener to multiple identical elements.
            for (i=0; i<buttons.length; i++) {
                buttons[i].addEventListener("click", function(){    //Listening for clicks on all 4 buttons simultaneously.
        
                    var choice = this.textContent;                  //Grab the content of the user's answer from the button.
                    var answer = correctAnswers[iterator];          //Establish the correct answer for this round.
                    
                    console.log(choice);                            //Debugging check.
                    console.log(answer);

                    if (choice === answer) {                        //If the strings match, its considered correct.
                        alert("Correct!"); 
                        timer += 5000;                              //Add 5 sec to the timer.
                        score++;
                        scoreboard();                                 //Add one to the score.
                        iterator++;                                 //Move to next round. I chose a recursive solution for this loop for elegance.
                        inquizitor();                               //Recursively call the function again to advance to the next question!
                        return;
                        }
            
                        else {                                      //If the strings don't match, you're wrong.
                        alert("Wrong!");                
                        count = (count - 5);                        //Subtract 5 seconds from the timer.
                        iterator++;                                 //Move to the next found.
                        inquizitor();                               //Rescursion.
                        return;
                        }
                    } //Close if/else.
                ) //Close event listeners.
        } //Close the multi-listener.
    } //Close the DOM checkpoint.
} //Close the inquizitor.



//STILL NEED TO DO:
//start/reset game functionality
//leaderboard storage
//slight visual tweaks