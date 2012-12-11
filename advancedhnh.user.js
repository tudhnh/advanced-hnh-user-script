// ==UserScript==
// @name         Advanced HnH user script
// @description  Ein paar Verschönerungen am sowieso schon schönen HnH
// @namespace    http://tud.hicknhack.org/
// @author       vapaex
// @license      none
// @include      http://tud.hicknhack.org/forum/*
// @include      http://127.0.0.1/hnh/*
// @version      0.0.1
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==



// ------------------------------ <KONFIGURATION> ------------------------------


// ---------- <LAYOUT> ----------

// Überschrift, statt "tud.hicknhack.org"
// So sieht man besser, ob das Script geladen ist
// leerer String oder auskommentieren: keine Änderung
var HNH_HEADLINE = 'tud.hicknhack.org*';

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

// ---------- </THREADÜBERSICHT> ---------


// ---------- <BEITRAGSANSICHT> ----------

// Links ordentlich anzeigen
var HNH_FIX_LINKS = true;

// zitierten Text, "[x]" und "[ ]" hervorheben
// dauert eine Weile bei sehr langen Threads
// CSS-Regeln können weiter unten bearbeitet werden
var HNH_HIGHLIGHT_PATTERNS = true;

// Bilder anzeigen
// ganz billige Implementierung
var HNH_SHOW_IMAGES = false;

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

// CSS für "Heute"
var HNH_CSS_TODAY = { 'color': '#000' };

// CSS für "Gestern"
var HNH_CSS_YESTERDAY = { 'color': '#333' };

// CSS für weder "Heute" noch "Gestern"
var HNH_CSS_OLDER = { 'color': '#555' };

// Allgemeine CSS-Regeln
// Greasemonkey vorausgesetzt
var HNH_CSS_GLOBAL = (<><![CDATA[
	
	* {
		font-family: monospace !important;
	}
	
	/* Formular-Spoiler */
	#togglediv {
		background-color: #d9d8c6;
		font-weight: bold;
		margin-top: 5px;
		padding-left: 2px;
	}
	
	/* zitierter Text */
	.body .quote, .body .quote a {
		color: #666;
		font-style: italic;
	}
	
	/* [x] */
	.body .check {
		color: #090;
	}
	
	/* [ ] */
	.body .nocheck {
		color: #a00;
	}
	
	/* Tastenanzeige bei häufig verwendeten Phrasen */
	span.key {
		font-family: monospace;
		border: 0.2em solid;
		border-color: #ddd #bbb #bbb #ddd;
		padding: 0 0.4em;
		color: #000 !important;
		background-color: #eee;
		white-space: nowrap;
	}
		
]]></>).toString();

// ---------- </CSS> ---------


// ------------------------------ </KONFIGURATION> -----------------------------



// ------------------------------ <FUNKTIONSAUFRUFE> ------------------------------


(function() {
	
	hnhInit();
	hnhChangeHeadline();
	if (HNH_HTML_TITLE) hnhHtmlTitle();
	if (HNH_HIDE_SIDEBAR) hnhHideSidebar();
	if (HNH_FORM_SPOILER) hnhFormSpoiler();
	if (HNH_CHANGE_NUMBER_FORMAT) hnhChangeNumberFormat();
	if (HNH_FIX_LINKS) hnhFixLinks();
	if (HNH_HIGHLIGHT_TODAY_YESTERDAY) hnhHighlightTodayYesterday();
	if (HNH_HIGHLIGHT_PATTERNS) hnhHighlightPatterns();
	if (HNH_SHOW_IMAGES) showImages();
	if (HNH_SHORTCUTS_SUBMIT) hnhRegisterShortcutsSubmit();
	if (HNH_SHORTCUTS_SCROLL) hnhRegisterShortcutsScroll();
	if (HNH_SHORTCUTS_PHRASES) hnhRegisterShortcutsPhrases();
	
})();


// ------------------------------ </FUNKTIONSAUFRUFE> -----------------------------



// ------------------------------ <FEATURE-FUNKTIONEN> ------------------------------


// Allgemeines
function hnhInit() {
	// bottom-Anker
	$('body').append($(document.createElement('a')).attr('name', 'bottom'));
	
	// globale CSS
	GM_addStyle(HNH_CSS_GLOBAL);
}


// Ändert die Überschrift, falls konfiguriert
function hnhChangeHeadline() {
	if (typeof HNH_HEADLINE !== 'undefined' && HNH_HEADLINE.length > 0)
		$('td.title div.title').html(HNH_HEADLINE);
}


// Ersetzt den HTML-Titel durch den aktuellen Thread bzw. die aktuelle Kategorie
function hnhHtmlTitle() {
	var arr = $('.content .navigation')[0].textContent.match(/.*\/.*/g);
	var title = arr[arr.length - 1].replace(/^../, '').replace(/\"(.*)\"/, '$1');
	window.top.document.title = HNH_HTML_TITLE_PREFIX + title + HNH_HTML_TITLE_SUFFIX;
}


// Versteckt die rechte Seitenleiste, die das Login-Formular beinhaltet
function hnhHideSidebar() {
	$('table.site td.sidebar').hide();
}


// Packt das Formular in einen Spoiler
function hnhFormSpoiler() {
	var form = $('form#new_forum_message');
	if (HNH_HIDE_FORM) form.hide();
	
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
	// Kopfzeile verbreitern
	$('div#threads table.foren thead th:nth-child(2)').attr('colspan', 2);
	
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
	
	// Fußzeile verbreitern
	$('div#threads table.foren tfoot td:nth-child(1)').attr('colspan', 4);
}


// Hebt Zeilen mit "Gestern" und "Heute" in der Threadliste hervor
function hnhHighlightTodayYesterday() {
	var n = HNH_CHANGE_NUMBER_FORMAT ? 4 : 3;
	
	$('div#threads table.foren tbody td:nth-child(' + n + ')').each(function(index) {
		var text = $(this).html();
		
		if (text.match(/Heute/))
			$(this).parent().find('td, a').css(HNH_CSS_TODAY);
		else if (text.match(/Gestern/))
			$(this).parent().find('td, a').css(HNH_CSS_YESTERDAY);
		else
			$(this).parent().find('td, a').css(HNH_CSS_OLDER);
	});
}


// Zeigt Links in Beiträgen ordentlich an
function hnhFixLinks() {
	$('table.foren tbody tr.message td.text div.body a').each(function(index) {
		var href = $(this).attr('href');
		var text = $(this).html();
		var tld = href.replace(/^(https?|ftp):\/\/(.*\.)*(.*\..*)\/.*$/, '$3');
		
		// "&" korrigieren
		href = href.replace(/&(amp;)+/g, '\&');
		text = text.replace(/&(amp;)+/g, '\&');
		
		// Erkennen, ob Text angegeben wurde
		var regex = /^(.*?)\s\-\s(.*)$/;
		if (text.match(regex)) {
			var desc = text.match(regex)[2];
			text = tld + ' - ' + desc;
		}
		
		$(this).attr('href', href);
		$(this).html(text);
		$(this).attr('title', $(this).attr('href'));
	});
}


// Stellt u.a. zitierte Zeilen anders dar
function hnhHighlightPatterns() {
	$('table.foren tbody tr.message td.text div.body').each(function(index) {
		// Splitten der Nachricht nach Zeilen
		var lines = $(this).html().match(/[^\r\n]+/g);
		
		// Inhalt des Divs neu aufbauen
		var result = '';
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			
			// Quotes hervorheben
			line = line.replace(/^((<br.*>)*(&gt;.*))$/g, '<span class="quote">$1</span>');
			
			// "[x]" und "[ ]" hervorheben
			line = line.replace(/^((<br.*>)*(\[[xX]\].*))$/g, '<span class="check">$1</span>');
			line = line.replace(/^((<br.*>)*(\[\s+\].*))$/g, '<span class="nocheck">$1</span>');
			
			result += line + '\n';
		}
		$(this).html(result);
	});
}


// Bilder anzeigen
function showImages() {
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
			//~ $(link).html(HNH_SHORTCUTS[key] + ' <small>(' + key + ')</small>');
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


// ------------------------------ </FEATURE-FUNKTIONEN> -----------------------------



// ------------------------------ <HILFSFUNKTIONEN> ------------------------------


// Fügt einen Text in der Textarea ein
function taAppendText(s) {
	var ta = $('textarea.forum_message_body');
	
	if (ta.html().length > 0) {
		ta.html(ta.html().replace(/\n$/, '')).append('\n' + s);
	}
	else {
		ta.html(s);
	}
	
	ta.focus();
	scrollToBottom(ta);
}


// Scrollt bis ans Ende z.B. einer Textarea
function scrollToBottom(obj) {
	obj.scrollTop(obj[0].scrollHeight - obj.height());
}


// ------------------------------ </HILFSFUNKTIONEN> -----------------------------
