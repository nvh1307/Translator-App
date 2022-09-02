const selectTag = document.querySelectorAll("select")
const translateBtn = document.querySelector('button')
const fromText = document.querySelector('.from-text')
const toText = document.querySelector('.to-text')
const exchangeIcon = document.querySelector('.exchange')
icons = document.querySelectorAll('.row i');  

selectTag.forEach((tag) =>{
    
    for (const country_code in countries){ // chay vong for de dua gia tri vao selected
        let selected;
        // if(id==0 && country_code == "en-GB"){
        //     selected="selected"
        // }else if(id == 1 && country_code == "hi-IN"){
        //     selected = "selected"
        // }

        let option = `<option value="${country_code}" >${countries[country_code]}</option>`; //${selected}
        tag.insertAdjacentHTML("beforeend",option); // adding options tag inside select tag
    }
})

exchangeIcon.addEventListener("click",()=>{
    let tempText = fromText.value,
    tempLang = selectTag[0].value;

    fromText.value = toText.value
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText
    selectTag[1].value=tempLang
})
translateBtn.addEventListener('click',()=>{
    let text = fromText.value,
    translateFrom = selectTag[0].value, // getting from SelectTag value
    translateTo = selectTag[1].value; // getting to SelectTag value

    if(!text) return;
    toText.setAttribute("placeholder","translating...");
    let apiURL =`https://api.mymemory.translated.net/get?q=${text}%20World!&langpair=${translateFrom}|${translateTo}`

    fetch(apiURL).then(res=>res.json())
    .then(data=>{
        toText.value = data.responseData.translatedText
    toText.setAttribute("placeholder","translating");
        
    })
    
})

icons.forEach(icon=>{
    icon.addEventListener("click",({target})=>{
        if(target.classList.contains("bxs-copy")){
            if(target.id == 'from'){
                navigator.clipboard.writeText(fromText.value)
            }else{
                navigator.clipboard.writeText(toText.value)

            }
        }else{
            let utterance;
            if(target.id == "from"){
                utterance = new SpeechSynthesisUtterance(fromText.value)
                utterance.lang = selectTag[0].value
            }else{
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang=selectTag[1].value
            }
            speechSynthesis.speak(utterance)
        }
            
        
    })
})