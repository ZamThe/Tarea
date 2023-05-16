



const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proyecto'
});

conexion.connect(function(error) {
    if (error) {
        throw error;
    } else {
        console.log("Conexión establecida correctamente.");
    }
});

app.get('/api/proyecto', (req, res) => {
    conexion.query('SELECT * FROM cliente', (error, filas) => {
        if (error) {
            throw error;
        } else {
            res.send(filas);
        }
    });
});

app.post('/api/proyecto', (req,res)=>{
    let data = {
        id_cc:req.body.id_cc, 
        Nombre:req.body.Nombre, 
        Telefono:req.body.Telefono, 
        Correo:req.body.Correo, 
        Ciudad:req.body.Ciudad
    };
    let sql = "INSERT INTO cliente (id_cc, Nombre, Telefono, Correo, Ciudad) VALUES (?, ?, ?, ?, ?)";
    let values = [data.id_cc, data.Nombre, data.Telefono, data.Correo, data.Ciudad];
   

    conexion.query(sql, values, function(error, filas){
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    });  
});


app.delete('/api/proyecto/:id_cc', (req, res) => {
    const id_cc = req.params.id_cc;
  
    conexion.query('DELETE FROM cliente WHERE id_cc = ?', [id_cc], (error, results) => {
      if (error) {
        throw error;
      } else {
        res.send(results);
      }
    });
  });


  app.put('/api/proyecto/:id_cc', (req, res) => {
    const id_cc = req.params.id_cc;
    const { Nombre, Telefono, Correo, Ciudad } = req.body;
  
    conexion.query(
      'UPDATE cliente SET Nombre = ?, Telefono = ?, Correo = ?, Ciudad = ? WHERE id_cc = ?',
      [Nombre, Telefono, Correo, Ciudad, id_cc],
      (error, results) => {
        if (error) {
          throw error;
        } else {
          res.send(results);
        }
      }
    );
  });




    

app.listen(3000, () => {
    console.log('El servidor está funcionando en el puerto 3000');
});