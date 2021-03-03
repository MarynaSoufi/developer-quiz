
/*
    create html buttons for difficulty level and number of questions
*/
export const createHtmlElement = ({ className,type, name, id = [], text}) => {
    const div = document.createElement('div');
    if(className) div.classList.add(className);
    const p = document.createElement('p');
    if(text)  p.innerText = text;
    div.appendChild(p);
    let input = "";
        id.forEach((e) => {
            input = document.createElement('input');
            if(type) input.type = type;
            if(name) input.name = name;
            if(e) {
                input.id = e;
                input.value = e;
            } 
            const label = document.createElement('label');
            if(e) label.setAttribute("for", e);
            label.innerText = e;
            div.appendChild(input);
            div.appendChild(label);
            // const label = document.createElement('label');
            // if(i) label.for = i; 
        });
    return div;
};

/*
    create selectfield for categories
*/
export const createSelectElement = ({text,className, name, id, options = []}) => {
    const div = document.createElement('div');
    const p = document.createElement('p');
    if(text)  p.innerText = text;
    if(className) div.classList.add(className);
    div.appendChild(p);
    const select = document.createElement('select');
    if(name) select.name = name;
    if(id) select.id = id;
    options.forEach((e) => {
        const option = document.createElement('option');
        if(e) {
            option.value = e;
            option.innerText = e;
        }
        select.appendChild(option);

    });
    div.appendChild(select);
    return div;
}