import Express from 'express'
import Parser from 'body-parser'
// import Compression from 'compression'
// import Multer from 'multer'
import ErrorHandler from 'errorhandler'
import ResponseTime from 'response-time'
import '../env';
import db from './db';
import task from './routes/task';
import cors from 'cors';
import weather from './routes/weather';


const port = process.env.PORT || 3005
const ENV = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const app = Express()

app.use(Parser.json())
app.use(ResponseTime())
app.use(cors())

if (ENV === 'development') {
  app.use(ErrorHandler())
}

app.get('/', (req, res) => res.send('Hello World'))

app.use('/tasks', task);
app.use('/weather', weather);

app.listen(port, () => console.log(`Server started at: http://localhost:${port}`))

export default app;