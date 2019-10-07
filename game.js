var MaxY = 10; //righe matrice delle posizioni
var MaxX = 5; //colonne matrice delle posizioni
var x = 0; // posizione corrente riga
var y = 2; // posizione corrent colonna
var gameover = 0;
var type; //variabile tipo di frutta
var score = 0;
var Mat = []; //Matrice della posizioni
var timer; //timer di gioco globale
var cloud = 1; //numero della nuvola dei suggerimenti
var levels = 1; //livello di gioco corrente
var isPaused = true;


/* crea una nuova partita oppure resetta una iniziata*/
function newGame() {
    document.onkeydown = keyCheck; //asssegnamento handler
    pause();
    if (gameover == 1) {
        resetGameover();
    }
    initMat();
    gameover = 0;
    score = 0;
    levels = 1;
    resetDiv();
    createDiv();
    createFs();
    scoreRefresh();
    insertNewPiece();
    resume();
}
//inizializza la matrice delle posizioni
function initMat() {
    Mat = new Array(MaxX);
    for (i = 0; i < MaxX; i++) {
        Mat[i] = new Array(MaxY);
        for (j = 0; j < MaxY; j++) {
            Mat[i][j] = -1;
        }
    }
}

//crea i div per i movimenti dei frutti
function createDiv() {
    var parent = document.getElementById("game");
    for (j = 0; j < MaxX; j++) {
        for (i = 0; i < MaxY; i++) {
            var div = document.createElement('div');
            div.className = "empty";
            div.id = "c" + j + "r" + i;
            div.style.position = "absolute";
            div.style.left = j * 50 + "px";
            div.style.top = i * 50 + "px";
            div.style.width = "50px";
            div.style.height = "50px";
            parent.appendChild(div);
        }
    }
}

function createFs() {
    var parent = document.getElementById("container");
    var div = document.createElement('div');
    div.className = "fruitsalad";
    div.id = "fs";
    div.style.position = "absolute";
    div.style.left = "725px";
    div.style.top = "15px";
    div.style.width = "70px";
    div.style.height = "70px";
    parent.appendChild(div);
}

function removeFs() {
    var parent = document.getElementById("container");
    var child = document.getElementById("fs");
    parent.removeChild(child);
}


//Timer di gioco
function gameTimer() {
    if (!gameover)
        down();
    else
        clearInterval(timer);
}
//Mette in pausa
function pause() {
    if (isPaused == true) {
        resume();
        return;
    }
    isPaused = true;
}
//Riprende il gioco
function resume() {
    isPaused = false;
    clearInterval(timer);
    timer = setInterval(function () {
        gameTimer()
    }, (450 / levels));
}

//Funzione per la scelta random del tipo di frutto
function randomPiece() {
    piece = Math.floor((Math.random() * 6) + 1);
    return piece;
}

//Inserisce un nuovo elemento in cima
function insertNewPiece() {
    levelUp();
    if ((Mat[2][0] != -1) && (isPaused == false)) {
        gameover = 1;
        gameOver();
        return;
    }

    if (gameover == 0) {
        x = 2;
        y = 0;
        var div = document.getElementById("c2r0");
        type = randomPiece();
        switch (type) {
        case 1:
            div.className = "grapes";
            break;
        case 2:
            div.className = "cherry";
            break;
        case 3:
            div.className = "banana";
            break;
        case 4:
            div.className = "raspberry";
            break;
        case 5:
            div.className = "strawberry";
            break;
        case 6:
            div.className = "orange";
            break;
        }

    }
}

// Handler , codice ripreso dalle slide del corso
function keyCheck(e) {
    e = (!e) ? window.event : e;
    var key = (e.which != null) ? e.which : e.keyCode;
    switch (key) {
    case 37:
        left();
        break; //E' stato premuto freccia sx
    case 39:
        right();
        break; //E' stato premuto freccia dx
    case 40:
        down();
        break; // E' stato premuto freccia basso
    case 80:
        pause();
        break;
    }
}
//Sposta il frutto corrente a sinistra se la posizione è libera o il gioco non in pausa
function left() {
    if (isPaused)
        return;
    if ((x > 0) && (Mat[x - 1][y] == -1)) {
        var div0 = document.getElementById('c' + x + 'r' + y);
        var div1 = document.getElementById('c' + (x - 1) + 'r' + y);
        div1.className = div0.className;
        div0.className = "empty";
        x--;
    }
}


//Sposta il frutto corrente a destra se la posizione è libera o il gioco non in pausa
function right() {
    if (isPaused)
        return;
    if ((x < MaxX - 1) && (Mat[x + 1][y] == -1)) {
        var div0 = document.getElementById("c" + x + "r" + y);
        var div1 = document.getElementById("c" + (x + 1) + "r" + y);
        div1.className = div0.className;
        div0.className = "empty";
        x++;
    }
}

//Funzione per la discesa del frutto
function down() {
    if (isPaused) {
        return;
    }
    if (!gameover) {
        if ((y < MaxY - 1) && (Mat[x][y + 1] == -1)) {
            var div0 = document.getElementById("c" + x + "r" + y);
            var div1 = document.getElementById("c" + x + "r" + (y + 1));
            div1.className = div0.className;
            div0.className = "empty";
            y++;

        }
        if ((y == MaxY - 1) || (Mat[x][y + 1] != -1)) {
            /*se siamo a fine matrice oppure non ci sono posizioni libere
		blocco il frutto e richiamo la checkElem per controllare 
		se devo effettuare eliminazioni*/
            Mat[x][y] = type;
            checkElem(x, y);
            insertNewPiece();
        }
    }
}
//Funzione che pulisce i div dei frutti
function resetDiv() {
    for (i = 0; i < MaxY; i++) { //resetto i div
        for (j = 0; j < MaxX; j++) {
            var div = document.getElementById("c" + j + "r" + i);
            if (div) div.className = "empty";
        }
    }
}
/*Funzione di fine gioco, resetto l'area di gioco, visualizzo 
il punteggio totalizzato e pulsante per la classifica*/
function gameOver() {
    gameover = 1;
    removeFs();
    resetDiv();
    createHs();
    createYs();
    yourScoreRefresh();

}
//Visualizza l'effetto esplosione su un determinato elemento data la posizione
function explosion(col, row) {
    var div0 = document.getElementById("c" + col + "r" + row);
    div0.className = "explosion";
}
//Cancella un determinato elemento data la posizione
function erase(col, row) {
    if (gameover == 1)
        return;
    score++;
    do {
        var div0 = document.getElementById("c" + col + "r" + row);
        var div1 = document.getElementById("c" + col + "r" + (row - 1));
        div0.className = div1.className;
        Mat[col][row] = Mat[col][row - 1];
        row--;
    }
    while ((row > 1) && (div0.className != "empty"))

}

/*Funzione per controllare se devo fare delle eliminazioni nell'intorno di una posizione*/
function checkElem(x, y) {
    var numUp = 0;
    var numDown = 0;
    var numBack = 0;
    var numFor = 0;
    var yAppo = y;
    var xAppo = x - 1;

    var type = Mat[x][y];
    if (type == -1) return;
    /* controllo nelle quattro direzioni possibili i pezzi contigui e conto quanti ne vanno eliminati*/
    while ((xAppo >= 0) && (Mat[xAppo][y] == type)) {
        numBack++;
        xAppo--;
    }

    yAppo = y;
    xAppo = x + 1; //mi sposto avanti il pezzo di riferimento 
    while ((xAppo < MaxX) && (Mat[xAppo][y] == type)) {
        numFor++;
        xAppo++;
    }

    yAppo = y - 1;
    xAppo = x;
    while ((yAppo >= 0) && (Mat[x][yAppo] == type)) {
        numUp++;
        yAppo--; //mi sposto sopra il pezzo di riferimento
    }

    yAppo = y + 1;
    xAppo = x;
    while ((yAppo < MaxY) && (Mat[x][yAppo] == type)) {
        numDown++;
        yAppo++;
    }

    checkcase(x, y, numBack, numFor, numDown, numUp);
    return;

}
/*Funzione che prende il numero degli elementi uguali nelle 4 dimensioni 
e provvede a cancellarli*/
function checkcase(x, y, numBack, numFor, numDown, numUp) {
    var numSO = numBack + numFor; //numero di elementi uguali in orizzontale 
    var numSV = numUp + numDown; //numero di elementi uguali in verticale


    if ((numSO >= 2) || (numSV >= 2)) {

        if ((numSO == 1) && (numSV >= 2)) {
            numBack = 0;
            numFor = 0;
        }
        if ((numSV == 1) && (numSO >= 2)) {
            numUp = 0;
            numDown = 0;
        }
        /*Richiamo la funzione per le esplosioni, per visualizzarle correttamente
			 metto in pausa per un valore inversamente proporzionale al livello corrente*/
        explosionP(x, y, numBack, numFor, numDown, numUp);
        pause();


        setTimeout(function () {
                eraseP(x, y, numBack, numFor, numDown, numUp);
                checkP(x, y, numBack, numFor, numDown);
                resume();
            },
            500 / levels);

    }
    return;
}

//funzione che gestisce le eraseR(),orizzontale ed eraseN(), verticale
function eraseP(x, y, b, f, d, u) {
    eraseR(x, y, b, f);
    eraseN(x, y + d, d + u + 1);
    if (gameover == 1)
        return;
    scoreRefresh();
}

//funzione per erase orizzontale
function eraseR(x, y, b, f) {
    if ((b == 0) && (f == 0)) return;
    for (i = -b; i <= f; i++)
        if (i != 0) erase(x + i, y); //salto l'elemento di riferimento
}
//funzione per erase verticale
function eraseN(x, y, v) {
    while (v > 0) {
        erase(x, y);
        v--;
    }

}
/*funzione per ricontrollare se devo effettuare altre eliminazioni su elementi 
scalati, per quello di riferimento ci possono essere eliminazioni in basso (y+d) */
function checkP(x, y, b, f, d) {
    for (i = -b; i <= f; i++) {
        if (i != 0)
            checkElem(x + i, y);
    }
    checkElem(x, y + d);
}
/*funzione che gestisce le esplosioni multiple*/
function explosionP(x, y, b, f, d, u) {
    for (i = -b; i <= f; i++) {
        if (i != 0)
            explosion(x + i, y);
    }
    for (i = -u; i <= d; i++)
        explosion(x, y + i);
}



/*funzione che visualizza le nuvole di suggerimento*/
function nextTip() {
    if (cloud == 5) {
        newSession();
        var parent = document.getElementById("tip");
        var child = document.getElementById("next");
        parent.removeChild(child);
        var parent = document.getElementById("container");
        var child = document.getElementById("tip");
        parent.removeChild(child);
        return;
    }
    var ti = document.getElementById("tip");
    ti.className = "cloud" + cloud;
    ti.alt = "Suggerimenti";
    cloud++;
}

/*Funzione che aggiorna il contatore del punteggio durante la partita*/
function scoreRefresh() {
    var scoreupdate = score;
    for (i = 4; i >= 0; i--) {
        var r = document.getElementById("p" + i); //una cifra per ogni div, e arrotondo all'intero piu vicino
        var modulo = scoreupdate % 10;
        scoreupdate = Math.floor(scoreupdate / 10);
        r.className = "dig" + modulo;
    }
}

/*Visualizza il punteggio totalizzato a fine gioco*/
function yourScoreRefresh() {
    var scoreupdate = score;
    for (i = 2; i >= 0; i--) {
        var r = document.getElementById("sdig" + i);
        var modulo = scoreupdate % 10;
        scoreupdate = Math.floor(scoreupdate / 10);
        r.className = "sdig" + modulo;
    }
}

/*Funzione che aumenta il livello in base al punteggio*/
function levelUp() {
    var lev = document.getElementById("level");
    if (score < 20)
        lev.className = "easy";
    if ((score > 19) && (score < 35)) {
        clearInterval(timer);
        levels = 2;
        lev.className = "medium";
        resume();
    }
    if ((score > 36) && (score < 60)) {
        clearInterval(timer);
        levels = 3;
        lev.className = "hard";
        resume();
    }

    if (score > 60) {
        clearInterval(timer);
        levels = 4
        lev.className = "psycho";
        resume();
    }
}

/* Costruisce il div del livello*/
function createLevel() {
    var st = document.getElementById("stats");
    var lvl = document.createElement('div');
    lvl.style.position = "absolute";
    lvl.id = "level";
    lvl.style.top = "35px";
    lvl.style.left = "0px";
    lvl.className = "easy";
    lvl.style.width = "125px";
    lvl.style.height = "25px";
    st.appendChild(lvl);
}

/*Costruisce i div delle statistiche di gioco*/
function createTxt() {
    var parent = document.getElementById("stats_container");
    var txt = document.createElement('div');
    txt.className = "stats_text";
    txt.style.position = "absolute";
    txt.style.top = 4 + "px";
    txt.style.left = 0 + "px";
    txt.style.width = 125 + "px";
    txt.style.height = 54 + "px";
    txt.alt = "Punteggio e livello correnti";
    parent.appendChild(txt);
}

/*Costruisce le cifre del contatore del punteggio*/
function createDig() {
    var parent = document.getElementById("stats");
    for (i = 0; i < 5; i++) {
        var dig = document.createElement('div');
        dig.className = "dig0";
        dig.id = "p" + i;
        dig.style.position = "absolute";
        dig.style.left = i * 25 + "px";
        dig.style.top = 0 + "px";
        dig.style.width = "25px";
        dig.style.height = "25px";
        dig.alt = "cifra" + i;
        parent.appendChild(dig);
    }
}
/*Ccostruisce il pulsante del play*/
function createButton() {
    var parent = document.getElementById("stats_container");
    var but = document.createElement('div');
    but.className = "playbutton";
    but.style.position = "absolute";
    but.style.top = 80 + "px";
    but.style.left = 80 + "px";
    but.style.width = 80 + "px";
    but.style.height = 25 + "px";
    but.setAttribute("onclick", "newGame()");
    but.style.cursor = "pointer";
    but.alt = "tasto play";
    parent.appendChild(but);
}

/*Rimuove i div relativi al punteggio  creati dalla funzione gameover()*/
function resetGameover() {
    var parent = document.getElementById("container");
    var child0 = document.getElementById("hstitle");
    var child1 = document.getElementById("hs");
    parent.removeChild(child0);
    parent.removeChild(child1);
}

/*Visualizza i div delle statistiche di gioco*/
function newSession() {
    createDig();
    createLevel();
    createTxt();
    createButton();
}


/*Funzione che crea un form in maniera dinamica
 per inviare i dati tramite il metodo POST */
function send(servURL, params) {
    var form = document.createElement("form");
    form.setAttribute("method", 'POST');
    form.setAttribute("action", servURL);
    for (var i = 0; i < 2; i++) //creo due input box per score e nickname
    {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", i);
        hiddenField.setAttribute("value", params[i]);
        form.appendChild(hiddenField);

    }
    document.body.appendChild(form);
    form.submit();
}

/*Crea i div per il punteggio totalizzato*/
function createYs() {
    var parent = document.getElementById("hs");
    for (i = 0; i < 3; i++) {
        var sdig = document.createElement('div');
        sdig.className = "sdig0";
        sdig.id = "sdig" + i;
        sdig.style.position = "absolute";
        sdig.style.left = i * 80 + "px";
        sdig.style.top = 20 + "px";
        sdig.style.width = "80px";
        sdig.style.height = "80px";
        //dig.alt specificare testo nel caso in cui non carico
        parent.appendChild(sdig);
    }
    var but = document.createElement('div');
    but.className = "ranking_button";
    but.style.position = "absolute";
    but.style.top = 300 + "px";
    but.style.left = 40 + "px";
    but.style.width = 160 + "px";
    but.style.height = 46 + "px";
    but.setAttribute("onclick", "highscore()");
    but.style.cursor = "pointer";
    but.alt = "Vai alla classifica";
    parent.appendChild(but);

    var inp = document.createElement("input");
    inp.id = "inputnick";
    inp.style.position = "absolute";
    inp.type = "text";
    inp.style.top = 150 + "px";
    inp.style.left = 50 + "px";
    inp.value = "INSERISCI IL TUO NICKNAME QUI";
    inp.setAttribute("onclick", "cleartext()");
    parent.appendChild(inp);
}

/*crea div del titolo del punteggio totalizzato*/
function createHs() {
    var container = document.getElementById("container");
    var hs = document.createElement("div");
    hs.className = "hs_title";
    hs.id = "hstitle";
    hs.style.position = "absolute";
    hs.style.width = "260px";
    hs.style.height = "30px";
    hs.style.top = "100px";
    hs.style.left = "640px";
    container.appendChild(hs);

    var div = document.createElement("div");
    div.id = "hs";
    div.style.backgroundColor = "transparent";
    div.style.width = "250px";
    div.style.height = "400px";
    div.style.position = "absolute";
    div.style.top = "140px";
    div.style.left = "640px";
    container.appendChild(div);
}

/* Funziona che preleva score e nickname e gli invia al database tramite la send()*/
function highscore() {
    var inp = document.getElementById("inputnick");
    var nickname = inp.value;
    if ((nickname.length > 7) || (nickname.length == 0)) {
        alert("Inserisci un nick  valido o minore di 7 caratteri!");
        return;
    }
    var param = new Array(2);
    param[0] = nickname;
    param[1] = score;
    send('insert.php', param);
}


//Funzione che pulisce la input del nickname	
function cleartext() {
    var i = document.getElementById("inputnick");
    i.value = "";
}
/*Funzione che nel caso ci troviamo nella pagina della classifica e volessimo 
rigiocare evita di ricaricare le nuvole di suggerimento ma direttamente
i div per  una nuova partita */
function replay(b) {
    if (b == 1) {
        cloud = 5;
        nextTip();
        return;
    }
}