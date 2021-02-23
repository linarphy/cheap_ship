document.getElementsByTagName('main')[0].style.height=CONFIG['game']['screen']['height']+'px';
document.getElementById('game').style.width=CONFIG['game']['screen']['width']+'px';
document.getElementsByTagName('title')[0].removeChild(document.getElementsByTagName('title')[0].childNodes[0]);
document.getElementsByTagName('title')[0].appendChild(document.createTextNode(LANG['page']['title']));
