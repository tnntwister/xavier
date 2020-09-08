"use strict";
/**
 * manage input/output
 */
class Magneto
{
    constructor()
    {
        this.args = process.argv.slice(2);
        this.config = require('../config/config')
        this.pathDirectory = this.config.defaultDirectory
        this.vcfPath = ''
        this.pdfPath = ''
        this.outputDirectory = this.config.defaultDirectory

    }

    setVcfPath(){
        if(this.args[0]){
            this.vcfPath = this.args[0]; 
        } else {
            throw new Error('No vcf file defined')
        }
    }

    getVcfPath(){
        return this.vcfPath;
    }

    buildVcfPath(filename = 'contacts.vcf', dirPath = false){
        if (dirPath != false){
            this.pathDirectory = dirPath
        } 
        
        this.vcfPath = this.pathDirectory + filename;
    }

    buildOutputPdfPath(filename = 'contacts.pdf', dirPath = false){
        if (dirPath != false){
            this.outputDirectory = dirPath
        } 
        
        this.pdfPath = this.outputDirectory + filename;
    }
}

/**
 * format vcf into pdf
 */
class Xavier
{
    constructor(builder)
    {
        this.builder = builder
        this.builder.buildVcfPath()
        this.builder.buildOutputPdfPath()

        const PdfPrinter = require('../node_modules/pdfmake/src/printer');
        
        this.fonts = {
            Roboto: {
                normal: 'fonts/Roboto-Regular.ttf',
                bold: 'fonts/Roboto-Medium.ttf',
                italics: 'fonts/Roboto-Italic.ttf',
                bolditalics: 'fonts/Roboto-MediumItalic.ttf'
            }
        };
        this.printer = new PdfPrinter(this.fonts);
        this.doc = "";
    }

    formatVCard() {
        const vCard = require('vcard-js');
        const MagnetoSpawn = this.builder
        const Printer = this.printer
        const fs = require('fs');
               
        vCard.readFile(this.builder.vcfPath, function(err, json) {
            if (json == null){
                throw 'le json est vide'
                return false
            }
            
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
            
            // console.log(json, body);
        
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

            var pdfDoc = Printer.createPdfKitDocument(docDefinition);
            pdfDoc.pipe(fs.createWriteStream(MagnetoSpawn.pdfPath));
            pdfDoc.end();
        
        
        });
    }
}


module.exports = {
    Magneto,
    Xavier
};
