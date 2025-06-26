const RANDOM_IMG_ENDPOINT = "https://dog.ceo/api/breeds/image/random";
const BREEDS = ["affenpinscher", "african", "airedale", "akita", "appenzeller", "shepherd australian", "basenji", "beagle", "bluetick", "borzoi", "bouvier", "boxer", "brabancon", "briard", "norwegian buhund", "boston bulldog", "english bulldog", "french bulldog", "staffordshire bullterrier", "australian cattledog", "chihuahua", "chow", "clumber", "cockapoo", "border collie", "coonhound", "cardigan corgi", "cotondetulear", "dachshund", "dalmatian", "great dane", "scottish deerhound", "dhole", "dingo", "doberman", "norwegian elkhound", "entlebucher", "eskimo", "lapphund finnish", "bichon frise", "germanshepherd", "italian greyhound", "groenendael", "havanese", "afghan hound", "basset hound", "blood hound", "english hound", "ibizan hound", "plott hound", "walker hound", "husky", "keeshond", "kelpie", "komondor", "kuvasz", "labradoodle", "labrador", "leonberg", "lhasa", "malamute", "malinois", "maltese", "bull mastiff", "english mastiff", "tibetan mastiff", "mexicanhairless", "mix", "bernese mountain", "swiss mountain", "newfoundland", "otterhound", "caucasian ovcharka", "papillon", "pekinese", "pembroke", "miniature pinscher", "pitbull", "german pointer", "germanlonghair pointer", "pomeranian", "medium poodle", "miniature poodle", "standard poodle", "toy poodle", "pug", "puggle", "pyrenees", "redbone", "chesapeake retriever", "curly retriever", "flatcoated retriever", "golden retriever", "rhodesian ridgeback", "rottweiler", "saluki", "samoyed", "schipperke", "giant schnauzer", "miniature schnauzer", "english setter", "gordon setter", "irish setter", "sharpei", "english sheepdog", "shetland sheepdog", "shiba", "shihtzu", "blenheim spaniel", "brittany spaniel", "cocker spaniel", "irish spaniel", "japanese spaniel", "sussex spaniel", "welsh spaniel", "english springer", "stbernard", "american terrier", "australian terrier", "bedlington terrier", "border terrier", "cairn terrier", "dandie terrier", "fox terrier", "irish terrier", "kerryblue terrier", "lakeland terrier", "norfolk terrier", "norwich terrier", "patterdale terrier", "russell terrier", "scottish terrier", "sealyham terrier", "silky terrier", "tibetan terrier", "toy terrier", "welsh terrier", "westhighland terrier", "wheaten terrier", "yorkshire terrier", "tervuren", "vizsla", "spanish waterdog", "weimaraner", "whippet", "irish wolfhound"];
function getRandomElement(array) {
    const i = Math.floor(Math.random() * array.length);
    return array[i];
}
function shuffleArray(array) {
    const newArray = Array.from(array)
    return newArray.sort((a,b) => Math.random() - 0.5);
}
function getMultipleChoices(n, correctAnswer, array) {
    const dogs = new Set([correctAnswer])
    while (dogs.size < n + 1){
        randomDog = getRandomElement(array)
        dogs.add(randomDog)
        }
    return shuffleArray(dogs)
}
function getBreedFromURL(url) {
    const nonAlphabeticRegex = /[^a-zA-Z]/;
    start = url.indexOf("breeds")
    splitUrl = url.split("/")
    breedOf = splitUrl.indexOf("breeds") + 1
    if (nonAlphabeticRegex.test(splitUrl[breedOf])){
        answer = splitUrl[breedOf].split(nonAlphabeticRegex).join(" ")
    } else{
        answer = splitUrl[breedOf]
    }
    return answer
}
async function fetchMessage(url) {
    let response = await fetch(url);
    body = await response.json()
    return body.message
}
function renderButtons(choicesArray, correctAnswer) {
    function buttonHandler(e) {
        if (e.target.value === correctAnswer) {
            e.target.classList.add("correct");
        } else {
            e.target.classList.add("incorrect");
            document.querySelector(`button[value="${correctAnswer}"]`).classList.add("correct");
        }
    }
    const options = document.getElementById("options"); // Container for the multiple-choice buttons
    for (let i = 0; i < choicesArray.length; i++){
        optionButtons = document.createElement(`button`)
        optionButtons.setAttribute("name", choicesArray[i])
        optionButtons.setAttribute("value", choicesArray[i])
        optionButtons.textContent = choicesArray[i]
        optionButtons.addEventListener("click", buttonHandler)
        console.log(optionButtons)
        options.append(optionButtons)
    }
}
function renderQuiz(imgUrl, correctAnswer, choices) {
    const image = document.createElement("img");
    image.setAttribute("src", imgUrl);
    const frame = document.getElementById("image-frame");
    image.addEventListener("load", () => {
        frame.replaceChildren(image);
        renderButtons(choices, correctAnswer);
    })
}
async function loadQuizData() {
    document.getElementById("image-frame").textContent = "Fetching doggo...";
    const doggoImgUrl = await fetchMessage(RANDOM_IMG_ENDPOINT);
    const correctBreed = getBreedFromURL(doggoImgUrl);
    const breedChoices = getMultipleChoices(3, correctBreed, BREEDS);
    return [doggoImgUrl, correctBreed, breedChoices];
}
async function Load(){
    const information = await loadQuizData()
    console.log(information)
    renderQuiz(...information)
}  
Load()