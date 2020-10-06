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
 