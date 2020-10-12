$(function() {


  
 
    $.getJSON('data.json', function(data) {
        console.log("loading data");
        var count = 0; 
        $.each(data, function(i, f) {
            count++; 
            if (count == 1) {
                var tblRow = "<h1>" + f.person + "</h1>" +
                "<h2>" + f.time + "</h2>" + "<h3>" + f.notedetails + "</h3>"
                $(tblRow).appendTo(".note1");
            }
            if (count == 2) {
                var tblRow = "<h1>" + f.person + "</h1>" +
                "<h2>" + f.time + "</h2>" + "<h3>" + f.notedetails + "</h3>"
                $(tblRow).appendTo(".note2");
            }
            if (count == 3) {
                var tblRow = "<h1>" + f.person + "</h1>" +
                "<h2>" + f.time + "</h2>" + "<h3>" + f.notedetails + "</h3>"
                $(tblRow).appendTo(".note3");
            }
         
           
      });
 
    });
});
/**  CARD SCANNER SENSOR 
utilises serial port data to read the card being scanner and loads them into the system 
*/


/*CAMERA ACCESS https://stackoverflow.com/questions/28189329/embed-camera-frame-in-web-app-html5*/ 
if(navigator.getUserMedia()) {
var errorCallback = function(e) {
    console.log('Reeeejected!', e);
  };

  // Not showing vendor prefixes.
  navigator.getUserMedia({video: true, audio: true}, function(localMediaStream) {
    var video = document.querySelector('video');
    video.src = window.URL.createObjectURL(localMediaStream);

    // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
    // See crbug.com/110938.
    video.onloadedmetadata = function(e) {
      // Ready to go. Do some stuff.
    };
  }, errorCallback);
}