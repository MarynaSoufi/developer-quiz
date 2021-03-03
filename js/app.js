import { getQuiz } from './api.js';
import { createHtmlElement, createSelectElement } from './Elements.js';

const categories = ['Code', 'CMS', 'Docker', 'bash', 'Linux', 'DevOps', 'SQL'];

const app = {
    async init(){
        this.cacheElements();
        console.log(await getQuiz(10, "code", "easy"));
        this.createElements();
        
    },
    cacheElements() {
        this.$section = document.querySelector('section');
    },
    //create html elemnts
    createElements() {
        const htmlForLevel = createHtmlElement({className: "level", type: "radio", name: "level", id: ["easy", "medium", "hard"], text: "Please select difficulty level:"});
        this.$section.appendChild(htmlForLevel);
        const htmlForNumber = createHtmlElement({className: "number", type: "radio", name: "number", id: ["5", "10", "15", "20"], text: "Please select number of questions:"});
        this.$section.appendChild(htmlForNumber);
        const htmlForCategory = createSelectElement({text: "Choose a category",className: "category", name: "category", id: "category", options: [...categories]});
        this.$section.appendChild(htmlForCategory);
    }

};
app.init();