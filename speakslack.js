var voices = window.speechSynthesis.getVoices();

var prepSynthesizer = function ()
{
    var msg = new SpeechSynthesisUtterance();

    msg.voice = voices[10];
    msg.voiceURI = 'native';
    msg.volume = 1; 
    msg.rate = 1;
    msg.pitch = 2;
    msg.lang = 'en-GB';
    return msg;
}


var talk = function (text)
{
    speechSynthesis.cancel(); 

    var sentences = text.split(".");
    for (var i=0;i< sentences.length;i++)
    {
        var toSay = prepSynthesizer();
        toSay.text = sentences[i];
        speechSynthesis.speak(toSay);
    }
}

setInterval(function() {
    
    if (!localStorage.lastMessage) {
        var author = $('.message').last().find('.message_sender').text().trim();
        var latestmsg = $('.message').last().find('.message_content').text().trim();

        if (latestmsg.length <= 180){
            talk(author + ' said ' + latestmsg);
        }

        localStorage.lastMessage = latestmsg;
    } else {
        var author = $('.message').last().find('.message_sender').text().trim();
        var latestmsg = $('.message').last().find('.message_content').text().trim();
        if (latestmsg !== localStorage.lastMessage) {
            if (latestmsg.length <= 180){
                talk(author + ' said ' + latestmsg);
            }
            localStorage.lastMessage = latestmsg;
        }
    }

}, 2500);