function recordVoice(){
    var textbox = $('#text-box')
    
    var instructions = $('#instructions')
    
    var content = '';
    
    if (!window.hasOwnProperty('webkitSpeechRecognition')){
        instructions.text('Your browser is unsupported! Please switch to Google Chrome!');
        return
    }

    var speechRecognition = window.webkitSpeechRecognition
    var recognition = new speechRecognition()

    recognition.continuous = true
    //recognition is started

    recognition.onstart = function () {
        instructions.text('am listening ....')
    }
    recognition.onerror = function (){
        instructions.text('_err: Problem connecting to the internet,try again')
        setTimeout = 5000;
    
    }
    recognition.onspeechend = function (){
        instructions.text("_err: you are not saying anything!")
    }

    recognition.onresult = function(event){
        var current = event.resultIndex;

        var transcript = event.results[current][0].transcript

        content += transcript;


    var input =  textbox.val(content)
    }


    $('#start-btn').click(function (event) 
    {
        if (content.length){
            content += '';
        }
        recognition.start();
    });
}