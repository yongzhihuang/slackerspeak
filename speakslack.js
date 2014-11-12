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
        
            var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/
            if (latestmsg.match(urlPattern) && latestmsg.match(urlPattern)[0]) {
                latestmsg = latestmsg.replace(latestmsg.match(urlPattern)[0], author + ' shared a link');
            }
            talk(author + ' said ' + latestmsg);

        }

        localStorage.lastMessage = latestmsg;
    } else {
        var author = $('.message').last().find('.message_sender').text().trim();
        var latestmsg = $('.message').last().find('.message_content').text().trim();
        if (latestmsg !== localStorage.lastMessage) {
            if (latestmsg.length <= 180){
            
                var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/
                if (latestmsg.match(urlPattern) && latestmsg.match(urlPattern)[0]) {
                    latestmsg = latestmsg.replace(latestmsg.match(urlPattern)[0], author + ' shared a link');
                }
                talk(author + ' said ' + latestmsg);

            }
            localStorage.lastMessage = latestmsg;
        }
    }

}, 2500);
