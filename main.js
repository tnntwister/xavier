"use strict";

var myArgs = process.argv.slice(2);

const { Magneto, Xavier } = require("./src/xavier.js");

const magnet = new Magneto();
const fx = new Xavier(magnet);

try {
	fx.formatVCard();
} catch (error) {
	console.error(error);
}
  