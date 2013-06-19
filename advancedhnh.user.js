// ==UserScript==
// @name         Advanced HnH user script
// @description  Ein paar Verschönerungen am sowieso schon schönen HnH
// @namespace    http://tud.hicknhack.org/
// @author       vapaex
// @license      none
// @include      http://tud.hicknhack.org/forum/*
// @include      http://127.0.0.1/hnh/*
// @grant        none
// @version      0.0.3
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==



// ------------------------------ <KONFIGURATION> ------------------------------


// ---------- <LAYOUT> ----------

// Überschrift, statt "tud.hicknhack.org"
// So sieht man besser, ob das Script geladen ist
// leerer String oder auskommentieren: keine Änderung
// var HNH_HEADLINE = 'tud.hicknhack.org*';

// HTML-Titel aus aktueller Seite auslesen
var HNH_HTML_TITLE = true;

// Präfix und Suffix für HTML-Titel
// setzt HNH_HTML_TITLE = true voraus
var HNH_HTML_TITLE_PREFIX = '';
var HNH_HTML_TITLE_SUFFIX = ' - HnH';

// rechte Seitenleiste ausblenden
var HNH_HIDE_SIDEBAR = true;

// Formular in Spoiler anzeigen
var HNH_FORM_SPOILER = true;

// Formular standardmäßig ausblenden
// setzt HNH_FORM_SPOILER = true voraus
var HNH_HIDE_FORM = true;

// ---------- </LAYOUT> ---------


// ---------- <THREADÜBERSICHT> ----------

// Format der Beitragsanzahl in der Threadübersicht ändern
var HNH_CHANGE_NUMBER_FORMAT = true;

// "Gestern" und "Heute" hervorheben
var HNH_HIGHLIGHT_TODAY_YESTERDAY = true;

// Seitennavigation nochmal unterhalb der Threadübersicht anzeigen
var HNH_CLONE_PAGE_NAVIGATION = true;

// besuchte Threads in Cookies speichern und hervorheben
var HNH_ENABLE_COOKIE_FEATURES = true;

// ---------- </THREADÜBERSICHT> ---------


// ---------- <BEITRAGSANSICHT> ----------

// Links ordentlich anzeigen
var HNH_FIX_LINKS = true;

// zitierten Text, "[x]" und "[ ]" hervorheben
// dauert eine Weile bei sehr langen Threads
// CSS-Regeln können weiter unten bearbeitet werden
var HNH_HIGHLIGHT_PATTERNS = true;

// Links anonymisieren
var HNH_ANONYMIZE_LINKS = true;

// Präfix für anonymisierte Links
var HNH_ANONYMOUS_LINK_PREFIX = 'http://dontknow.me/at/';

// leere Überschrift-Divs verstecken
var HNH_HIDE_EMPTY_HEADLINES = true;

// Anker für jeden Beitrag hinzufügen
var HNH_ADD_ANCHORS = true;

// ---------- <BEITRAGSANSICHT> ----------


// ---------- <TASTENKÜRZEL> ----------

// Die folgenden Tastenkürzel sollten, abhängig vom Browser,
// mit Alt+X, Alt+Shift+X oder Shift+Escape X funktionieren

// Tastenkürzel für Voransicht- und Speichern-Button
var HNH_SHORTCUTS_SUBMIT = true;
var HNH_SHORTCUT_PREVIEW = 'p';
var HNH_SHORTCUT_SAVE = 's';

// Tastenkürzel, um ganz nach oben und zu scrollen
var HNH_SHORTCUTS_SCROLL = true;
var HNH_SHORTCUT_SCROLL_TOP = 't';
var HNH_SHORTCUT_SCROLL_BOTTOM = 'b';

// Tastenkürzel, um Formular ein- bzw. auszublenden
// setzt HNH_FORM_SPOILER = true voraus
var HNH_SHORTCUT_TOGGLE_FORM = 'f';

// Tastenkürzel für häufig verwendete Phrasen
var HNH_SHORTCUTS_PHRASES = false;
var HNH_SHORTCUTS = {
	'x': 'Hier könnte Ihr Text stehen!',
	'e': '[x] Ersti'
};

// ---------- </TASTENKÜRZEL> ---------


// ---------- <CSS> ----------

// Allgemeine CSS-Regeln
var HNH_CSS_GLOBAL = '\
	* { \
		font-family: monospace !important; \
	} \
	\
	/* Formular-Spoiler */ \
	#togglediv { \
		background-color: #d9d8c6; \
		font-weight: bold; \
		margin-top: 5px; \
		padding-left: 2px; \
	} \
	\
	/* zitierter Text */ \
	.body .hnh_quote, .body .hnh_quote a { \
		color: #666; \
		font-style: italic; \
	} \
	\
	/* [x] */ \
	.body .hnh_check { \
		color: #070; \
	} \
	\
	/* [ ] */ \
	.body .hnh_nocheck { \
		color: #a00; \
	} \
	\
	.body .hnh_questioncheck { \
		color: #650; \
	} \
	\
	/* Tastenanzeige bei häufig verwendeten Phrasen */ \
	span.key { \
		font-family: monospace; \
		border: 0.2em solid; \
		border-color: #ddd #bbb #bbb #ddd; \
		padding: 0 0.4em; \
		color: #000 !important; \
		background-color: #eee; \
		white-space: nowrap; \
	} \
	\
	/* CSS für "Heute", "Gestern" und ältere Beiträge in der Threadübersicht */ \
	#threads .topic a { font-weight: normal; } \
	#threads .hnh_today { color: #000 !important; } \
	#threads .hnh_yesterday { color: #333 !important; } \
	#threads .hnh_older { color: #333 !important; font-weight: normal; } \
	\
	/* Trennzeile in Threads */ \
	tr.hnh_sep#read { background-color: #a5baa5; } \
	tr.hnh_sep#unread { background-color: #bda2a5; } \
	tr.hnh_sep td { padding: 2px; font-weight: bold; border-top: 1px solid #000; } \
';


// ---------- </CSS> ---------


// ---------- <SONSTIGES> ----------

// Cookie-Name
var HNH_COOKIE_COUNT_NAME = 'hnh_count';

// Trennsymbole für Serialisierung
var HNH_SERIALIZE_SEPARATOR_1 = ':';
var HNH_SERIALIZE_SEPARATOR_2 = ',';

// ---------- </SONSTIGES> ---------


// ------------------------------ </KONFIGURATION> -----------------------------



// ------------------------------ <FUNKTIONSAUFRUFE> ------------------------------


$(document).ready(function() {
	
	hnhInit();
	
});


// ------------------------------ </FUNKTIONSAUFRUFE> -----------------------------



// ------------------------------ <FEATURE-FUNKTIONEN> ------------------------------


// Allgemeines
function hnhInit() {
	// bottom-Anker
	$('body').append($(document.createElement('a')).attr('id', 'bottom'));
	
	// globale CSS
	var s = document.createElement('style');
	s.appendChild(document.createTextNode(HNH_CSS_GLOBAL));
	$('head').append(s);
	
	// Features
	if (typeof HNH_HEADLINE !== 'undefined' && HNH_HEADLINE.length > 0) hnhChangeHeadline();
	if (typeof HNH_HTML_TITLE !== 'undefined' && HNH_HTML_TITLE) hnhHtmlTitle();
	if (typeof HNH_HIDE_SIDEBAR !== 'undefined' && HNH_HIDE_SIDEBAR) hnhHideSidebar();
	if (typeof HNH_FORM_SPOILER !== 'undefined' && HNH_FORM_SPOILER) hnhFormSpoiler();
	if (typeof HNH_CHANGE_NUMBER_FORMAT !== 'undefined' && HNH_CHANGE_NUMBER_FORMAT) hnhChangeNumberFormat();
	if (typeof HNH_CLONE_PAGE_NAVIGATION !== 'undefined' && HNH_CLONE_PAGE_NAVIGATION) hnhClonePageNavigation();
	if (typeof HNH_FIX_LINKS !== 'undefined' && HNH_FIX_LINKS) hnhFixLinks();
	if (typeof HNH_HIGHLIGHT_TODAY_YESTERDAY !== 'undefined' && HNH_HIGHLIGHT_TODAY_YESTERDAY) hnhHighlightTodayYesterday();
	if (typeof HNH_HIGHLIGHT_PATTERNS !== 'undefined' && HNH_HIGHLIGHT_PATTERNS) hnhHighlightPatterns();
	if (typeof HNH_SHOW_IMAGES !== 'undefined' && HNH_SHOW_IMAGES) hnhShowImages();
	if (typeof HNH_SHORTCUTS_SUBMIT !== 'undefined' && HNH_SHORTCUTS_SUBMIT) hnhRegisterShortcutsSubmit();
	if (typeof HNH_SHORTCUTS_SCROLL !== 'undefined' && HNH_SHORTCUTS_SCROLL) hnhRegisterShortcutsScroll();
	if (typeof HNH_SHORTCUTS_PHRASES !== 'undefined' && HNH_SHORTCUTS_PHRASES) hnhRegisterShortcutsPhrases();
	if (typeof HNH_ENABLE_COOKIE_FEATURES !== 'undefined' && HNH_ENABLE_COOKIE_FEATURES) hnhCookieFeatures();
	if (typeof HNH_HIDE_EMPTY_HEADLINES !== 'undefined' && HNH_HIDE_EMPTY_HEADLINES) hnhHideEmptyHeadlines();
	if (typeof HNH_ADD_ANCHORS !== 'undefined' && HNH_ADD_ANCHORS) hnhAddAnchors();
}


// Ändert die Überschrift, falls konfiguriert
function hnhChangeHeadline() {
	$('td.title div.title').html(HNH_HEADLINE);
}


// Ersetzt den HTML-Titel durch den aktuellen Thread bzw. die aktuelle Kategorie
function hnhHtmlTitle() {
	window.top.document.title = HNH_HTML_TITLE_PREFIX
		+ $('.content .navigation a:last-child').each(function() {
			$(this).html($(this).html().replace(/^\"(.*)\"$/, '$1'));
		}).last().html()
		+ HNH_HTML_TITLE_SUFFIX;
}


// Versteckt die rechte Seitenleiste, die das Login-Formular beinhaltet
function hnhHideSidebar() {
	$('table.site td.sidebar').hide();
	
	$('td.title div.navigation').append('<div class="showhidesidebar"></div><div clear="both"></div>\n');
	
	var tlink = document.createElement('a');
	$(tlink).attr('href', 'javascript:void(0)').html('+').click(function() {
		$('table.site td.sidebar').toggle();
	});
	
	$('.showhidesidebar').append(tlink);
	
	// CSS
	$('.showhidesidebar').css('float', 'right');
}


// Packt das Formular in einen Spoiler
function hnhFormSpoiler() {
	var form = $('form#new_forum_message');
	if (typeof HNH_HIDE_FORM !== 'undefined' && HNH_HIDE_FORM && $('textarea#forum_message_body').text().length == 0) form.hide();
	
	form.before('<div id="togglediv"><a href="javascript:void(0);" id="togglelink">Formular anzeigen/ausblenden</a></div>\n');
	$('#togglelink').click(function() {
		// unfocus
		$(this).blur();
		
		if (form.is(':hidden')) {
			form.slideDown('down');
			$('form#new_forum_message textarea')[0].focus();
			$('html, body').animate({ 'scrollTop': $('#togglediv').offset().top }, 'slow');
		}
		else {
			form.slideUp('slow');
		}
	});
	$('#togglelink').attr('accesskey', HNH_SHORTCUT_TOGGLE_FORM);
}


// Ändert das Format der Beitragszahl in der Threadliste
function hnhChangeNumberFormat() {
	// Kopf- und Fußzeile verbreitern
	var oHead = $('div#threads table.foren thead th:nth-child(2)');
	var oFoot = $('div#threads table.foren tfoot td:nth-child(1)');
	oHead.attr('colspan', oHead.attr('colspan') > 0 ? oHead.attr('colspan') + 1 : 2);
	oFoot.attr('colspan', oFoot.attr('colspan') > 0 ? oFoot.attr('colspan') + 1 : 2);
	
	$('div#threads table.foren tbody td:nth-child(2)').each(function(index) {
		var text = $(this).html();
		var arr = text.match(/([0-9]+)\s*\(([0-9]+)\)/);
		var td1 = td2 = '&nbsp;';
		if (arr) {
			td1 = arr[2];
			td2 = arr[1];
		}
		else {
			td2 = text;
		}
		$(this).html(td1);
		$(this).after('<td>' + td2 + '&nbsp;</td>');
	});
	$('div#threads table.foren tbody td:nth-child(3)').css('border-left', '1px solid #000');
}


// Hebt Zeilen mit "Gestern" und "Heute" in der Threadliste hervor
function hnhHighlightTodayYesterday() {
	var n = HNH_CHANGE_NUMBER_FORMAT ? 4 : 3;
	
	$('div#threads table.foren tbody td:nth-child(' + n + ')').each(function(index) {
		var text = $(this).html();
		
		if (text.match(/^Heute/))
			$(this).parent().find('td, td a').addClass('hnh_today');
		else if (text.match(/^Gestern/))
			$(this).parent().find('td, td a').addClass('hnh_yesterday');
		else
			$(this).parent().find('td, td a').addClass('hnh_older');
	});
}


// Zeigt die Seitennavigation nochmal unterhalb der Threadübersicht an
function hnhClonePageNavigation() {
	$('#threads .navigation').after($('#threads .pagination').clone());
}


// Zeigt Links in Beiträgen ordentlich an
function hnhFixLinks() {
	$('table.foren tbody tr.message td.text div.body a').each(function(index) {
		var href = $(this).attr('href');
		var text = $(this).html();
		var tld = href.replace(/^(https?|ftp):\/\/(.*\.)*(.*?\..*?)\/.*$/, '$3');
		
		// "&" korrigieren
		href = href.replace(/&(amp;)+/g, '\&');
		text = text.replace(/&(amp;)+/g, '\&');
		
		// Erkennen, ob eine Beschreibung angegeben wurde
		var mode = 0;
		var arrDesc = text.match(/^(.*?)\s\-\s(.*)$/);
		var arrInt = href.match(/^(http):\/\/tud\.hicknhack\.org\/forum\/messages\/([0-9]+)$/);
		
		// TODO andere interne Links (tud.hicknhack.org/.*) erkennen und auswerten
		
		if (arrDesc) mode++;
		if (arrInt) mode += 2;
		
		switch (mode) {
			case 0: // externer Link ohne Beschreibung
				// keine Änderung
				break;
			
			case 1: // externer Link mit Beschreibung
				text = arrDesc[2] + ' (' + tld + ')';
				break;
			
			case 2: // interner Link ohne Beschreibung
				text = 'Thread ' + arrInt[2] + ' (HnH)';
				break;
			
			case 3: // interner Link mit Beschreibung
				text = arrDesc[2] + ' (HnH)';
				break;
		}
		
		if (!arrInt && typeof(HNH_ANONYMIZE_LINKS !== 'undefined') && HNH_ANONYMIZE_LINKS) {
			// externen Link anonymisieren
			href = HNH_ANONYMOUS_LINK_PREFIX + href;
		}
		
		$(this).attr('href', href);
		$(this).html(text);
		$(this).attr('title', $(this).attr('href'));
	});
}


// Stellt u.a. zitierte Zeilen anders dar
function hnhHighlightPatterns() {
	$('table.foren tbody tr.message td.text div.body').each(function(index) {
		var result = correctBreaks($(this).html());
		
		result = result.replace(/^(&gt;.*$)/gm, '<span class="hnh_quote">$1</span>');
		result = result.replace(/^(\[[xX]\].*)$/gm, '<span class="hnh_check">$1</span>');
		result = result.replace(/^(\[\s+\].*)$/gm, '<span class="hnh_nocheck">$1</span>');
		result = result.replace(/^(\[[\?]\].*)$/gm, '<span class="hnh_questioncheck">$1</span>');
		
		$(this).html(result);
	});
}


// Bilder anzeigen
function hnhShowImages() {
	$('table.foren tbody tr.message td.text div.body a').each(function(index) {
		var href = $(this).attr('href');
		if (href.match(/\.(jpe?g|png)$/)) {
			$(this).html('<img src="' + href + '" width="100" />');
		}
	});
}


// Registriert die konfigurierten Tastenkürzel für die Submit-Buttons
function hnhRegisterShortcutsSubmit() {
	$('input[type="submit"][value="Voransicht"]').attr('accesskey', HNH_SHORTCUT_PREVIEW);
	$('input[type="submit"][value="Thema anlegen"],[value="Beitrag hinzufügen"]').attr('accesskey', HNH_SHORTCUT_SAVE);
}


// Registriert die konfigurierten Tastenkürzel zum Scrollen nach oben oder unten
function hnhRegisterShortcutsScroll() {
	$('td.content div.navigation').append('<div class="topbottomlinks"></div><div clear="both"></div>\n');
	
	var tlink = document.createElement('a');
	$(tlink).attr('href', '#top').html('↑');
	
	var blink = document.createElement('a');
	$(blink).attr('href', '#bottom').html('↓');
	
	$('.topbottomlinks').append(tlink);
	$('.topbottomlinks').append(' ');
	$('.topbottomlinks').append(blink);
	
	// Tastenkürzel nur für die ersten beiden Links setzen
	var firstdiv = $('.topbottomlinks').slice(0, 1);
	firstdiv.find('a:nth-child(1)').attr('accesskey', HNH_SHORTCUT_SCROLL_TOP);
	firstdiv.find('a:nth-child(2)').attr('accesskey', HNH_SHORTCUT_SCROLL_BOTTOM);
	
	// CSS
	$('.topbottomlinks').css('float', 'right');
}

// Registriert die konfigurierten Tastenkürzel für Phrasen
// noch buggy, verträgt sich wahrscheinlich nicht mit dem HnH-Script, welches die Eingaben überprüft
function hnhRegisterShortcutsPhrases() {
	$('form.new_forum_message table.form tr:nth-child(4)').after('<tr><td class="left">Phrasen:</td><td><div class="shortcuts" id="shortcuts"></div></td></tr>');
	
	for (var key in HNH_SHORTCUTS) {
		if (HNH_SHORTCUTS.hasOwnProperty(key)) {
			var link = document.createElement('a');
			$(link).attr('href', 'javascript:void(0);');
			$(link).html(HNH_SHORTCUTS[key]);
			$(link).attr('accesskey', key);
			$(link).attr('title', HNH_SHORTCUTS[key]);
			$(link).click(function(e) {
				taAppendText($(this).attr('title') + '\n');
			});
			
			$('#shortcuts').append('<span class="key">' + key + '</span>');
			$('#shortcuts').append(link);
			$('#shortcuts').append(' ');
		}
	}
	
	// CSS
	$('form.new_forum_message table.form div.shortcuts a').css('color', '#efdfad');
}


// Speichert gelesene Threads im Cookie und markiert sie entsprechend in der Threadübersicht
function hnhCookieFeatures() {
	// Cookies lesen
	var cookieCountVal = getCookie(HNH_COOKIE_COUNT_NAME);
	var countArr = new Object();
	if (cookieCountVal) countArr = hnhDeserialize(cookieCountVal);
	
	if ($('td.content table.foren tr.message').length > 0) {
		
		// Thread-Detailansicht
		
		var now = Math.round(new Date().getTime() / 1000);
		
		var colspan = 2;
		
		// Thread-ID und Anzahl der Beiträge holen
		var threadId = parseInt($('#forum_message_thread_id').val());
		var postCount = $('tr.message').length;
		var readCount = 0;
		var unreadCount = postCount;
		
		if (threadId > 0) {
			if (countArr[threadId] != null) {
				// Eintrag im Cookie vorhanden
				
				readCount = countArr[threadId];
				unreadCount = postCount - readCount;
				
				// Anzahl der gesehenen und ungesehenen Beiträge anzeigen
				$('tr.message').first().before('<tr class="hnh_sep" id="read"><td colspan="' + colspan + '">[x] gesehen (' + readCount + '/' + postCount + ')</td></tr>');
				
				if (unreadCount > 0) $('tr.message').slice(-unreadCount).first().before('<tr class="hnh_sep" id="unread"><td colspan="' + colspan + '">[ ] gesehen (' + unreadCount + '/' + postCount + ')</td></tr>');
				else $('tr.message').last().after('<tr class="hnh_sep" id="unread"><td colspan="' + colspan + '">[ ] gesehen (0/' + postCount + ')</td></tr>');
			}
			else {
				// kein Eintrag im Cookie vorhanden
				
				$('tr.message').first().before('<tr class="hnh_sep" id="unread"><td colspan="' + colspan + '">[ ] gesehen (' + postCount + '/' + postCount + ')</td></tr>');
			}
			
			// neuen Wert für Cookie setzen
			countArr[threadId] = postCount;
		}
		
	}
	else {
		
		// Thread-Übersicht
		
		// Anzahl der beobachteten Threads mit ungelesenen Beiträgen
		var unreadThreadsCount = 0;
		
		$('div#threads table.foren tbody tr').each(function(index) {
			var href = $(this).find('div.topic a').attr('href');
			var threadId = href.substring(16, href.length);
			var postCount = parseInt($(this).find('td:nth-child(3)').text());
			
			var readCount = 0;
			if (countArr[threadId] != null) {
				readCount = countArr[threadId];
			}
			
			// Spalte mit Optionen hinzufügen
			if (typeof HNH_SHOW_OPTIONS_COLUMN !== 'undefined' && HNH_SHOW_OPTIONS_COLUMN) {
				$(this).find('td:last-child').after('<td><i>(to do)</i></td>');
				$(this).find('td:last-child').css('border-left', '1px solid #000');
			}
			
			if (readCount > 0) {
				// der Thread wurde schon mal gelesen
				
				$(this).find('div.topic').prepend('[x] ');
				
				if (readCount < postCount) {
					// einige Beiträge im Thread wurden noch nicht gelesen
					
					$(this).find('div.topic').append(' [' + (postCount - readCount) + ']');
					$(this).find('td a').attr('href', $(this).find('td a').attr('href') + '#unread');
					$(this).find('td a').css({ 'font-weight': 'bold' });
					
					unreadThreadsCount++;
				}
				else {
					// der Thread wurde komplett gelesen
					
					$(this).find('td a').attr('href', $(this).find('td a').attr('href') + '#bottom');
				}
			}
			else {
				// der Thread wurde noch nicht gelesen
				
				$(this).find('div.topic').prepend('[ ] ');
			}
		});
		
		// Anzahl der beobachteten Threads mit ungelesenen Beiträgen im HTML-Titel anzeigen
		if (unreadCount > 0) $('title').html('(' + unreadThreadsCount + ') ' + $('title').html());
		
	}
	
	// Cookies schreiben
	setCookie(HNH_COOKIE_COUNT_NAME, hnhSerialize(countArr), null, null, '/');
}


// Versteckt leere head-Divs in Threads
function hnhHideEmptyHeadlines() {
	$('.content .message .head').each(function() {
		if ($(this).text().length < 1)
			$(this).hide();
	});
}


// Fügt jedem Beitrag einen Anker hinzu
// ACHTUNG: kann z. B. im "Schöne Frauen"-Thread sehr lange dauern
function hnhAddAnchors() {
	// Anker für jeden Artikel
	var i = 1;
	$('tr.message').each(function() {
		// Voransicht eines neuen Beitrags wird nicht berücksichtigt
		if ($(this).attr('id') != 'msg') {
			$(this).find('td:first').attr('id', 'hnh' + i);  // tr hat schon eine ID
			$(this).find('div.date').prepend('<a href="#hnh' + i + '">#' + i + '</a>\n');
			i++;
		}
	});
	
	// an entsprechende Stelle scrollen, falls Anker-Link angegeben
	var hash = window.location.hash;
	if (hash.length > 0) if ($(hash).length > 0) $('html, body').scrollTop($(hash).offset().top);
}


// ------------------------------ </FEATURE-FUNKTIONEN> -----------------------------



// ------------------------------ <HILFSFUNKTIONEN> ------------------------------


// Fügt einen Text in der Textarea ein
function taAppendText(s) {
	var ta = $('textarea#forum_message_body');
	
	if (ta.html().length > 0) ta.html(ta.html().replace(/\n$/, '')).append('\n' + s);
	else ta.html(s);
	
	ta.focus();
	scrollToBottom(ta);
}


// Scrollt bis ans Ende z.B. einer Textarea
function scrollToBottom(obj) {
	obj.scrollTop(obj[0].scrollHeight - obj.height());
}

// Optimiert Zeilenumbrüche
function correctBreaks(s) {
	return s.replace(/[\r\n]*<br.*?>[\r\n]*/g, '<br />\n');
}


// Setzt einen Cookie
function setCookie(name, value, domain, expires, path, secure) {
	var cook = name + "=" + unescape(value);
	cook += (domain) ? "; domain=" + domain : "";
	cook += (expires) ? "; expires=" + expires : "";
	cook += (path) ? "; path=" + path : "";
	cook += (secure) ? "; secure" : "";
	document.cookie = cook;
}
 

// Liest einen Cookie aus
function getCookie(name) {
    var i = 0;
    var search = name + "=";
    while (i < document.cookie.length) {
        if (document.cookie.substring(i, i + search.length) == search) {
            var end = document.cookie.indexOf(";", i + search.length);
            end = (end > -1) ? end : document.cookie.length;
            var cook = document.cookie.substring(i + search.length, end);
            return unescape(cook);
        }
        i++;
    }
    return null;
}


// Löscht einen Cookie
function deleteCookie(name, domain, path) {
    var cook = name + "=; expires=Thu, 01-Jan-70 00:00:01 GMT";
    cook += (domain) ? "domain=" + domain : "";
    cook += (path) ? "path=" + path : "";
    document.cookie = cook;
}


// Serialisierung eines assoziativen Arrays
function hnhSerialize(arr) {
	var res = new String();
	for (var key in arr) {
		res += key + HNH_SERIALIZE_SEPARATOR_1 + arr[key] + HNH_SERIALIZE_SEPARATOR_2;
	}
	
	// letztes Trennzeichen abschneiden
	res = res.substr(0, res.length - HNH_SERIALIZE_SEPARATOR_2.length);
	
	return res;
}


// Deserialisierung eines assoziativen Arrays (int)
function hnhDeserialize(str) {
	var res = new Object();

	var arr = str.split(HNH_SERIALIZE_SEPARATOR_2);
	for (var key in arr) {
		var arr2 = arr[key].split(HNH_SERIALIZE_SEPARATOR_1);
		res[arr2[0]] = parseInt(arr2[1]);
	}

	return res;
}


// ------------------------------ </HILFSFUNKTIONEN> -----------------------------
