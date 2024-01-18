const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const db = require("./db/db")

const app = express();

const port = 4000;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    const query = "SELECT * FROM employee";

    try {

        const data = await db.query(query, [], (error, results) => {
            if (error) {
              console.error('Error en la consulta:', error);
            } else {
              console.log('Resultados:', results.rows);
            }
        });

        res.json(data.rows)


    } catch(err) {
        console.log(err)
        res.json("Error")
    }

});


app.post("/code", async (req, res) => {
    const {code} = req.body;
    const query = "SELECT * FROM employee WHERE unique_code = $1";

    try {

        const data = await db.query(query, [code], (error, results) => {
            if (error) {
              console.error('Error en la consulta:', error);
            } else {
              console.log('Resultados:', results.rows);
            }
        })

        res.json(data.rows);

    } catch(err) {
        console.log(err);
    }


})


app.post("/getprods", async (req, res) => {
  const {orgId} = req.body

  const query = "SELECT * FROM product WHERE org_id = $1";

  try {

    const data = await db.query(query, [orgId], (error, results) => {
        if (error) {
          console.error('Error en la consulta:', error);
        } else {
          console.log('Resultados:', results.rows);
        }
    })

    res.json(data.rows);

  } catch(err) {
    console.log(err);
  }


})


app.post("/newprod", async (req, res) => {

  const {name, provider, org_id, area} = req.body
  const query = `INSERT INTO product (name, provider, org_id, area) VALUES ($1, $2, $3, $4)`

  try {

    await db.query(query, [name, provider, org_id, area], (error, results) => {
      if (error) {
        console.log(error)
      } else {
        console.log("Result: ", results)
      }
    })

    res.json("OK")

  } catch(err) {
    console.log(err)
  }
})


app.post("/allareas", async (req, res) => {

  const {org_id} = req.body

  const query = "SELECT area_name FROM areas WHERE org_id = $1";
  
  try {

    const data = await db.query(query, [org_id], (error, results) => {
      if(error) {
        console.log(error)
      } else {
        console.log("Result: ", results)
      }
    })

    res.json(data.rows);


  } catch(err) {
    console.log(err)
  }
})


app.post("/savelist", async (req, res) => {
  
  const {list} = req.body

  const query = "INSERT INTO shopping_list (created_at, needed, urgent, product_id) VALUES (now(), $1, $2, $3)"

  try {

    for (let i = 0;i < list.length; i++) {
      if (list[i].state == "RO"){
        await db.query(query, ["true", "false", list[i].id], (error, results) => {
          if(error) {
            console.log(error)
          } else {
            console.log("Result: ", results)
          }
        })
      } else if(list[i].state == "OS") {
        await db.query(query, ["false", "true", list[i].id], (error, results) => {
          if(error) {
            console.log(error)
          } else {
            console.log("Result: ", results)
          }
        })
      }
    }

    res.json("OK")
    

  } catch(err) {
    console.log(err)
  }


})


app.listen(port, () => console.log(`Listening to port: ${port}`));
