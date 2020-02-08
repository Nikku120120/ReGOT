document.addEventListener('DOMContentLoaded', processSpeech, false)

function processSpeech() {
  const recognition = new webkitSpeechRecognition()
  recognition.lang = 'en-US'
  recognition.continuous = true // To continue listening by browser

  recognition.onresult = function(event) {
    console.log("Event is"+ JSON.stringify(event));
    const results = event.results
    const transcript = results[results.length-1][0].transcript
    console.log(transcript);

    setEmoji('searching')

    fetch(`/emotion?text=${transcript}`)
      .then((response) => response.json())
      .then((result) => {
        console.log("Result is" +result);
        if (result.score > 0) {
          setEmoji('positive')
        } else if (result.score < 0) {
          setEmoji('negative')
        } else {
          setEmoji('neutral')
        }
      })
      .catch((e) => {
        console.error('Request error -> ', e)
        recognition.abort()
      })
  }

  recognition.onerror = function(event) {
    console.error('Recognition error -> ', event.error)
    setEmoji('error')
  }

  recognition.onaudiostart = function() {
    console.log("started listening")
    setEmoji('listening')
  }

  recognition.onend = function() {
    console.log('Speech stoped')
    setEmoji('idle')
  }

  recognition.start();

  function setEmoji(type) {
    const emojiElem = document.querySelector('.emoji img')
    emojiElem.classList = type
  }
}