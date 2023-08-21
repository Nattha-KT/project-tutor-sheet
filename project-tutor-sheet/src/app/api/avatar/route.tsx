import express, { Request, Response } from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import { Readable } from 'stream';
import path from 'path';

const app = express();
const port = 3000;

// app.use(bodyParser.json());
// app.use(methodOverride('_method'));  
app.set('view engine', 'ejs');  //which allows you to render dynamic HTML templates on the server side

// const connection = mongoose.connect('mongodb+srv://NatthaKT:080245@cluster0.iitgtbj.mongodb.net/testDb?retryWrites=true&w=majority');

const conn = mongoose.connection;

// Initialize GridFS
let gfs: Grid.Grid;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define your upload route
app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const readableStream = new Readable();
  readableStream.push(req.file.buffer);
  readableStream.push(null);

  const writeStream = gfs.createWriteStream({
    filename: req.file.originalname,
  });

  readableStream.pipe(writeStream);

  writeStream.on('close', (file) => {
    return res.status(201).json({ fileId: file._id });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
