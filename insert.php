<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"><html>
<?php 
	include "dbconfig.php";
	$connessione=mysql_connect($host, $user, $password) or die("Connessione non riuscita: " . mysql_error());
	mysql_select_db($database, $connessione) or die("Selezione del database non riuscita: " . mysql_error());
	if (isset($_POST['0']))
	{
	$punt=$_POST['1'];
	$nome=$_POST['0'];
	$insert="INSERT INTO highscores(nickname,score)
	VALUES('$nome','$punt')";
	$ins = mysql_query($insert) or die("Query fallita: " .mysql_error());
	}
	 $query="SELECT * FROM highscores ORDER BY score DESC";

	$ris = mysql_query($query) or die("Query fallita: " .mysql_error());
    echo' 
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Fruit Fallin</title>
<link href="stylesheets/style.css" rel="stylesheet" type="text/css">
<link rel="shortcut icon" href="/images/favicon.ico">
<script type="text/javascript" src="js/game.js"></script>
</head>
<body>
	<div id="container">
	<a href="index.php">
<img src="images/fruit_fallin.png"  alt="Fruit Fallin">
</a>
	<a id="playagain" href="index.php?replay"><img src="images/play_again.gif" alt="Gioca Ancora!"></a>
	<div id="tcontainertitle"></div>
    	<div id="tablecontainer">
		<table id="tscores">';
         while ($x=mysql_fetch_array($ris))
		{
			echo '<tr><td class="tcell tcell1">'.$x['nickname'].'</td>
				<td class="tcell">'.$x['score'].'</td></tr>';
		}
	echo '</table>		
		</div>
	</div>
</body>
</html>
';
	mysql_close();
	?>