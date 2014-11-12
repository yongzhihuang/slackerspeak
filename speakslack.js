javascript:var voices = window.speechSynthesis.getVoices();

var sayit = function ()
{
    var msg = new SpeechSynthesisUtterance();

    msg.voice = voices[10]; // Note: some voices don't support altering params
    msg.voiceURI = 'native';
    msg.volume = 1; 
    msg.rate = 1;
    msg.pitch = 2;
    msg.lang = 'en-GB';
    msg.onstart = function (event) {

        console.log("started");
    };
    msg.onend = function(event) {
        console.log('Finished in ' + event.elapsedTime + ' seconds.');
    };
    msg.onerror = function(event)
    {

        console.log('Errored ' + event);
    }
    msg.onpause = function (event)
    {
        console.log('paused ' + event);

    }
    msg.onboundary = function (event)
    {
        console.log('onboundary ' + event);
    }

    return msg;
}


var speekResponse = function (text)
{
    speechSynthesis.cancel(); 

    var sentences = text.split(".");
    for (var i=0;i< sentences.length;i++)
    {
        var toSay = sayit();
        toSay.text = sentences[i];
        speechSynthesis.speak(toSay);
    }
}

setInterval(function() {
    
    if (!localStorage.lastMessage) {
        var author = $('.message').last().find('.message_sender').text().trim();
        var latestmsg = $('.message').last().find('.message_content').text().trim();
        speekResponse(author + ' said ' + latestmsg);
        localStorage.lastMessage = latestmsg;
    } else {
        var author = $('.message').last().find('.message_sender').text().trim();
        var latestmsg = $('.message').last().find('.message_content').text().trim();
        if (latestmsg !== localStorage.lastMessage) {
            speekResponse(author + ' said ' + latestmsg);
            localStorage.lastMessage = latestmsg;
        }
    }

}, 5000)