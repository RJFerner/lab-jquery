/*
 * A modified quiz generator
 Ryan Ferner, rjf19
 */
$(document).ready(function(){

// the possible questions in the quiz
var fragen = $.getJSON( "questions.json", function() {
  console.log( "Questions Loaded" );
})
console.log(fragen);

var questions = [];
for (frage in fragen){
    questions.push(frage);
    ///Why doesn't this work?!?!!
}
console.log(questions);

var quiz = document.getElementById('quiz');
var questionsCompleted = 0;


    
    
// returns a random element from a given list
function randomElement(list) {
    return list[Math.floor(Math.random() * list.length)];
}

// return question data user is working on now
function currentQuestion () {
    return questions[questionsCompleted];
}

// returns user's selected answer
function getChoice() {
    var element = document.querySelector('input[name="answer"]:checked');
    if (element === null) {
        return -1;
    } else {
        return parseInt(element.value, 10);
    }
}

// returns list of the answer choices as radio inputs
function createRadios(questionData) {
    var radioList = document.createElement('ul');
    questionData.choices.forEach(function (text, index) {
        var item = document.createElement('li');
        item.innerHTML = '<input type="radio" name="answer" value=' + index + ' />' + text;
        radioList.append(item);
    });
    return radioList;
}

// create div that contains question and the possible answers
function createQuestionElement(questionData) {
    var qElement = document.createElement('div');
    var question = document.createElement('p');
    question.innerHTML = questionData.question;
    qElement.appendChild(question);
    qElement.appendChild(createRadios(questionData));
    qElement.id = 'question';
    return qElement;
}

// displays current question
function displayQuestion() {
    quiz.appendChild(createQuestionElement(currentQuestion()));
}

// check if user's response is correct or not
function checkResponse() {
    var choice = getChoice();
    if (choice < 0) {
        alert('Please make a selection!');
    } else if (choice === currentQuestion().correctAnswer) {
        alert('Correct!');
    } else {
        alert('Sorry, try again!');
    }
    return false;
}

// moves to next question by removing the current one
function nextQuestion() {
    questionsCompleted += 1;
    quiz.removeChild(quiz.children[0]);
    if (questionsCompleted === questions.length) {
        quiz.innerHTML = '<h2>You completed the quiz!<h2>';
        document.getElementById('submit').removeEventListener('click', checkResponse, false);
        document.getElementById('next').removeEventListener('click', nextQuestion, false);
    }
    else {
        displayQuestion();
    }
}


// add interactivity to HTML elements
document.getElementById('submit').addEventListener('click', checkResponse, false);
document.getElementById('next').addEventListener('click', nextQuestion, false);

// display initial question
displayQuestion();
});