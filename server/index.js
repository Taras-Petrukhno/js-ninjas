import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import 'dotenv/config';
import path from 'path';

import superheroRouter from './router/superhero-router.js'

import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3001;



app.use('/superhero-images', express.static(path.resolve('public', 'superheroes')));
app.use(cors());
app.use(express.json());
app.use("/superhero", superheroRouter);

const start = async () => {
  try {
    await await mongoose.connect(`mongodb+srv://superheroApp:${process.env.MONGODBPASS}@cluster0.l4rnuwj.mongodb.net/?retryWrites=true&w=majority`);
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();

export default app;
