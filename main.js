"use strict";

var myArgs = process.argv.slice(2);

const { Magneto, Xavier } = require("./src/xavier.js");

const magnet = new Magneto();
const fx = new Xavier(magnet);

/*

const fonts = {
	Roboto: {
		normal: 'fonts/Roboto-Regular.ttf',
		bold: 'fonts/Roboto-Medium.ttf',
		italics: 'fonts/Roboto-Italic.ttf',
		bolditalics: 'fonts/Roboto-MediumItalic.ttf'
	}
};

const PdfPrinter = require('./node_modules/pdfmake/src/printer');
const printer = new PdfPrinter(fonts);
const fs = require('fs');
const vcfPath = './data/personal/Contacts-2017-10-06.vcf';
 */

try {
	fx.formatVCard();
} catch (error) {
	console.error(error);
}
  