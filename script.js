/* 
 Criando em  : 04/08/2018
 Autor       : André Dias <santosdias@yaho.com.br>
 Página      : https://www.ocontrolador.com.br
 */
var aisweb = 'https://www.aisweb.aer.mil.br';
var locais = "SBGL,SBRJ,SBAF,SBSC,SBJF,SBSP,SBGR,SBBR";

//function loadXMLDoc() {
function getCartas(icao, tipo) {
    var caminho = aisweb + '/api/?apiKey=1299927088&apiPass=fae56e72-0091-1034-a49b-72567f175e3a&area=cartas&icaoCode=' + icao + '&tipo=' + tipo;
    //console.log(caminho);
    var cartas = '';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var txt = setCartas(this, tipo);
            //console.log(icao+' - '+tipo);
            document.getElementById(icao + tipo).innerHTML = txt;
            //return txt;
        }
    }
    xmlhttp.open("GET", caminho, true);
    xmlhttp.send();
}

function setCartas(xml, tipo, idtipo) {
    var x, i, xmlDoc, txt;
    xmlDoc = xml.responseXML;
    //console.log(xmlDoc);
    txt = "";
    x = xmlDoc.getElementsByTagName("item");
    for (i = 0; i < x.length; i++) {
        var nome = removeCD(x[i].childNodes[9].innerHTML);
        var link = removeCD(x[i].childNodes[15].innerHTML);
        txt += '<li><a onclick="abreCarta(\'' + link + '\');"  >' + nome + '</a></li>';
        //console.log(i+' - '+nome+' - '+link);
        //<li><a href="#">Sub Sub 1</a></li>
//        txt += '<li><a onclick="window.open(\'carregando.html\',\'carta\'); window.open(\'https://docs.google.com/viewer?url=' + link + '&pid=explorer&efh=false&a=v&chrome=false&embedded=true\',\'carta\');"  >' + nome + '</a></li>';
        //txt += '<li><a href="https://drive.google.com/file/d/'+link+'/preview" target="test" onclick="document.getElementById("test").frameBorder=1">'+nome+'</a></li>';
    }
    return txt;
}
function abreCarta(link, callback) {
    console.log('Carregando carta');

        var janela = window.open('https://docs.google.com/viewer?url=' + link + '&pid=explorer&efh=false&a=v&chrome=false&embedded=true', 'carta');

    janela.onload = function() {
        console.log('Fim');
    };
}
//duas funções de teste não usadas
//function abreCarta(link, callback) {
//    var fim ='nada';
//    console.log('carregando carta');
//    var janela = window.open('https://docs.google.com/viewer?url=' + link + '&pid=explorer&efh=false&a=v&chrome=false&embedded=true', 'carta');
//    setTimeout(function(){ fim ='fim'; }, 5000);
//    callback(fim);
//}
//function linkCarta(valor) {
//    console.log(valor);
//}


//remove CDATA
function removeCD(title) {
    return title.replace("<![CDATA[", "").replace("]]>", "");
}

function criaMenu(texto) {
    console.log('Criando...');
    localidades = texto.split(',')
    var menu = '<ul class="menu clearfix">\n';
    menu += '<li><a onclick="window.open(\'inicio.html\',\'carta\'););" ><img src="logo.png" alt="Início" height="18" width="18"></a>'; //<img src="smiley.gif" alt="Smiley face" height="42" width="42">
    var SID, IAC, STAR, ICAO;
    localidades.forEach(function (local) {
        ICAO = local;
        menu += '<li><a href="#">' + local + '</a>' +
                '<ul class="sub1 clearfix">' +
                '<li><a href="#"><img src="acft1.png"> SID</a>' +
                '<ol class="sub2">';
        menu += '<div id="' + local + 'SID"></div>'; //SID;//function(){return getCartas(local,'SID')};
        //<li><a href="#">Sub Sub 1</a></li>                                
        menu += '</ol>' +
                '</li>' +
                '<li><a href="#"><img src="acft2.png"> IAC</a>' +
                '<ol class="sub2">';
        menu += '<div id="' + local + 'IAC"></div>'; //getCartas(local,'IAC');
        //<li><a href="#">Sub Sub 1</a></li>                                
        menu += '</ol>' +
                '</li>' +
                '<li><a href="#"><img src="acft3.png"> STAR</a>' +
                '<ol class="sub2">'
        menu += '<div id="' + local + 'STAR"></div>'; //getCartas(local,'STAR');
        //<li><a href="#">Sub Sub 1</a></li>                                
        menu += '</ol>' +
                '</li>' +
                '</ul>' +
                '</li>';
    }, localidades.forEach(function (ICAO) {
        getCartas(ICAO, 'SID');
        getCartas(ICAO, 'IAC');
        getCartas(ICAO, 'STAR');
    })
            );
    menu += '</ul>';
    //console.log(menu);
    document.getElementById('menu').innerHTML = menu;
}

//Janela de configuração
function closethis(name) {
    var x = document.getElementById(name);
    x.style.visibility = 'hidden';
}
function showthis(name) {
    var x = document.getElementById(name);
    var aberta = (x.style.visibility == 'visible') ? true : false;
    if (aberta) {
        x.style.visibility = 'hidden';
    } else {
        x.style.visibility = 'visible';
        if (name == 'jLocal') {
            document.getElementById("icao").focus();
        }
        ;
    }
    ;
}

//Cookie
function carregaDados(valor) {
    console.log('Carregando...');
    var dados = getCookie(valor);
    if (dados != null && dados !== undefined && dados != '') {
        document.getElementById('icao').value = dados;
        locais = dados;
    }
    criaMenu(locais);
}

function setCookie(c_name, value, exdays) {
    console.log('Salva: ' + c_name + "=" + value);
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
    console.log('Carrega: ' + c_name);
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++)
    {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name)
        {
            return unescape(y);
        }
    }
    return "";
}