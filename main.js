"use strict";
const vCard = require('vcard-js');

var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

const { Magneto, Xavier } = require("./src/xavier.js");

const magnet = new Magneto();
const fx = new Xavier();

/*
var Xavier = require('./src/xavier');

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


vCard.readFile(vcfPath, function(err, json) {
	var body = new Map();
	var docDefinition = {
		content: [],
		styles: {
			header: {
				fontSize: 18,
				bold: true,
				margin: [0, 0, 0, 10]
			},
			subheader: {
				fontSize: 16,
				bold: true,
				margin: [0, 10, 0, 5]
			},
			tableExample: {
				margin: [0, 5, 0, 15]
			},
			tableHeader: {
				bold: true,
				fontSize: 13,
				color: 'black'
			}
		},
		defaultStyle: {
			// alignment: 'justify'
		}
	};
	
	// sort by category
	json.forEach(function(vCard){
		var vCardJ = vCard.toJSON();
		var vCardItems = vCardJ[1];
		
		vCardItems.forEach(function(value){
			if(value[0] === 'categories' && !body.has(value[3])){				
				body.set(value[3], []);
			}
		});		
	});

	body.forEach(function(row, cat){
		var headers;

		switch(cat){
			case 'Amis':
			case 'Travail':
			case 'professionnels':
			case 'Jeux':
			case 'Famille':
			default:
				headers = ['Nom', 'Email', 'Tél', 'Adresse'];
				break; 
		}

		row.push(headers);

		json.forEach(function(vCard){
			var vCardJ = vCard.toJSON();
			var vCardItems = vCardJ[1];
			var values = ['','','','']; // nom email tél adresse
			var cat_row = vCardItems.find(function(vci){
				return (vci[0] === 'categories');
			}); 
			if (cat_row !== undefined && cat_row[3] !== cat){
				return false;
			}
			
			vCardItems.forEach(function(value){
				// console.log(value);
				if (['fn'].indexOf(value[0]) !== -1 && value[3] !== undefined){
					values[0] = value[3];					
				}
				if (['email'].indexOf(value[0]) !== -1 && value[3] !== undefined){
					values[1] = value[3];					
				}
				if (['tel'].indexOf(value[0]) !== -1 && value[3] !== undefined){
					values[2] = value[3];					
				}
				if (['adr'].indexOf(value[0]) !== -1 && value[3] !== undefined){
					values[3] = value[3]
					.replace(/^[;]+(.+)[;]?$/i,'$1')
					.replace(/;/g,'\n');					
				}
			});	

			row.push(values);		
		});

		body.set(cat, row);
	});
	
	// console.log(body);

	body.forEach(function(row, cat){
		docDefinition.content.push({
			text: cat, 
			fontSize: 14, 
			bold: true, 
			//pageBreak: 'before', 
			margin: [0, 0, 0, 8]});
		docDefinition.content.push({
			style: 'tableExample',
			color: '#444',
			table: {
				widths: [120, 180, 100,100],
				headerRows: 1,
				keepWithHeaderRows: 1,
				body:  row
			}
		});
	});

	var pdfDoc = printer.createPdfKitDocument(docDefinition);
	pdfDoc.pipe(fs.createWriteStream('data/personal/main.pdf'));
	pdfDoc.end();


}); */

