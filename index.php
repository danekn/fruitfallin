<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Fruit Fallin</title>
    <link href="stylesheets/style.css" rel="stylesheet" type="text/css">
    <link rel="shortcut icon" href="images/favicon.ico">
    <script type="text/javascript" src="js/game.js"></script>
</head>

<body onLoad="replay(
	<?php if(isset($_GET[" replay "]))
			 echo'1';
		else echo'0'; 
	?>
    )">
    <div id="container">
        <a href="index.php">
            <img src="images/fruit_fallin.png" alt="Fruit Fallin">
        </a>
        <div id="game"></div>
        <div id="tip" class="cloud0">
            <a id="next" href="javascript:nextTip()">
                <img src="images/next.png" alt="prossimo suggerimento">
            </a>
        </div>
        <div id="stats_container">
            <div id="stats"></div>
        </div>

</body>

</html>
