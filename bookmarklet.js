javascript:var speechUtteranceChunker=function(b,a,c){var d=(a=a||{},a.chunkLength)||160,d=new RegExp("^.{"+Math.floor(d/2)+","+d+"}[.!?,]{1}|^.{1,"+d+"}$|^.{1,"+d+"} "),d=(a&&void 0!==a.offset?b.text.substring(a.offset):b.text).match(d);if(void 0!==d[0]&&2<d[0].length){var f=d[0],e=new SpeechSynthesisUtterance(f);for(x in b)b.hasOwnProperty(x)&&"text"!==x&&(e[x]=b[x]);e.onend=function(){a.offset=a.offset||0;a.offset+=f.length-1;speechUtteranceChunker(b,a,c)};console.log(e);setTimeout(function(){speechSynthesis.speak(e)},
0)}else void 0!==c&&c()};function talk(b){speechSynthesis.cancel();b=new SpeechSynthesisUtterance(b);var a=speechSynthesis.getVoices();b.voice=a[2];speechUtteranceChunker(b,{chunkLength:120},function(){})}
setInterval(function(){if(localStorage.lastMessage)b=$(".message").last().find(".message_sender").text().trim(),a=$(".message").last().find(".message_content").text().trim(),a!==localStorage.lastMessage&&(c=/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/,a.match(c)&&a.match(c)[0]&&(a=a.replace(a.match(c)[0],b+" shared a link")),talk(b+" said "+a),localStorage.lastMessage=a);else{var b=$(".message").last().find(".message_sender").text().trim(),a=$(".message").last().find(".message_content").text().trim(),
c=/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;a.match(c)&&a.match(c)[0]&&(a=a.replace(a.match(c)[0],b+" shared a link"));talk(b+" said "+a);localStorage.lastMessage=a}},2500);