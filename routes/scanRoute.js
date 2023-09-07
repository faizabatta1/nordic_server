const express = require('express')
const router = express.Router()
const PostalScan = require('../models/PostalScan')
const Handlebars = require('handlebars')
const puppeteer = require('puppeteer')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/drivers/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

router.get('/scans',async (req,res) =>{
  try{
    let scans = await PostalScan.find()
    return res.status(200).json(scans)
  }catch(error){
    return res.status(500).json(error.message)
  }
})

router.post('/scans',upload.single('violation'),async (req,res) =>{
  try{
    console.log(req.body)
    const {
      number,
      pnid,
      reason
    } = req.body

    const browser = await puppeteer.launch({
      headless: 'new',
      args:['--no-sandbox']
    });
    const page = await browser.newPage();

    // Load the HTML template
    const htmlTemplate = fs.readFileSync('templates/postal.html', 'utf8');
    
    // Replace placeholders with dynamic data
    const template_data = {
      pnid: pnid,
      number: number,
      reason: reason,
      date: new Date(+Date.now().toString()).toLocaleString(),
      image: process.env.BASE_URL + req.file.path.split('public')[1].replaceAll('\\','/')
    
      
  };
  const filledTemplate = Handlebars.compile(htmlTemplate)(template_data);
  let filename = `postal_${Date.now()}.pdf`

  // Generate PDF from filled template
  await page.setContent(filledTemplate);
  await page.pdf({ path: `./public/postals/${filename}`, format: 'A4' });
    let postal = new Postal({
      violationNumber: number,
      pnid: pnid,
      reason: reason,
      link: process.env.BASE_URL + 'postals/' + filename,
      image: process.env.BASE_URL + req.file.path.split('public')[1].replaceAll('\\','/')
    })

    await postal.save()
    await browser.close();
    return res.sendStatus(200)
  }catch(error){
    return res.status(500).json(error.message)
  }
})

router.put('/scans/:id',async (req,res) =>{
  try{
    await PostalScan.updateOne({ _id: req.params.id },req.body)
    return res.sendStatus(200)
  }catch(error){
    return res.status(500).json(error.message)
  }
})

router.delete('/scans/:id',async (req,res) =>{
  try{
    await PostalScan.deleteOne({ _id: req.params.id })
    return res.sendStatus(200)
  }catch(error){
    return res.status(500).json(error.message)
  }
})

router.delete('/scans',async (req,res) =>{
  try{
    await PostalScan.deleteMany({})
    return res.sendStatus(200)
  }catch(error){
    return res.status(500).json(error.message)
  }
})


module.exports = router