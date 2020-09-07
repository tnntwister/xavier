"use strict";
/**
 * manage input/output
 */
class Magneto
{
    constructor()
    {
        this.args = process.argv.slice(2);
        this.vcfPath = './data/personal/Contacts-2017-10-06.vcf';

    }

    setVcfPath(){
        if(this.args[0]){
            this.vcfPath = this.args[0]; 
        }
    }

    getVcfPath(){
        return this.vcfPath;
    }
}

/**
 * format vcf into pdf
 */
class Xavier
{
    constructor()
    {
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

    formatVCard(text) {
        return "Whatever";
    }
}


module.exports = {
    Magneto,
    Xavier
};
