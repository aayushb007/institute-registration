let express = require('express');
let mysql = require('mysql2/promise');
let body_parser = require('body-parser');


let app = express();
app.use(body_parser.json())
const dbConfig = { // Store into ENV 
    host: 'localhost',
    user: 'root',
    password: 'aayush',
    database: 'test'
  };  
  
 
  async function getConnection() {
    return await mysql.createConnection(dbConfig);
  }


app.get('/degrees', async (req, res) => {
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT * FROM degrees');
    res.json(rows);
  });
  app.get('/exams', async (req, res) => {
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT * FROM exams');
    res.json(rows);
  });
  
  
  app.get('/degrees', async (req, res) => {
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT * FROM degrees');
    res.json(rows);
  });

  app.get('/exams', async (req, res) => {
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT * FROM exams');
    res.json(rows);
  });

  app.post('/register', async (req, res) => {
    const {
      name, type_id, board_id, medium_id, class_category_id,
      standard_id, subject_id, university_id, degree_id, exam_id
    } = req.body;
  
    const conn = await getConnection();
  
    // 1. Create institute
    const [result] = await conn.execute(
      'INSERT INTO institutes (name, type_id) VALUES (?, ?)', [name, type_id]
    );
    const institute_id = result.insertId;
  
    // 2. Register details
    await conn.execute(
      `INSERT INTO institute_registrations
        (institute_id, board_id, medium_id, class_category_id, standard_id, subject_id, university_id, degree_id, exam_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [institute_id, board_id, medium_id, class_category_id, standard_id, subject_id, university_id, degree_id, exam_id]
    );
  
    res.json({ message: 'Institute registered successfully', institute_id });
  });
  

app.get('/test',async (req,res)=>{
   const conn = await getConnection();
   console.log("Connection Successfull");
})

app.listen(3000,()=>{
    console.log('Listening on PORT');
})