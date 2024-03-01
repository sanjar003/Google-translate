const selectTags = document.querySelectorAll("select");

selectTags.forEach((tag, id) => {
  for (let country_code in countries) {
    let selected =
      id === 0
        ? country_code === "en"
          ? "selected"
          : ""
        : country_code === "es"
        ? "selected"
        : "";

    let option = `<option ${selected} value="${country_code}" >${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});
document.getElementById("translateBtn").addEventListener("click", function () {
  const text = document.getElementById("inputText").value;
  const translateFrom = document.getElementById("translateFrom").value;
  const translateTo = document.getElementById("translateTo").value;
  translateText(text, translateFrom, translateTo);
});
function translateText(inputText, fromLang, toLang) {
  const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    inputText
  )}&langpair=${fromLang}|${toLang}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.responseData) {
        const translatedText = data.responseData.translatedText;
   const formattedText = removeQuestuionMarks(translatedText)
        document.getElementById("outputText").innerHTML = formattedText;
      } else {
        document.getElementById("outputText").innerText =
          "Error : Could Not Translate!";
      }
    })
    .catch((error) => {
      console.log(" Error:", error);
      document.getElementById('outputText').innerText = "Error : An error occurred while translating!"
    });
}
function removeQuestuionMarks(text) {
    return text.replace(/^¿+|¿+$/g,'') 
}
function speakText (text) {
    const speechSynthesis = window.speechSynthesis;
    const speechUtterance = new SpeechSynthesisUtterance(text)
    speechUtterance.lang = document.getElementById('translateTod').value    
    speechSynthesis.speak(speechUtterance)
}
document,getElementById('speake').addEventListener('click', function() {
    const translatedText = document.getElementById('outputText').innerText;
    speakText(translateText)
})