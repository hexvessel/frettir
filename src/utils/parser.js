export function parseRUV(string){
    let parsed = parseChevron(string);
    let parsedArray = []
    let j = -1
    let check = false
    for(let i = 0; i < parsed.length; i++){
        if(parsed[i] === '<'){
            check = true
            if(j > 0 && j != i){
                parsedArray.push(parsed.substring(j,i))
            }
        }
        if(parsed[i] === '>'){
            check = false
            j = i + 1
        }
    }
    return parsedArray
}

export function parseChevron(string){
    let parsed = "";
    for(let i = 0; i < string.length; i++){
        if (string[i] == '&'){
            if(string[i+1] == 'l'){
                parsed += '<'
                i += 3
            }else if(string[i+1] == 'g'){
                parsed += '>'
                i += 3
            }
        }else{
            parsed += string[i]
        }
    }
    return parsed;
}

export function parseMBLText(string){
    let res = []
    let parsed = parseChevron(string);
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const found = parsed.match(regex);
    if(found){
        res.push(parsed.substring(parsed.indexOf(">")+1).replace(/(\r\n|\n|\r)/gm, "").trim());
    }else{
        res.push(parsed);
    }
    return res;
}
export function parseMBLImage(string){
    let res = []
    let parsed = parseChevron(string);
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const found = parsed.match(regex);
    
    return found;
}