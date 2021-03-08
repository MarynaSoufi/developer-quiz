export const TOKEN = "SkrAacAVYnWv5h0nPDnUs4DlMRKF1UoPMQMFMqmv";
export const QUIZ_API = "https://quizapi.io/api/v1/questions?apiKey="; 

//start screen
export const START_SCREEN_START_BUTTON_ID = "startQuizBtn";
export const START_SCREEN_START_BUTTON_TEXT = "START QUIZ";

//info screen
export const INFO_SCREEN_EXIT_BUTTON_ID = "exitQuizBtn";
export const INFO_SCREEN_GO_TO_CHOICES_BUTTON_ID = "goToChoicesBtn";
export const INFO_SCREEN_HTML = `<section class="message container"><div>
<p>
    Some rules of this QUIZ
</p>
<ul>
    <li>You will have only <span>15 seconds</span> per each qustion</li>
    <li>You can exit from the QUIZ when the button <span>"STOP QUIZ" </span>is pressed</li>
    <li>You wil get points in the basis of your <span>correct</span> answers</li>
</ul>
<div class="btn_wrapper">
    <button class="prev" id="${INFO_SCREEN_EXIT_BUTTON_ID}">Exit QUIZ</button>
    <button class="next" id="${INFO_SCREEN_GO_TO_CHOICES_BUTTON_ID}">Continue</button>
</div>
</div></section>`;

//choices screen
export const CHOICES_SCREEN_CATEGORIES = ['Choose a category','Code', 'CMS', 'Docker', 'bash', 'Linux', 'DevOps', 'SQL'];
export const CHOICES_SCREEN_START_BUTTON_ID = "startQuizConfiguredBtn";