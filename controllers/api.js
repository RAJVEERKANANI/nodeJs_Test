'use strict'


import { Router } from 'express'

const router = Router()
const fileUpload = require('express-fileupload');
// default options
router.use(fileUpload());
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var pdf = require ('pdfkit')
var fs= require('fs')
var PDFParser = require("pdf2json");

let pdfParser = new PDFParser();


var multer  = require('multer')
var upload = multer({ dest: 'uploads/'})


router.post('/pdf', function(req, res) {
  var doc = new pdf;
  doc.pipe(fs.createWriteStream('/home/Desktop/file.pdf'))

  for(var key in req.body) {
    doc.font('Times-Roman')
          .fontSize(20)
          .text(key +" : " + req.body[key]+"\n")
  }
  doc.end();
});

router.post('/upload', function (req, res, next) {
    //add code here to upload file 
    pdfParser.on("pdfParser_dataError", errData => console.log(errData.parserError));
    pdfParser.on("pdfParser_dataReady", pdfData => {
        var response = []
        for(var key in pdfData["formImage"]["Pages"][0]["Fields"]){
            response.push(pdfData["formImage"]["Pages"][0]["Fields"][key]["TU"])
        }
        res.json(response)
    });
    pdfParser.loadPDF("./storage/smart_pdf_1.pdf");
  });

router.all('*', (req, res) => {
  res.status(404).json({
    code: -1,
    error: 'Not found'
  })
})

export default router
