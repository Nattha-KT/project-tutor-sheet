// pages/api/upload.ts
import { NextApiRequest, NextApiResponse } from 'next';
import GridFsStorage from 'multer-gridfs-storage';
import crypto from 'crypto';
import path from 'path';
import multer from 'multer';
import prisma from "../../../../prisma";
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import  createReadStream  from 'gridfs-stream';
import { Db } from 'mongodb';
import Grid from 'gridfs-stream';
import { NextResponse } from "next/server"



const conn = mongoose.createConnection(process.env.DATABASE_URL || '');

// Init gfs
let gfs: any;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
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
  console.log("Console Storage=> ",storage)

  export const POST = async (req: Request, res: Response)=>{
    try{
       
      upload.single('file')(req as any , res as any , (err: any) => {
        //       // const buffer = Buffer.from(req);
              console.log(JSON.stringify(req));
              if (err) {
                return NextResponse.json({message:"Error",err},{status:500});
              }
              return  NextResponse.json({message:"Upload Success",req},{status:200});
            });
        return NextResponse.json({message:"Upload Success",req},{status:200});
        }catch(err){
            return   NextResponse.json({message:"Error",err},{status:500});
        }
    
    }

    // export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    //   try {
    //     upload.single('file')(req as any, res as any, (err: any) => {
    //       // const buffer = Buffer.from(req);
    //       console.log(JSON.stringify(req));
    //       if (err) {
    //         return res.status(500).json({ message: 'Error', err });
    //       }
    //       return res.status(200).json({ message: 'Upload Success' });
    //     });
    //   } catch (err) {
    //     return res.status(500).json({ message: 'Error', err });
    //   }
    // };
  

  

 

