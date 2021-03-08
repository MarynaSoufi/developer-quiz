

/*
    create html buttons for difficulty level and number of questions
*/
export const createHtmlElement = ({ className,type, name, id = [], text, data}) => {
    const div = document.createElement('div');
    if(className) div.classList.add(className);
    const p = document.createElement('p');
    if(text)  p.innerText = text;
    div.appendChild(p);
    let input = "";
        id.forEach((e, index) => {
            input = document.createElement('input');
            if(type) input.type = type;
            if(name) input.name = name;
            if(e) {
                input.id = index;
                input.value = e;
                if (data) {
                    input.addEventListener('change', (e) => {
                        data[name] = e.target.value;
                    });
                }
            }
            const label = document.createElement('label');
            if(e) label.setAttribute("for", index);
            label.innerText = e;
            div.appendChild(input);
            div.appendChild(label);
        });
    return div;
};

/*
    create selectfield for categories
*/
export const createSelectElement = ({text,className, name, id, options = [], data}) => {
    const div = document.createElement('div');
    const p = document.createElement('p');
    if(text)  p.innerText = text;
    if(className) div.classList.add(className);
    div.appendChild(p);
    const select = document.createElement('select');
    if(name) select.name = name;
    if(id) select.id = id;
    if(data) {
        select.addEventListener('change', (e) => {
            data[name] = e.target.value;
        });
    }
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

/*
create button
*/

export const createButton = ({ className, parent, text, id }) => {
    const btn = document.createElement('button');
    if(className) btn.classList.add(className);
    if(text) btn.innerText = text;
    if(id) btn.id = id;
    parent.appendChild(btn);
    return btn;
}
