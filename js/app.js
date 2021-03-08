import {
    START_SCREEN_START_BUTTON_ID, START_SCREEN_START_BUTTON_TEXT,
    INFO_SCREEN_HTML, INFO_SCREEN_EXIT_BUTTON_ID, INFO_SCREEN_GO_TO_CHOICES_BUTTON_ID,
    CHOICES_SCREEN_CATEGORIES, CHOICES_SCREEN_START_BUTTON_ID } from './constants.js';
import { getQuiz } from './api.js';
import { createHtmlElement, createSelectElement, createButton} from './Elements.js';
import { saveDataInLocalStorage, getArrayFromLocalSrotage } from './localstorage.js';

const app = {
    async init(){
        this.data = [];
        this.currentQuestion = 0;
        this.total;
        this.score = 0;
        this.progress = [];        
        this.root = document.getElementById('root');
        this.timer = 0;
        this.timeLeft = 0;
        this.totalTime = 30;
        this.createStartScreen();
        
    },
    //clear screen
    clearScreenAreaForce() {
        this.root.innerHTML = "";
    },
    createStartScreen() {
        //first clear screen
        this.clearScreenAreaForce();
        const section = document.createElement("section");
        section.classList.add("btn", "container");
        const startButton = document.createElement("button");
        startButton.id = START_SCREEN_START_BUTTON_ID;
        startButton.innerText = START_SCREEN_START_BUTTON_TEXT;
        //go to info screen
        startButton.addEventListener("click", (e) => {
            this.createInfoScreen();
        });
        section.appendChild(startButton);
        this.root.appendChild(section);
    },
    createInfoScreen() {
        //first clear screen
        this.clearScreenAreaForce();
        //fill in info screen
        this.root.innerHTML = INFO_SCREEN_HTML;
        const exitBtn = document.getElementById(INFO_SCREEN_EXIT_BUTTON_ID);
        //go to start screen(exit button)
        exitBtn.addEventListener("click", (e) => {
            this.createStartScreen();
        });
        const goToChoicesBtn = document.getElementById(INFO_SCREEN_GO_TO_CHOICES_BUTTON_ID);
        //go to the test condition selection
        goToChoicesBtn.addEventListener("click", (e) => {
            this.createChoicesScreen();
        });
    },
    createChoicesScreen() {
        //first clear screen
        this.clearScreenAreaForce();
        //defolt values configuration
        let configuration = {
            level: null,
            number: null,
            category: null
        };

        const section = document.createElement("section");
        section.classList.add("choice", "container");
        //create radio buttons to select a level
        const htmlForLevel = createHtmlElement({className: "level", type: "radio", name: "level", id: ["easy", "medium", "hard"], text: "Please select difficulty level:", data: configuration});
        section.appendChild(htmlForLevel);
        //create radio buttons to choice of quantity
        const htmlForNumber = createHtmlElement({className: "number", type: "radio", name: "number", id: ["5", "10", "15", "20"], text: "Please select number of questions:", data: configuration});
        section.appendChild(htmlForNumber);
        //create a selectElement for selecting a category
        const htmlForCategory = createSelectElement({text: "Choose a category",className: "category", name: "category", id: "category", options: [...CHOICES_SCREEN_CATEGORIES], data: configuration});
        section.appendChild(htmlForCategory);
        //create start button to go the quiz
        const start = createButton({ className: "category__button", parent: section, text: "START", id: CHOICES_SCREEN_START_BUTTON_ID });
        start.addEventListener('click', async(e) => {
            //get selected questions from API using fetch
            const questions = await getQuiz(configuration.number, configuration.category, configuration.level);
            if(questions.error) return;
            //save data in local storage
            saveDataInLocalStorage(questions);
            //get data from LocalStorage
            const data =  getArrayFromLocalSrotage('question');
            //crete quiz screen
            this.createQuizScreen(data);
        });
        section.appendChild(start);

        this.root.appendChild(section);
    },
    //create quiz screen
    createQuizScreen(questions) {
        //first clear screen
        this.clearScreenAreaForce();
        //array with questions from localStorage
        let data = questions;
        this.data = data;
        //total number of questions
        this.total = data.length;
        //clear clear everything at the end of the quiz or after aborting the test
        let clearScreen = () => {
            data = [];
            this.currentQuestion = 0;
            clearInterval(this.timeLeft);
            clearTimeout(this.timer);
        };
        //show a question one at a time
        let showNextQuestion = (element) => {
            //clear everything for timer
            clearInterval(this.timeLeft);
            clearTimeout(this.timer);
            //save correct answers
            //find all correct answers from data
            const correctAnswerFlags = Object.values(data[this.currentQuestion].correct_answers);
            // find which answer is correct
            const correctAnswerValues = Object.values(data[this.currentQuestion].answers).filter((a, index) => correctAnswerFlags[index] === "true");
            this.progress[this.currentQuestion] = {
                isCorrect: false,
                questionTitle: data[this.currentQuestion].question,
                correctAnswers: correctAnswerValues
            };
            //create timer
            this.timer = setTimeout(() => processNextQuestion(), this.totalTime * 1000);            
            let totalTime = this.totalTime;
            let processTime = () => {                
                const span = document.querySelector('.timer');
                span.innerText = totalTime;
                totalTime -= 1;
            };
            //create quiz
            let type = "";
            //array with answers from current quesion
            const answersArr = [];
            //current question
            let current = data[this.currentQuestion];
            //const values = Object.values(current);
            const question = current.question;
            const answers = Object.values(current.answers);
            const multiple = current.multiple_correct_answers;            
            if(question) {
                for(let i in answers) {
                    if(answers[i] !== null && !answersArr.includes(answers[i])){
                    answersArr.push(answers[i]);
                    }
                }
                //create radion button for simle question en create checkbox for multiple question
                multiple === "true"? type = "checkbox" : type = "radio";
                const elementsRadioOfCheckButton = createHtmlElement({className: "question", type: type, name: "answer", id: [...answersArr], text: question});
                element.innerHTML = "";
                element.appendChild(elementsRadioOfCheckButton);
            }
            else {
                element.innerHTML = "";
            }
            //add timer
            const section = document.querySelector('.question');
            const span = document.createElement('span');
            span.classList.add("timer");
            section.appendChild(span);
            this.timeLeft = setInterval(processTime, 1000);
            processTime();
        };

        const section = document.createElement("section");
        section.classList.add("questions");
        const questionBody = document.createElement("div");
        questionBody.classList.add("questionns__test");
        section.appendChild(questionBody);

        let processNextQuestion = () => {
            const questionDiv = document.querySelector('.question');
            //make a array with cheked answers
            const selectedAnswers = [].slice.call(questionDiv.children).filter(n => n.checked);
            this.progress[this.currentQuestion].answers = selectedAnswers.map(sa => sa.value);
            //change the button text after the penultimate question
            if(this.currentQuestion === data.length - 2){
                nextBtn.innerText = "COMPLETE QUIZ";
            }
            //in case the question is the last
            if(this.currentQuestion === data.length - 1){
                clearInterval(this.timeLeft);
                clearTimeout(this.timer);
                //show score
                const score = this.calculateScore();
                //create screen with score
                this.createResultScreen(score);
                return;
            }
            this.currentQuestion++;
            showNextQuestion(questionBody);
            this.showCurrentQuestion(); 
        };
        const nextBtn = createButton({className: "button__next", parent: section, text: "NEXT QUESTION"});
        nextBtn.addEventListener('click', (e) => {
            processNextQuestion();
        });
       
        section.appendChild(nextBtn);

        const stopBtn = createButton({className: "button__stop", parent: section, text: "STOP QUIZ"});
        stopBtn.addEventListener('click', (e) => {
            clearScreen();
            this.createStartScreen();
        });
        section.appendChild(stopBtn);
        this.root.appendChild(section);

        showNextQuestion(questionBody);
        //show current question
        this.showCurrentQuestion();       
        
    },
    //calculating score logic
    calculateScore() {
        for(let q in this.progress) {
            //determine the correct answer
            const containsValues = this.progress[q].answers.length 
                && this.progress[q].answers.filter(i => this.progress[q].correctAnswers.includes(i)).length === this.progress[q].answers.length;
            if(containsValues) {
                this.score++;
                this.progress[q].isCorrect = true;
            }
        }        
        console.log(this.score);
        return this.score; 
    },
    createResultScreen(score) {
        //first clear screen
        this.clearScreenAreaForce();
        let str = "";
        const section = document.createElement("section");
        section.classList.add("result");
        const result = document.createElement("p");
        const dats = document.createElement('div');
        //show all questions with correct answers and with real answers
        this.progress.forEach((e, i) => {
            let blank = "";
            if(e.answers == "" || e.answers == undefined || e.answers == null ) {
                blank = "You didn’t answer this question";
            }else {
                blank = e.answers; 
            }
            console.log(e.isCorrect);
            str += `<div class="result__question"><p>Question: ${i+1} ${e.questionTitle}</p></div><div class="result__you-answer"><p>Your answer:<br/> ${blank}</p></div><div class="result__correct-answer"><p>Correct answers:<br/> ${e.correctAnswers}</p></div>`;
        })
        dats.innerHTML = str;
        result.innerText = `You scored ${score}`;
        //create button to go again to quiz
        const againBtn = createButton({className: "button__again", parent: section, text: "GO AGAIN"});
        againBtn.addEventListener('click', (e) => {
            //clear everything
            this.data = [];
            this.currentQuestion = 0;
            clearInterval(this.timeLeft);
            clearTimeout(this.timer);
            this.clearScreenAreaForce();
            this.createStartScreen();
        });
        section.appendChild(result);
        section.appendChild(dats);
        section.appendChild(againBtn);
        this.root.appendChild(section);
    },
    //show current question
    showCurrentQuestion() {
        const section = document.querySelector('.question');
        let str = "";
        const span = document.createElement('span');
        span.classList.add("current_question");
        str = `${this.currentQuestion +1} from ${this.total}`;
        span.innerText = str;
        section.appendChild(span);

    }
};
app.init();