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


var speechUtteranceChunker = function (utt, settings, callback) {
    settings = settings || {};
    var chunkLength = settings && settings.chunkLength || 160;
    var pattRegex = new RegExp('^.{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[\.\!\?\,]{1}|^.{1,' + chunkLength + '}$|^.{1,' + chunkLength + '} ');
    var txt = (settings && settings.offset !== undefined ? utt.text.substring(settings.offset) : utt.text);
    var chunkArr = txt.match(pattRegex);

    if (chunkArr[0] !== undefined && chunkArr[0].length > 2) {
        var chunk = chunkArr[0];
        var newUtt = new SpeechSynthesisUtterance(chunk);
        for (x in utt) {
            if (utt.hasOwnProperty(x) && x !== 'text') {
                newUtt[x] = utt[x];
            }
        }
        newUtt.onend = function () {
            settings.offset = settings.offset || 0;
            settings.offset += chunk.length - 1;
            speechUtteranceChunker(utt, settings, callback);
        }
        console.log(newUtt); //IMPORTANT!! Do not remove
        setTimeout(function () {
            speechSynthesis.speak(newUtt);
        }, 0);
    } else {
        if (callback !== undefined) {
            callback();
        }
    }
}

function talk (text) {
    var utterance = new SpeechSynthesisUtterance(text);
    var voiceArr = speechSynthesis.getVoices();
    utterance.voice = voiceArr[2];

    speechUtteranceChunker(utterance, {
        chunkLength: 120
    }, function () {

    });
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