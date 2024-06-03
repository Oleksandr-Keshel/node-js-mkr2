const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const kadryRouter = require('./routers/kadry.route');
const app = express();
const PORT = 3000;

const startScheduleJobs = require('./jobs');

mongoose
  .connect('mongodb://127.0.0.1:27017/mkr2')
  .then(() => {
    console.log('Connected to DB');
    startScheduleJobs();
  })

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toUTCString()}] ${req.method}: ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({
      status: 200,
      data: {
        message: "Node.js Authors&Articles app"
      }
  })
});

app.use("/kadrys", kadryRouter);

//Сatching the 404 and forwarding to the Error handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

// Error handler
app.use((err, req, res, next) => {
  const erorrStatus = err.status || 500;
  console.error(`------!!!!!!!! [${new Date().toUTCString()}] ${req.method}: ${req.path}. Error(${erorrStatus}): ${err.message} !!!!!!!!-------`, );
  res.status(erorrStatus).send({
      status: erorrStatus,
      error: err
  });
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
