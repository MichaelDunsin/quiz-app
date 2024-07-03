const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", 
            correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Rhino", correct: false}
        ]
/* 
Remember that each property in JS objects ends with a comma(,) except from the last property in the object.

in each of the anonymous objects, we can see two properties. one named "text" an the other named "correct"

Note that javascript arrays use the syntax; arrayName = [value0, value1, value2]. There is a comma(,) sign after
each value except from the last one.
*/
    },

    {
        question: "Who discovered River Niger?",
        answers: [
            {text: "Mongo Park", correct: true},
            {text: "Fedrick Dujardin", correct: false},
            {text: "Christopher Colombus", correct: false},
            {text: "Dora the Explorer", correct: false},
        ]
    },

    {
        question: "Who founded Adonis Academy?",
        answers: [
            {text: "Andrew Tate", correct: false},
            {text: "Luke Belmar", correct: false},
            {text: "Hamza Hamed", correct: true},
            {text: "Iman Gadzi", correct: false},
        ]
    },

    {
        question: "API stands for _____?",
        answers: [
            {text: "Applied Precautional Information", correct: false},
            {text: "Arranged Per Integer", correct: false},
            {text: "Algorithim Planning Instructions", correct: false},
            {text: "Application Programming Language", correct: true},
        ]
    }
/* 
you can make an array of objects in Javascript. the objects in the array are anonymous objects and they have no 
variable attached to them as shown above.
*/
];
/* 
In the block of code above, we start by creating an array name "questions".
Inside this "questions" array, we have four anonymous objects as values.Each anonymous object is to represent a set
of questions and answers.
Inside each one of the four anonymous functions, we have two properties.
The name of the first property is "question", to store a question as string.
The name of the second property is "answers" to store an array of four anonymous objects indicating four options to pick from.
Each of the four anonymous objects have two properties in them.
The name of the first property is "text", to store an option as string.
The name of the second property is "correct" to store a boolean value of either true or false. 
One out of the four "correct" property in the four anonymous objects under each "answers" property will carry a true
boolean value while the remaining three will carry a false boolean value to indicate one correct true and three false answers
*/

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
/* 
Here, we are simply adding const variables for the "question", "answer-button" and "next-btn" ids
The variable for the question id is = questionElement
The variable for the answer-button id is = answerButtons
The variable for the next-btn id is = nextButton

We are also declaring two variables; let currentQuestionIndex = 0; and let score = 0;
*/
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
/* 
Here, we create a function called startQuiz() and inside the function, we recall our currentQuestionIndex and score
variables and set their values to zero.
Then we call our nextButton variable and assign the string value "Next" to it using the innerHTML.
Finally, we call the showQuestion() function.
*/

  function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    };
        /* 
The while() loop loops through a block of code as long as a specified condition is true e.g;
while (condition){
    "code to be excecuted"
}
an example of the while loop is shown in the piece of code above
*/
    }  


/* 
The block of code above helps to remove the elements in the <div #="answer-button"> node so that it can be replaced
with new elements.
We first start by declaring the function resetState().
Then inside the resetState() function, we set the display attribute of the nextButton using .style to none, this
means that the nextButton cannot be dispalyed.
Then, we use a while() loop to remove all the firstChild in the <div #="answer-button">.Each time the while loop
removes a firstChild, the next child automatically becomes the new firstChild.The loop continues to run until the
lastChild becomes the first child and there are no longer any children in the <div #="answer-button">.
*/


function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question; 
/*  
This first part of the code is to remove the previous elements in the <div #="answer-button"> using the 
resetState() function and display the questions together with the question number.
We create a variable "currentQuestion" and assign the value "questions[currentQuestionIndex]".Since the value for the
currentQuestionIndex is 0, we are indirectly writing questions[0].This means we are getting the first element in 
the questions array.
Next, we create a variable called "questionNo" and assign the value currentQuestionIndex + 1.This is equivalent to 
0 + 1 which is equals to 1.
Finally, we call the "questionElement" with the .innerHTML and assign the value questionNo(which is = 1 now)
 + "."(a full stop in string) + currentQuestion.question(questions[0].question)
*/
    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
//note that we can also write button.className = "btn"; in the code above and it will yield the same result
        answerButtons.appendChild(button);
        /* 
        Here, we start by writing currentQuestions.answers and calling the .forEach function in front of it.
        The forEach() function loops through each element in the answers array and runs a block of code for each of
        the element.
        Then we create a const variable "button" and assign the value document.createElement("button") to create a
        button element.
        Then we write button.innerHTML = answer.text; to add the value of the text property inside the (answer)
        forEach parameter which helps to call each element in the currentQuestion.answers.
        Then we add the ".btn" class to the button variable using the classList() function.
        Lastly, we place the button variable inside the answerButtons variable as a child using the appendChild
        method.
        */
        if(answer.correct){
            button.dataset.correct = answer.correct;
            /* 
            The .dataset is a property used on HTML elements in Javascript.
            you can use the .dataset property to add attributes of other elements to a particular elements 
            The syntax to assign other elements attributes is
            attributeReciever.dataset.id(attribute name) = attributeGiver.id(attribute name)
            Note that we cannot call attributeReciever.dataset.id(attribute name) without ommiting .dataset
            */
        }
        button.addEventListener("click", selectAnswer);
    }
    /* 
    Here, we use the conditional statement if(answer.correct) to check if there is anything like answer.correct and 
    if there is, we are using the .dataset property to assign the .correct attribute to the button variable i.e
    button.dataset.correct = answer.correct;
    Lastly, we add an event listener with a click event and a function to select a correct answer i.e selectAnswer()
    */
    )
}
/* 
The piece of code above is broken into three pieces, each piece is explained at their ends
*/


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
/* 
Here, we start by creating a function selectAnswer() and assigning a parameter "e" to the function.
Then, we create a const variable "selectBtn".We then assign the value "e.target" to attach anything clicked on by the
cursor to the variable selectedBtn.
We proceed to create another const variable "is correct" with the value "selectedBtn.dataset.correct === "true"".This
means that whenever we call this variable, we are calling anything we click on that has the dataset.correct attribute
set to true
Then, we say if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } 
     else{
        selectedBtn.classList.add("incorrect");
    }i.e
    if selectedBtn.dataset.correct === "true", a class containing a green color in our css file called "correct" will
    be added to the element clicked which is the button and the "score" should increase by one.
    But if otherwise (else), a class containing a red color in our css file called "incorrect" will
    be added to the element clicked which is the button
 */
    Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
        button.classList.add("correct");
    }
    button.disabled = true;
    });
    nextButton.style.display = "block";
    /* 
    Here, we use the Array.from() method to make an array of the answerButtons.children by adding 
    answerButtons.children as a parameter.
    Then, we use the forEach() method to loop through each element in the array and pass a piece of code
    Then, we write  if(button.dataset.correct === "true"){
        button.classList.add("correct");
    }
    button.disabled = true;
    this is to make sure that even if we pick the right or wrong answer, as far a button is clicked, the correct
    answer is going to be highlighted in green and the buttons are going to be disabled so we can click on them 
    again y setting the .disabled property to true i.e button.disabled = true;
    Finally, we set nextButton.style.display to "block" so that the next button can become visible
    */
}
/* 
This piece of code will be broken down into 2 pieces each explained at their ends.
*/

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
/* 
We start by adding the eventlistener function with the click event and the function ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
}
Here, we are saying if our currentQuestionIndex(which still remains 0) is less than our questions.length(since we 
    have 4 elements inside our questions, questions.length is 4), then we are calling the handleNextButton() which
    helps to first iterate our currentQuestionIndex, shows the next set of questions if currentQuestionIndex < 
    questions.length and shows the score otherwise

    But if currentQuestionIndex is not < questions.length(else), we should start the quiz all over again
*/

function handleNextButton(){
    currentQuestionIndex++;
if(currentQuestionIndex < questions.length){
    showQuestion();
}
else{
    showScore();
}
}
/* 
We start by creating a function handleNextButton() and inside the function, the first thing we do is iterate our
currentQuestionIndex i.e currentQuestionIndex++
Then, we say if(currentQuestionIndex < questions.length){
    showQuestion();
}
else{
    showScore();
}
Here, we are simply saying that if our currentQuestionIndex(which still remains 0) is less than our questions.length
(since we have 4 elements inside our questions, questions.length is 4), then we are calling the showQuestion() which
helps to display the questions.Since the currentQuestionIndex has been iterated, the set of questions to be 
displayed will be the next set of questions in the questions array.

But if otherwise(else), the score will be displayed by calling the showScore()
*/

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    /* 
    Template Literals are enclosed in back ticks instead of single or double quotes(`)
    they allow you to embed expressions directly into the string using placeholders, denoted by ${expression}
    as shown in the example above.
    */
    nextButton.innerHTML = "Play Again";
nextButton.style.display = "block";
}
/* 
This is the final part of the quizapp.Here, we create a function called showScore()
Then we call the resetState() to remove all the previous children inside the answerButtons
inside this function, we pass the value `You scored ${score} out of ${questions.length}!` inside the questionElement
using innerHTML through template literals(back ticks and ${})
we then set the nextButton.innerHTML to the value "Play Again" and the nextButton.style.display to "block";
*/

startQuiz();