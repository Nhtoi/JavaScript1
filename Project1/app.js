const statement = document.getElementById("statement");
const optionButtons = document.getElementById("options").children;
const explanation = document.getElementById("explanation");
const fact = [{statement: "Kevin loves Sam :)", answer: 'true', explanation: "Kevin Really Loves Sam"},
            {statement: "Sam loves Kevin", answer: 'false', explanation: "Sam does not be throwing it back on Kevin"} ];    

statement.textContent = fact[0].statement;
function disable(button){
    button.toggleAttribute("disabled");
}
function enable(button){
    button.toggleAttribute("enabled");
}
function isCorrect(guess){
    if (guess === fact[0].answer){
        return true;
    }else{
        return false;
    } 
}
        for(let i = 0; i < optionButtons.length; i++){
            optionButtons[i].addEventListener('click', ()  =>  {
                explanation.innerHTML = fact[0].explanation;
                for(let j = 0; j < optionButtons.length; j++){
                    disable(optionButtons[j]);
                }
                guess = isCorrect(optionButtons[i].innerText);
                if (guess){
                    optionButtons[i].classList.add("correct");
                }else{
                    optionButtons[i].classList.add("incorrect");
                }  
    })
}