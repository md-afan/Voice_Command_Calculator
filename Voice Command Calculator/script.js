
$(document).ready(function(){
    const inputDisplay = document.getElementById('input-display');
    const outputDisplay = document.getElementById('output-display');

    // Speech recognition initialization
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onresult = function(event) {
        const result = event.results[0][0].transcript;
        inputDisplay.innerHTML = result;

        // Evaluating the mathematical expression
        try {
            const sanitizedExpression = sanitizeExpression(result);
            const answer = eval(sanitizedExpression);
            outputDisplay.innerHTML = answer;
            speak(`The answer is ${answer}`);
        } catch (error) {
            outputDisplay.innerHTML = "Invalid input!";
            speak("Invalid input");
        }
    };

    // Continuous result updates during speech recognition
    recognition.onstart = function() {
        setInterval(function(){
            const interimResult = recognition.interimResults[0][0].transcript;
            inputDisplay.innerHTML = interimResult;
        }, 500);
    };

    // Error handling
    recognition.onerror = function(event) {
        outputDisplay.innerHTML = "Error occurred in speech recognition. Please try again.";
        speak("Error occurred in speech recognition. Please try again.");
    };

    // Start speech recognition on button click
    $('#calculator').click(function(){
        recognition.start();
    });

    // Function to sanitize the mathematical expression
    function sanitizeExpression(expression) {
        // Replace common spoken phrases with mathematical symbols
        const sanitizedExpression = expression.replace(/times/g, '*').replace(/plus/g, '+').replace(/minus/g, '-').replace(/divided by/g, '/').replace(/raised to the power of/g, '**').replace(/to the power of/g, '**').replace(/times/g, '*');
        return sanitizedExpression;
    }

    // Function to speak the given text
    function speak(text) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    }
});



//Animation 

