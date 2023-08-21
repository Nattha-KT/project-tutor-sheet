// pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server"
import { GridFsStorage } from 'multer-gridfs-storage';
import crypto from 'crypto';
import path from 'path';
import multer from 'multer';
import prisma from "../../../../prisma";
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import  createReadStream  from 'gridfs-stream';
import { Db } from 'mongodb';
import {Grid} from 'gridfs-stream';

    const app = express();

    // Middleware
    app.use(bodyParser.json());
    app.set('view engine', 'ejs');


const mongoURI = "mongodb+srv://NatthaKT:080245@cluster0.iitgtbj.mongodb.net/testDb?retryWrites=true&w=majority";

// Create mongo connection

const conn: mongoose.Connection = mongoose.createConnection(mongoURI);


// Init gfs
let gfs: ReturnType<typeof createReadStream> ;

conn.once('open', () => {
  // Init stream
  gfs = new Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});


const storage = new GridFsStorage({
    url: process.env.DATABASE_URL!, // Replace with your MongoDB URI
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads',
          };
          resolve(fileInfo);
        });
      });
    },
  });
  
  const upload = multer({ storage });



  app.post('/upload', upload.single('file'), (req, res) => {
    // res.json({ file: req.file });
    res.redirect('/');
  });

