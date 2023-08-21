const PDFDocument = require('pdfkit');
const fs = require('fs')
const Group = require('../models/Group')
const uuid = require("uuid");
const bucket = require("../utils/firebase");
const PDF = require('../models/PDF')
const jwt = require('jsonwebtoken')
const User = require('../models/usersModel')
const Handlebars = require('handlebars')
const puppeteer = require('puppeteer')



const createNewDriver = async (req,res) =>{
    try{
        console.log(req.headers)
        console.log(req.body)
        const { data, token } = req.headers
        const information = JSON.parse(decodeURIComponent(data))

        console.log(information)

        let values = Object.values(req.body).map(e => JSON.parse(e))

        const groupedData = values.reduce((acc, obj) => {
            if (!acc[obj.form]) {
                acc[obj.form] = [];
            }

            acc[obj.form].push(obj);
            return acc;
        }, {});


        const browser = await puppeteer.launch({
            headless: 'new',
            args:['--no-sandbox']
        });
        const page = await browser.newPage();

        // Load the HTML template
        const htmlTemplate = fs.readFileSync('templates/driver.html', 'utf8');
        let decodedToken = jwt.verify(token,'your-secret-key')
        console.log(decodedToken)
        let user = await User.findOne({ _id: decodedToken.userId })

        const imagesAlias = req.headers.files
        /*
         * 
         *{
            fieldnameOriginal1: ['ax1','ax2','ax3'],
            fieldnameOriginal2: ['ac1','ac2'],
         }
         savedImages = []
         originals = {}
         Object.keys(req.headers.files).map(original) =>
            req.headers.files[original].map(alias) =>
                req.files.filter(x => where x.filedname == alias) =>
                     savedImages.push(x.path)

                     originals[original] = savedImages
         *
         */

        // Replace placeholders with dynamic data
        const template_data = {
            location: information.locations,
            car: information.boardNumber + "  " + information.privateNumber,
            shift: information.day + " - " + information.period,
            violations: information.trafficViolations,
            date: information.date,
            user: user.name + ' - ' + user.accountId,
            rows: [...groupedData['First'],...groupedData['Second']].map(e => {
                return {
                    title: e.title,
                    status: e.value != (e.whenToGetDescription ? 'Ja' : 'Nei') ? 'Nei' : 'Ja',
                    notes: e.value != 'Ja' && e.value != 'Nei' ? e.value : 'XXX',
                    positive: e.value != 'Ja' && e.value != 'Nei' ? 'red' : 'green'
                };
            }),
            images: req.files.map(file =>{

                return {
                    fieldname: decodeURIComponent(file.fieldname),
                    path: process.env.BASE_URL + file.path.split('public')[1].replaceAll('\\','/')
                }
            }),
        };
        const filledTemplate = Handlebars.compile(htmlTemplate)(template_data);

        let filename = `driver_${Date.now()}.pdf`

        // Generate PDF from filled template
        await page.setContent(filledTemplate);
        await page.pdf({ path: `./public/profiles/${filename}`, format: 'A4' });

        let now = new Date();
        now = now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        let correctDate = new Date(now)

        const year = correctDate.getFullYear();
        const month = (correctDate.getMonth() + 1).toString().padStart(2, '0');
        const day = correctDate.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        let pdf = new PDF({
            name: filename,
            link: process.env.BASE_URL + 'profiles/' + filename,
            userId: decodedToken.userId,
            createdAt:formattedDate
        })

        await pdf.save()
        console.log(`PDF saved: ${process.env.BASE_URL + 'profiles/' + filename}`);


        await browser.close();
        res.status(200).json({ message: 'PDF generated and saved successfully' });
    }catch (error){
        console.log(error.message)
        res.status(500).send(error.message)
    }
}

const getAllDrivers = async (req,res) =>{
    return res.status(200).json([])
}

const getDriverFile = async () =>{
    try{

    }catch (error){

    }
}

module.exports = { createNewDriver, getAllDrivers, getDriverFile }