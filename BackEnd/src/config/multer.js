import express from 'express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function(require, file, cb){
        cb(null,"uploads/")
    },
    filename: function(require, file, cb){
        cb(null,Date.now()+ path.extname(file.originalname))
    }
})

const upload = multer({storage});

export default upload