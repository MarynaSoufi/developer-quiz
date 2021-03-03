import { TOKEN, QUIZ_API  } from './constants.js';


/*
create url with options
*/ 
const createQuiz = (options = {}) => {
    const quizUrl = new URL(`${QUIZ_API}${TOKEN}`);
    for(const key in options) quizUrl.searchParams.append(key, options[key]);
    return quizUrl;
};

/*
Fetch data
*/
const fetchQuiz = async (options = {}) => {
    const data = await fetch(createQuiz(options));
    const json = await data.json();
    return json;
};

/*
get questioins
*/

// export const getQuiz = (limit = 20, category = Linux, difficulty = Medium) => fetchQuiz({"limit": limit, "category": category, "difficulty": difficulty});
export const getQuiz = (limit = 20, category=linux, difficulty=easy) => fetchQuiz({"limit" : limit, "category" : category, "difficulty" : difficulty});