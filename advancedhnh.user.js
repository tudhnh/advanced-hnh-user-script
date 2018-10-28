// ==UserScript==
// @name         Advanced HnH user script
// @description  Ein paar Verschönerungen am sowieso schon schönen HnH
// @namespace    https://tud.hicknhack.org/
// @author       vapaex
// @version      0.1.1
// @license      none
// @include      https://tud.hicknhack.org/forum/*
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
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

// besuchte Threads speichern und hervorheben
var HNH_ENABLE_STORAGE_FEATURES = true;

// ---------- </THREADÜBERSICHT> ---------


// ---------- <BEITRAGSANSICHT> ----------

// Links ordentlich anzeigen
var HNH_FIX_LINKS = true;

// zitierten Text, "[x]" und "[ ]" hervorheben
// dauert eine Weile bei sehr langen Threads
// CSS-Regeln können weiter unten bearbeitet werden
var HNH_HIGHLIGHT_PATTERNS = true;

// leere Überschrift-Divs verstecken
var HNH_HIDE_EMPTY_HEADLINES = true;

// Anker für jeden Beitrag hinzufügen
var HNH_ADD_ANCHORS = true;

// SPAM-/Fullquote-Erkennung aktivieren
var HNH_DETECT_SPAM = true;

// Regulärer Ausdruck für SPAM
var HNH_REGEX_SPAM_AUTHOR = /Gutm(ensch(bot)?|aschine) v[0-9.]+/i;
var HNH_REGEX_SPAM_CONTENT = /rassistische? entgleis|es würstelt/i;

// ---------- <BEITRAGSANSICHT> ----------


// ---------- <TASTENKÜRZEL> ----------

// Die folgenden Tastenkürzel sollten, abhängig vom Browser,
// mit Alt+X, Alt+Shift+X oder Shift+Escape X funktionieren

// Tastenkürzel für Voransicht- und Speichern-Button
var HNH_SHORTCUTS_SUBMIT = true;
var HNH_SHORTCUT_PREVIEW = 'p';
var HNH_SHORTCUT_SAVE = 's';

// Tastenkürzel, um ganz nach oben bzw. unten zu scrollen
var HNH_SHORTCUTS_SCROLL = true;
var HNH_SHORTCUT_SCROLL_TOP = ',';
var HNH_SHORTCUT_SCROLL_BOTTOM = '.';

// Tastenkürzel, um Formular ein- bzw. auszublenden
// setzt HNH_FORM_SPOILER = true voraus
var HNH_SHORTCUT_TOGGLE_FORM = 'f';

// Tastenkürzel für häufig verwendete Phrasen
var HNH_SHORTCUTS_PHRASES = true;
var HNH_SHORTCUTS = {
	't': '>TS',
	'd': '[x] dumm',
	'e': '[x] Ersti',
};

// ---------- </TASTENKÜRZEL> ---------


// ---------- <CSS> ----------

// Allgemeine CSS-Regeln
var HNH_CSS_GLOBAL = '\
	/* Allgemeines */ \
	html, body, div, p, span, table, tbody, tr, td, pre, code { cursor: default; } \
	#forum_message_author_name, #forum_message_author_email, #forum_message_head { width: 575px; } \
	\
	/* Formular-Spoiler */ \
	#togglediv { background-color: #d9d8c6; font-weight: bold; margin-top: 5px; padding-left: 2px; } \
	\
	/* Threadübersicht */ \
	#threads .topic a { font-weight: normal; } \
	#threads .hnh_today { color: #000 !important; } \
	#threads .hnh_yesterday { color: #333 !important; } \
	#threads .hnh_older { color: #333 !important; font-weight: normal; } \
	#threads tr.hnh_tracked.hnh_unseen div.topic a { font-weight: bold; } \
	#threads tr.hnh_tracked div.topic .hnh_unread_count { cursor: pointer; } \
	\
	/* >, [x], [ ], [?], ++, --, +1, -1 */ \
	.hnh_quote, .hnh_quote a { color: #666; font-style: italic; } \
	.hnh_quote .hnh_check, .hnh_quote .hnh_nocheck, .hnh_quote .hnh_questioncheck, .hnh_quote .hnh_plus, .hnh_quote .hnh_minus { color: #666; } \
	.hnh_check, span.hnh_tooltip>span .hnh_check { color: #070; } \
	.hnh_nocheck, span.hnh_tooltip>span .hnh_nocheck { color: #a00; } \
	.hnh_questioncheck, span.hnh_tooltip>span .hnh_questioncheck { color: #650; } \
	.hnh_plus, span.hnh_tooltip>span .hnh_plus { color: #070; } \
	.hnh_minus, span.hnh_tooltip>span .hnh_minus { color: #a00; } \
	.hnh_active td.author { background-color: #a5baa5 !important; } \
	\
	/* Tastenanzeige bei häufig verwendeten Phrasen */ \
	span.key { font-family: monospace; border: 0.2em solid; border-color: #ddd #bbb #bbb #ddd; padding: 0 0.4em; color: #000 !important; background-color: #eee; white-space: nowrap; } \
	\
	/* Trennzeile in Threads */ \
	tr.hnh_sep#read { background-color: #a5baa5; } \
	tr.hnh_sep#unread { background-color: #bda2a5; } \
	tr.hnh_sep td { padding: 2px; font-weight: bold; border-top: 1px solid #000; } \
	\
	/* SPAM */ \
	div.hnh_spam_toggle { padding: 2px; font-style: italic; } \
	a.hnh_spam_toggle { color: #999; } \
	div.hnh_spam { display: none; margin-top: 10px; } \
	\
	/* Tooltips */ \
	span.hnh_tooltip { position: relative; text-decoration: underline; cursor: default; }\
	span.hnh_tooltip>span { position: absolute; display: block; opacity: 0; text-decoration: none; cursor: auto; color: #000; font-weight: normal; font-style: normal; background-color: #ffffd7; border: 1px solid #000; padding: 0.2em; width: 640px; bottom: 1.5em; z-index: -1; -webkit-transition-delay: 0.5s; -moz-transition-delay: 0.5s; -o-transition-delay: 0.5s; transition-delay: 0.5s; } \
	span.hnh_tooltip:hover>span { opacity: 1; z-index: 5; -webkit-transition-delay: 0s; -moz-transition-delay: 0s; -o-transition-delay: 0s; transition-delay: 0s; } \
	span.hnh_tooltip>span a { color: #000 !important; } \
	td.author span.hnh_tooltip>span { font-weight: normal; white-space: normal; } \
	\
	/* Overlay */ \
	.overlay { display: none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.85); z-index: 9999; color: #fff; } \
	.overlay textarea { display: block; width: 90%; height: 75%; margin: 5%; margin-top: 50px; margin-bottom: 0; } \
	.overlay button { dispay: inline-block; } \
	.overlay button.submit { margin-left: 5%; } \
';


// ---------- </CSS> ---------


// ---------- <SONSTIGES> ----------

// Name der Count-Variable
var HNH_STORAGE_COUNT_NAME = 'hnh_data';

// ---------- </SONSTIGES> ---------


// ------------------------------ </KONFIGURATION> -----------------------------


// ------------------------------ <FEATURE-FUNKTIONEN> ------------------------------


// Allgemeines
function hnhInit() {
	// top-Anker anpassen
	$('a[name=top]').attr('id', 'top');

	// bottom-Anker
	var b = document.createElement('a');
	b.setAttribute('id', 'bottom');
	document.getElementsByTagName('body')[0].appendChild(b);

	// globale CSS
	var s = document.createElement('style');
	s.appendChild(document.createTextNode(HNH_CSS_GLOBAL));
	document.getElementsByTagName('head')[0].appendChild(s);

	// Features
	if (typeof HNH_HEADLINE !== 'undefined' && HNH_HEADLINE.length > 0) hnhChangeHeadline();
	if (typeof HNH_HTML_TITLE !== 'undefined' && HNH_HTML_TITLE) hnhHtmlTitle();
	if (typeof HNH_HIDE_SIDEBAR !== 'undefined' && HNH_HIDE_SIDEBAR) hnhHideSidebar();
	if (typeof HNH_FORM_SPOILER !== 'undefined' && HNH_FORM_SPOILER) hnhFormSpoiler();
	if (typeof HNH_CHANGE_NUMBER_FORMAT !== 'undefined' && HNH_CHANGE_NUMBER_FORMAT) hnhChangeNumberFormat();
	if (typeof HNH_CLONE_PAGE_NAVIGATION !== 'undefined' && HNH_CLONE_PAGE_NAVIGATION) hnhClonePageNavigation();
	if (typeof HNH_FIX_LINKS !== 'undefined' && HNH_FIX_LINKS) hnhFixLinks();
	if (typeof HNH_DETECT_SPAM !== 'undefined' && HNH_DETECT_SPAM) hnhDetectSpam();
	if (typeof HNH_HIGHLIGHT_TODAY_YESTERDAY !== 'undefined' && HNH_HIGHLIGHT_TODAY_YESTERDAY) hnhHighlightTodayYesterday();
	if (typeof HNH_HIGHLIGHT_PATTERNS !== 'undefined' && HNH_HIGHLIGHT_PATTERNS) hnhHighlightPatterns();
	if (typeof HNH_SHORTCUTS_SUBMIT !== 'undefined' && HNH_SHORTCUTS_SUBMIT) hnhRegisterShortcutsSubmit();
	if (typeof HNH_SHORTCUTS_SCROLL !== 'undefined' && HNH_SHORTCUTS_SCROLL) hnhRegisterShortcutsScroll();
	if (typeof HNH_SHORTCUTS_PHRASES !== 'undefined' && HNH_SHORTCUTS_PHRASES) hnhRegisterShortcutsPhrases();
	if (typeof HNH_ENABLE_STORAGE_FEATURES !== 'undefined' && HNH_ENABLE_STORAGE_FEATURES) hnhStorageFeatures();
	if (typeof HNH_HIDE_EMPTY_HEADLINES !== 'undefined' && HNH_HIDE_EMPTY_HEADLINES) hnhHideEmptyHeadlines();
	if (typeof HNH_ADD_ANCHORS !== 'undefined' && HNH_ADD_ANCHORS) hnhAddAnchors();
}


// Ändert die Überschrift, falls konfiguriert
function hnhChangeHeadline() {
	$('td.title div.title').html(HNH_HEADLINE);
}


// Ersetzt den HTML-Titel durch den aktuellen Thread bzw. die aktuelle Kategorie
function hnhHtmlTitle() {
	var objTitle = $('.content .navigation a:last-child');
	var title = objTitle.first().html().replace(/^\"(.*)\"$/, '$1');
	var htmlTitle = title.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
	objTitle.html(title);
	window.top.document.title = (typeof HNH_HTML_TITLE_PREFIX !== 'undefined' ? HNH_HTML_TITLE_PREFIX : '') + htmlTitle + (typeof HNH_HTML_TITLE_SUFFIX !== 'undefined' ? HNH_HTML_TITLE_SUFFIX : '');
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

	form.before('<div id="togglediv"><a href="javascript:void(0)" id="togglelink">Formular anzeigen/ausblenden</a></div>\n');
	$('#togglelink').click(function() {
		// unfocus
		$(this).blur();

		if (form.is(':hidden')) {
			form.show();
			$('form#new_forum_message textarea')[0].focus();
			$('html, body').animate({ 'scrollTop': $('#togglediv').offset().top }, 'slow');

			if ($('td.content table.foren tr.message').length == 0) {
				$('table.foren').hide();
				$('div.navigation:eq(-1)').hide();
				$('div.pagination').hide();
			}
		}
		else {
			form.hide();

			if ($('td.content table.foren tr.message').length == 0) {
				$('table.foren').show();
				$('div.navigation:eq(-1)').show();
				$('div.pagination').show();
			}
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
		var arrInt = href.match(/^http:\/\/tud\.hicknhack\.org\/forum\/messages\/([0-9]+)(#hnh([0-9]+))?$/);
		var anchorInt = (arrInt !== null && arrInt.length > 3 && typeof arrInt[3] !== 'undefined' ? ' #' + arrInt[3] : '');

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
				text = 'HnH ' + arrInt[1] + anchorInt;
				break;

			case 3: // interner Link mit Beschreibung
				text = arrDesc[2] + ' (HnH ' + arrInt[1] + anchorInt + ')';
				break;
		}

		$(this).attr('href', href);
		$(this).html(text);
		$(this).attr('title', href);
	});
}


// Stellt u.a. zitierte Zeilen anders dar
function hnhHighlightPatterns() {
	var timeRegex = /([0-9]{2}:[0-9]{2}:[0-9]{2})/gm;

	var data = new Object();

	function hnhReplaceTime(match) {
		var key = match.replace(/:/gm, '');
		if (data[key] !== undefined) return '<span class="hnh_tooltip">' + match + '<span>' + data[key] + '</span></span>';
		else return '<span style="text-decoration: line-through;">' + match + '</span>';
	}

	$('table.foren tbody tr.message').each(function(index) {
		var textObj = $(this).find('td.text div.body');
		var authorObj = $(this).find('td.author div.name');
		var isSpam = textObj.hasClass('hnh_spam');
		var isFullquote = textObj.hasClass('hnh_fullquote');

		if (!isFullquote) {
			var result = correctBreaks(textObj.html());
			result = prepareText(result);

			result = result.replace(/^(&gt;.*)$/gm, '<span class="hnh_quote">$1</span>');
			result = result.replace(/(\[x\])/igm, '<span class="hnh_check">$1</span>');
			result = result.replace(/(\[\s+\])/gm, '<span class="hnh_nocheck">$1</span>');
			result = result.replace(/(\[\?\])/gm, '<span class="hnh_questioncheck">$1</span>');
			result = result.replace(/^(\+([0-9]+|\++))/gm, '<span class="hnh_plus">$1</span>');
			result = result.replace(/^(\-([0-9]+|\-+))/gm, '<span class="hnh_minus">$1</span>');

			if (!isSpam) {
				result = result.replace(timeRegex, hnhReplaceTime);
			}

			var author = authorObj.html();
			author = author.replace(timeRegex, hnhReplaceTime);
			authorObj.html(author);
		}

		var date = $(this).find('td.author div.date').html();
		var match = date.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/);

		if (match) {
			var key = match[0].replace(/:/gm, '');
			data[key] = (isSpam ? '<div class="hnh_spam_toggle">' + (isFullquote ? 'Fullquote' : 'SPAM') + '</div>' : result);
		}

		textObj.html(result);
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
	$('form.new_forum_message table.form tr:last-child').before('<tr><td class="left">Phrasen:</td><td><div class="shortcuts" id="shortcuts"></div></td></tr>');

	for (var key in HNH_SHORTCUTS) {
		if (HNH_SHORTCUTS.hasOwnProperty(key)) {
			var link = document.createElement('a');
			$(link).attr('href', 'javascript:void(0)');
			$(link).html(HNH_SHORTCUTS[key]);
			$(link).attr('accesskey', key);
			$(link).attr('title', HNH_SHORTCUTS[key]);
			$(link).click(function(e) {
				taAppendText($(this).attr('title'));
			});

			$('#shortcuts').append('<span class="key">' + key + '</span>');
			$('#shortcuts').append(link);
			$('#shortcuts').append(' ');
		}
	}

	// CSS
	$('form.new_forum_message table.form div.shortcuts a').css('color', '#efdfad');
}


// Speichert gelesene Threads im Storage und markiert sie entsprechend in der Threadübersicht
function hnhStorageFeatures() {
	// Wert aus Storage lesen
	var countVal = localStorage.getItem(HNH_STORAGE_COUNT_NAME);
	var countArr = new Object();
	if (countVal) countArr = hnhDeserialize(countVal);

	if ($('td.content table.foren tr.message').length > 0) {

		// Thread-Detailansicht

		var colspan = 2;
		var objMsg = $('table.foren:last tr.message');

		// Thread-ID und Anzahl der Beiträge holen
		var threadId = parseInt($('#forum_message_thread_id').val());
		var postCount = objMsg.length;
		var readCount = 0;
		var unreadCount = postCount;

		if (threadId > 0) {
			if (countArr[threadId] != null && countArr[threadId] > 0) {
				// Eintrag in Storage vorhanden

				readCount = Math.min(countArr[threadId], postCount);
				unreadCount = postCount - readCount;

				htmlRead = '<tr class="hnh_sep" id="read"><td colspan="' + colspan + '">[x] gesehen (' + readCount + '/' + postCount + ')</td></tr>';
				htmlUnread = '<tr class="hnh_sep" id="unread"><td colspan="' + colspan + '">[ ] gesehen (' + unreadCount + '/' + postCount + ')</td></tr>';

				// Anzahl der gesehenen und ungesehenen Beiträge anzeigen
				objMsg.first().before(htmlRead);

				if (unreadCount > 0) objMsg.slice(-unreadCount).first().before(htmlUnread);
				else objMsg.last().after(htmlUnread);
			}
			else {
				// kein Eintrag im Storage vorhanden

				objMsg.first().before('<tr class="hnh_sep" id="unread"><td colspan="' + colspan + '">[ ] gesehen (' + unreadCount + '/' + postCount + ')</td></tr>');
			}

			// neuen Wert für Storage setzen
			countArr[threadId] = postCount;
		}

		$('td.content table.foren tr.message').on('click', function(e) {
			// Wert aus Storage lesen
			var countVal = localStorage.getItem(HNH_STORAGE_COUNT_NAME);
			var countArr = new Object();
			if (countVal) countArr = hnhDeserialize(countVal);

			if ($(this).hasClass('hnh_active')) { // Zeile aktiv
				// Wert überschreiben
				countArr[threadId] = postCount;

				// Aktiv-Zustand entfernen
				$(this).removeClass('hnh_active');
			}
			else { // Zeile nicht aktiv
				// Wert überschreiben
				countArr[threadId] = parseInt($(this).children('td.author').attr('id').substr(3)) - 1;

				// Zeile hervorheben
				$('td.content table.foren tr.message').removeClass('hnh_active');
				$(this).addClass('hnh_active');
			}

			// Wert in Storage schreiben
			localStorage.setItem(HNH_STORAGE_COUNT_NAME, hnhSerialize(countArr));
		});

		$('td.content table.foren tfoot tr').on('click', function(e) {
			// Wert aus Storage lesen
			var countVal = localStorage.getItem(HNH_STORAGE_COUNT_NAME);
			var countArr = new Object();
			if (countVal) countArr = hnhDeserialize(countVal);

			// Wert überschreiben
			countArr[threadId] = postCount;

			// Zeile hervorheben
			$('td.content table.foren tr.message').removeClass('hnh_active');

			// Wert in Storage schreiben
			localStorage.setItem(HNH_STORAGE_COUNT_NAME, hnhSerialize(countArr));
		});

	}
	else {

		// Thread-Übersicht

		// Anzahl der beobachteten Threads mit ungesehenen Beiträgen
		var unreadThreadsCount = 0;

		$('div#threads table.foren tbody tr').each(function(index) {
			var trObj = $(this);
			var topicObj = $(this).find('div.topic');
			var topicLinkObj = topicObj.find('a');
			var topicAuthorObj = topicObj.find('.author');
			var href = topicLinkObj.attr('href');

			topicAuthorObj.after(' <span class="hnh_unread_count"></span>');
			var topicUnreadCountObj = topicObj.find('.hnh_unread_count');

			var threadId = href.substring(16, href.length);
			var postCount = parseInt($(this).find('td:nth-child(3)').text());

			var readCount = 0;
			var tracked = false;

			if (countArr[threadId] != null) {
				readCount = Math.max(countArr[threadId], 0);
				tracked = true;
			}

			// Spalte mit Optionen hinzufügen
			if (typeof HNH_SHOW_OPTIONS_COLUMN !== 'undefined' && HNH_SHOW_OPTIONS_COLUMN) {
				$(this).find('td:last-child').after('<td><i>(to do)</i></td>');
				$(this).find('td:last-child').css('border-left', '1px solid #000');
			}

			if (tracked) {
				// der Thread wird verfolgt

				$(this).addClass('hnh_tracked');

				topicObj.prepend('<input type="checkbox" id="check' + threadId + '" checked="checked" />');

				if (readCount != postCount) {
					// einige Beiträge im Thread wurden noch nicht gelesen

					$(this).addClass('hnh_unseen');
					topicUnreadCountObj.html('[' + (postCount - readCount) + ']');
					topicLinkObj.attr('href', href + '#unread');

					unreadThreadsCount++;
				}
				else {
					// der Thread wurde komplett gesehen

					topicLinkObj.attr('href', href + '#bottom');
				}
			}
			else {
				// der Thread wird nicht verfolgt

				topicObj.prepend('<input type="checkbox" id="check' + threadId + '" />');
			}

			// Checkbox-Listener
			$('#check' + threadId).change(function() {
				// Wert aus Storage nochmal einlesen, damit aktuell, falls mehrere Tabs geöffnet
				countVal = localStorage.getItem(HNH_STORAGE_COUNT_NAME);
				countArr = new Object();
				if (countVal) countArr = hnhDeserialize(countVal);

				if ($(this).is(':checked')) {
					countArr[threadId] = 0;
					trObj.addClass('hnh_tracked hnh_unseen');
					topicUnreadCountObj.html('[' + postCount + ']');
				}
				else {
					delete countArr[threadId];
					trObj.removeClass('hnh_tracked hnh_unseen');
					topicUnreadCountObj.html('');
				}

				// Wert in Storage schreiben
				localStorage.setItem(HNH_STORAGE_COUNT_NAME, hnhSerialize(countArr));
			});

			// TODO mehrfach verwendeten Code in Funktion auslagern

			topicUnreadCountObj.click(function() {
				trObj.removeClass('hnh_unseen');
				topicUnreadCountObj.html('');

				// Wert aus Storage nochmal einlesen, damit aktuell, falls mehrere Tabs geöffnet
				countVal = localStorage.getItem(HNH_STORAGE_COUNT_NAME);
				countArr = new Object();
				if (countVal) countArr = hnhDeserialize(countVal);

				countArr[threadId] = postCount;

				// Wert in Storage schreiben
				localStorage.setItem(HNH_STORAGE_COUNT_NAME, hnhSerialize(countArr));
			});

			topicLinkObj.mouseup(function(e) {
				if (e.which == 1 || e.which == 2) {
					trObj.addClass('hnh_tracked');
					trObj.removeClass('hnh_unseen');
					topicUnreadCountObj.html('');
					$('#check' + threadId).prop('checked', true);

					countArr[threadId] = postCount;
				}
			});
		});

		// Anzahl der beobachteten Threads mit ungesehenen Beiträgen im HTML-Titel anzeigen
		if (unreadThreadsCount > 0) {
			var titleObj = $('title');
			titleObj.html('(' + unreadThreadsCount + ') ' + titleObj.html());
		}

	}

	// Wert in Storage schreiben
	localStorage.setItem(HNH_STORAGE_COUNT_NAME, hnhSerialize(countArr));
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

	// Anker-Links auswerten
	var hash = window.location.hash;
	if (hash.length > 0) {
		// Beitrag hervorheben
		if (hash.match(/^#hnh[0-9]+$/)) {
			$(hash).parent().addClass('hnh_active');
		}

		// an entsprechende Stelle scrollen, falls Anker-Link angegeben
		hnhScrollTo(hash, true);
	}

	// weiches Scrollen bei Anker-Links
	$('a[href^="#"]').click(function(e) {
		e.preventDefault();
		hnhScrollTo($(this.hash));
	});

	// zum Ende der Seite scrollen, wenn ein neuer Beitrag geschrieben wurde
	var noticeObj = $('#notice');
	if (noticeObj.length > 0 && noticeObj.html().match(/Beitrag wurde gespeichert/)) hnhScrollTo('#bottom');
}


// SPAM-Erkennung und -Beseitigung
function hnhDetectSpam() {
	var count = 0;
	var prevPost = '';

	$('table.foren:last tbody tr.message').each(function(index) {
		var author = $(this).find('td.author').html();
		var head = $(this).find('td.text div.head').html();
		var content = $(this).find('td.text div.body').html();

		var isSpam = (content.replace(/\s/g, '').substr(0, 200).match(/(.{5})(.{0,20}\1){5}/) != null) ||
			(testArr(content.match(/.*google\..*/gi), 2)) ||
			(testArr(content.match(/.*google-suche\<\/title\>.*/gi), 0)) ||
			(content.replace(/\s/g, '').length * 1.6 < content.length) ||
			(testArr(content.match(/.*<\/textarea\>.*/g), 0)) ||
			(compactPost(content).replace(/\s/g, '').length * 7 < content.length) ||
			(content.replace(/[0-9a-zA-Z+\-,\.=\/*]/g, '').replace(/\s/g, '').length > 0.3 * content.length) ||
			author.match(HNH_REGEX_SPAM_AUTHOR) || head.match(HNH_REGEX_SPAM_CONTENT) || content.match(HNH_REGEX_SPAM_CONTENT);
		var isFullQuote = (content.indexOf("Hick'n'Hack F") != -1 && ((testArr(content.match(/.*([0-9]{2}:){2}[0-9]{2}.*/g), 3)) || (testArr(content.replace(/\s/g, '').replace(/\>/g, '').match(/.*news\:\:forum\:\:s.*\:\:wiki.*/gi), 0)))) || (testArr(content.match(/.*Heute.\s([0-9]{2}:){2}[0-9]{2}.*/g), 2));

		if (isSpam || isFullQuote) {
			count++;

			$(this).find('td.text div.body').addClass('hnh_spam');
			if (isFullQuote) {
				$(this).find('td.text div.body').addClass('hnh_fullquote');
				$(this).hide();
			}

			var slink = document.createElement('a');
			$(slink).attr({'href': 'javascript:void(0)', 'class': 'hnh_spam_toggle'}).html(isFullQuote ? ' Fullquote' : 'SPAM').click(function() {
				$(this).parents().eq(1).find('div.hnh_spam').slideToggle();
			});

			$(this).find('td.text div.body').before('<div class="hnh_spam_toggle"></div>').siblings('div.hnh_spam_toggle').append(slink);
		}
		else if (count > 0) {
			// zusammen ausblenden
			//$(this).find('td.text div.head').html('Die vorhergehenden ' + count + ' Beiträge waren SPAM.');

			count = 0;
		}

		prevPost = content;
	});
}


// ------------------------------ </FEATURE-FUNKTIONEN> -----------------------------



// ------------------------------ <HILFSFUNKTIONEN> ------------------------------


// Fügt einen Text in der Textarea ein
function taAppendText(s) {
	var ta = $('textarea#forum_message_body');

	var form = $('form#new_forum_message');
	if (form.is(':hidden')) {
		form.slideDown('down');
		$('form#new_forum_message textarea')[0].focus();
		$('html, body').animate({ 'scrollTop': $('#togglediv').offset().top }, 'slow');
	}

	if (ta.val().length > 0) ta.val(ta.val().replace(/\n$/, '') + '\n' + s);
	else ta.val(s);

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


// Entfernt unnötige Teile aus Beiträgen
function prepareText(s) {
	var arr = s.split('\n');

	for (var i = 0; i < arr.length; i++) {
		if (arr[i].match(/^&gt;.*?$/g)) {
			arr[i] = arr[i].replace(/<\/?i(\s.*?)?>/g, '');
		}
	}

	return arr.join('\n');
}


// Array-Test
function testArr(a, l) {
	if (a == null) return false;
	else if (a.length > l) return true;

	return false;
}


// Herausfiltern unnötiger Zeichen für die SPAM-Erkennung
function compactPost(s){
	var arr = s.replace(/\n+/g, '\n').replace(/>/g,'').replace(/\s+/g, '\n').split('\n');
	var count = 0;
	for (var i = 1; i < arr.length-1; i++) {
		var dupe = false;
		for(var j = 0; j < i; j++){
			if (arr[i] == arr[j]) {
				dupe = true;
				if (i - j < 5) count++;
			}
		}
		if (dupe) arr[i] = '';
		if (count > 6) return '';
	}

	return arr.join('');
}


// Serialisierung eines Objekts
function hnhSerialize(obj) {
	return JSON.stringify(obj);
}


// Deserialisierung eines Objekts
function hnhDeserialize(str) {
	return JSON.parse(str);
}


// Scrollt zu einem Element
function hnhScrollTo(sel, removeHash) {
	var target = $(sel);
	if (target.length > 0) {
		$('html, body').stop().animate({
			'scrollTop': target.offset().top
		}, 500, 'swing', function() {
			if (typeof removeHash !== 'undefined' && removeHash) hnhRemoveHash();
		});
	}
}

// Hash aus URL entfernen
function hnhRemoveHash() {
	history.pushState('', document.title, window.location.pathname);
}

// Objekt nach Schlüssel sortieren
function sortObjectByKey(obj, reverse) {
	var keys = [];
	var objSorted = {};

	for(var key in obj){
		if(obj.hasOwnProperty(key)){
			keys.push(key);
		}
	}

	keys.sort();
	if (typeof reverse !== 'undefined' && reverse) keys.reverse();

	for (var i = 0; i < keys.length; i++) {
		objSorted[keys[i]] = obj[keys[i]];
	}

	return objSorted;
};


// ------------------------------ </HILFSFUNKTIONEN> -----------------------------


// ------------------------------ <FUNKTIONSAUFRUFE> ------------------------------


$(document).ready(function() {

	hnhInit();

	var optionsLink = $('<a></a>').attr('href', 'javascript:void(0)').html('Einstellungen').click(function(e) {
		e.preventDefault();
		openOptions();
	}).insertAfter($('td.title div.navigation>a:last')).before(' :: ');
	var optionsDiv = $('<div></div>').attr('id', 'options').addClass('overlay').appendTo($('body'));
	var optionsHtml = '\
		<textarea id="data"></textarea> \
		<button class="submit">Speichern</button> <button class="close">Abbrechen</button> \
	';
	optionsDiv.html(optionsHtml);

	optionsDiv.click(function(e) {
		if ($(e.target).is('#options')) {
			closeOptions();
		}
	});

	$('button.submit').click(function(e) {
		e.preventDefault();
		localStorage.setItem(HNH_STORAGE_COUNT_NAME, $('#data').val());
		closeOptions();
	});

	$('button.close').click(function(e) {
		e.preventDefault();
		closeOptions();
	});

	$(document).bind('keydown', function(e) {
		if (e.which == 27) {
			e.preventDefault();
			closeOptions();
		};
	});

	function openOptions() {
		var countVal = localStorage.getItem(HNH_STORAGE_COUNT_NAME);

		var obj = hnhDeserialize(countVal);
		obj = sortObjectByKey(obj, true);
		countVal = hnhSerialize(obj);

		$('#data').val(countVal);
		$('#options').fadeIn('fast', function() {
			$('#data').focus().select();
		});
	}

	function closeOptions() {
		$('#options').fadeOut('fast');
	}

	var t = new Date();
	var time = t.toISOString().match(/(\d{2}:\d{2}:\d{2})/)[0];
	$('td.title div.title').css('position', 'relative').append(' <div style="font-size: 50%; display: inline-block; position: absolute; right: 0; bottom: 0;">' + time + '</div>');

});


// ------------------------------ </FUNKTIONSAUFRUFE> -----------------------------
