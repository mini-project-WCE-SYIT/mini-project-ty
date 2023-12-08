import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import { register } from './controllers/auth.js'
import { createPost } from './controllers/posts.js'
import { verifyToken } from './middleware/auth.js'
import User from './models/User.js'
import Post from './models/Post.js'
import { users, posts } from './data/index.js'
import ejs from 'ejs'
import puppeteer from 'puppeteer'

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))
app.use(cors())
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage })

/* ROUTES WITH FILES */
app.post('/auth/register', upload.single('picture'), register)
app.post('/posts', upload.single('picture'), createPost)

/* ROUTES */
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/posts', postRoutes)

app.get('/generate-pdf/:id', async (req, res) => {
  const { id } = req.params

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // Replace the hardcoded placeholder with the actual id
  await page.goto(`http://localhost:3001/posts/generatePdf/${id}`, {
    waitUntil: 'domcontentloaded',
  })
  // Generate a PDF that closely resembles the webpage
  const pdfBuffer = await page.pdf({ format: 'A4' })

  await browser.close()

  res.contentType('application/pdf')
  res.send(pdfBuffer)
})
app.get('/generate-pdf/:startDate/:endDate', async (req, res) => {
  const { startDate, endDate } = req.params;
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`http://localhost:3001/posts/generatePDFForAllUsers/${startDate}/${endDate}`, {
    waitUntil: 'domcontentloaded',
  });
  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();

  res.contentType('application/pdf');
  res.send(pdfBuffer);
});

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
  })
  .catch((error) => console.log(`${error} did not connect`))
