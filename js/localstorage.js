export const saveDataInLocalStorage = (questions) => {
    const questionssString = JSON.stringify(questions);
    localStorage.setItem('question', questionssString) ;
};

export const getArrayFromLocalSrotage = (key) => {
    const data = localStorage.getItem(key);
    if (!data) return [];

    return JSON.parse(data);
}

export const deleteFromLocalStorage = (key) => {
    localStorage.removeItem(key);


}
