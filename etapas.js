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
    conexion.query('SELECT * FROM etapas', (error, filas) => {
        if (error) {
            throw error;
        } else {
            res.send(filas);
        }
    });
});

app.post('/api/proyecto', (req,res)=>{
    let data = {
        	
        id_etapa:req.body.id_nompro, 
        Nombre_tapa:req.Nombre_tapa, 
        descripcion:req.body.descripcion, 
        fecha:req.body.fecha, 
    };
    let sql = "INSERT INTO etapas ( id_etapa, Nombre_tapa, descripcion, fecha) VALUES (?, ?, ?, ?, ?)";
    let values = [data.id_etapa, data.Nombre_tapa, data.descripcion, data.fecha];
   

    conexion.query(sql, values, function(error, filas){
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    });  
});


app.delete('/api/proyecto/:id_etapa', (req, res) => {
    const Iid_etapa = req.params.id_etapa;
  
    conexion.query('DELETE FROM cliente WHERE id_etapa = ?', [id_etapa], (error, results) => {
      if (error) {
        throw error;
      } else {
        res.send(results);
      }
    });
  });


  app.put('/api/proyecto/:id_etapa', (req, res) => {
    const id_etapa = req.params.id_etapa;
    const { nombre, Telefono, Correo, Ciudad } = req.body;
  
    conexion.query(
      'UPDATE proyecto SET nombre = ?, materia = ?, descrpcion = ? WHERE id_etapa = ?',
      [nombre, materia, descrpcion,  id_etapa],
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