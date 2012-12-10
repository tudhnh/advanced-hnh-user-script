// ==UserScript==
// @name         Advanced HnH user script
// @description  Ein paar Verschönerungen am sowieso schon schönen HnH
// @namespace    http://tud.hicknhack.org/
// @author       vapaex
// @license      none
// @include      http://tud.hicknhack.org/forum/*
// @version      0.0.1-1
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==


// -------------------- <KONFIGURATION> --------------------


// Überschrift, statt "tud.hicknhack.org"
// So sieht man besser, ob das Script geladen ist
// leerer String oder auskommentieren: keine Änderung
//var HNH_HEADLINE = 'tud.hicknhack.org*';

// CSS für "Heute"
var HNH_CSS_TODAY = { 'color': '#000' };

// CSS für "Gestern"
var HNH_CSS_YESTERDAY = { 'color': '#333' };

// CSS für weder "Heute" noch "Gestern"
var HNH_CSS_OLDER = { 'color': '#555' };

// CSS für erkannte Zitate
var HNH_CSS_QUOTE = { 'color': '#666', 'font-style': 'italic' };

// CSS für erkannte Checkbox [x]
var HNH_CSS_CHECK = { 'color': '#090' };

// CSS für erkannte leere Checkbox [ ]
var HNH_CSS_NOCHECK = { 'color': '#a00' };


// -------------------- </KONFIGURATION> -------------------


// -------------------- <FUNKTIONSAUFRUFE> --------------------


(function() {
	
	// Aufrufe können auskommentiert werden
	
	// ---------- <ALLGEMEINES> ----------
	
	// Überschrift ändern
	hnhChangeHeadline();
	
	// ---------- </ALLGEMEINES> ---------
	
	
	// ---------- <THREADÜBERSICHT> ----------
	
	// Format der Beitragsanzahl ändern
	hnhChangeNumberFormat();
	
	// "Gestern" und "Heute" hervorheben
	hnhHighlightTodayYesterday();
	
	// ---------- </THREADÜBERSICHT> ---------
	
	
	// ---------- <BEITRAGSANSICHT> ----------
	
	// Links ordentlich anzeigen
	hnhFixLinks();
	
	// zitierten Text, "[x]" und "[ ]" hervorheben
	// Dauert eine Weile bei sehr langen Threads
	hnhCssPatternText();
	
	// Bilder anzeigen
	// Ganz billige Implementierung
	//showImages();
	
	// ---------- </BEITRAGSANSICHT> ---------
	
})();


// -------------------- </FUNKTIONSAUFRUFE> -------------------



// -------------------- <FEATURE-FUNKTIONEN> --------------------


// Ändert die Überschrift, falls konfiguriert
function hnhChangeHeadline() {
	if (typeof HNH_HEADLINE !== 'undefined' && HNH_HEADLINE.length > 0)
		$('td.title div.title').html(HNH_HEADLINE);
}

// Ändert das Format der Beitragszahl in der Threadliste
function hnhChangeNumberFormat() {
	$('div#threads table.foren tbody td:nth-child(2)').each(function(index) {
		var text = $(this).html();
		if (text.match(/([0-9]+)\s*\(([0-9]+)\)/)) {
			$(this).html(text.replace(/([0-9]+)\s*\(([0-9]+)\)/, '$2 / $1'));
		}
	});
}

// Hebt Zeilen mit "Gestern" und "Heute" hervor
function hnhHighlightTodayYesterday() {
	$('div#threads table.foren tbody td:nth-child(3)').each(function(index) {
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
function hnhCssPatternText() {
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
	
	$('div.body span.quote').css(HNH_CSS_QUOTE);
	$('div.body span.quote *').css(HNH_CSS_QUOTE);
	$('div.body span.check').css(HNH_CSS_CHECK);
	$('div.body span.nocheck').css(HNH_CSS_NOCHECK);
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


// -------------------- </FEATURE-FUNKTIONEN> -------------------
