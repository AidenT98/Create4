
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style.css">
    <title> no title -- prototype</title>
</head>

<body>
       
   
    <div id="first-section">
    
    </div>
    <div id="secound-section">
   
    </div>
    <div id="note-template">
        <div class="note">
                <h1>
                <?php
                $servername = "sql305.epizy.com";
                $username = "epiz_26744045";
                $password = "JsyIAOl0HUuL4R";
                $db = "epiz_26744045_DECO3500";
                // Create connection
                $conn = mysqli_connect($servername, $username, $password,$db);
                // Check connection
                if (!$conn) {
                   die("Connection failed: " . mysqli_connect_error());
                }
                echo "Connected successfully";
                ?>  </h1>
        </div>
        <div class="note">
        <?php echo "This message is from server side." ?>
            </div>
            <div class="note">
            
                </div>
    </div>
    
</body>
</html>
