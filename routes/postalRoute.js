const express = require('express')
const router = express.Router()
const Postal = require('../models/PostalViolation')
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

router.get('/postals',async (req,res) =>{
  try{
    let postals = await Postal.find()
    return res.status(200).json(postals)
  }catch(error){
    return res.status(500).json(error.message)
  }
})

router.post('/postals',upload.single('violation'),async (req,res) =>{
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
  await page.addStyleTag({
    content: '@page { size: auto; }',
})
  // Generate PDF from filled template
  await page.setContent(filledTemplate);
  await page.pdf({ path: `./public/postals/${filename}`,        printBackground: true,});
    let postal = new Postal({
      violationNumber: number,
      pnid: pnid,
      reason: decodeURIComponent(reason),
      link: process.env.BASE_URL + 'postals/' + filename,
      image: process.env.BASE_URL + req.file.path.split('public')[1].replaceAll('\\','/')
    })

    let scan = new PostalScan({
      violationNumber: number,
      pnid: pnid,
      reason: reason,
      link: process.env.BASE_URL + 'postals/' + filename,
      image: process.env.BASE_URL + req.file.path.split('public')[1].replaceAll('\\','/')
    })

    await postal.save()
    await scan.save()
    await browser.close();
    return res.sendStatus(200)
  }catch(error){
    console.log(error.message)
    return res.status(500).json(error.message)
  }
})

router.put('/postals/:id',async (req,res) =>{
  try{
    await Postal.updateOne({ _id: req.params.id },req.body)
    return res.sendStatus(200)
  }catch(error){
    return res.status(500).json(error.message)
  }
})

router.delete('/postals/:id',async (req,res) =>{
  try{
    await Postal.deleteOne({ _id: req.params.id })
    return res.sendStatus(200)
  }catch(error){
    return res.status(500).json(error.message)
  }
})

router.delete('/postals',async (req,res) =>{
  try{
    await Postal.deleteMany({})
    return res.sendStatus(200)
  }catch(error){
    return res.status(500).json(error.message)
  }
})


module.exports = router