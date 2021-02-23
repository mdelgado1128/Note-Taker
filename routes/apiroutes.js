const router = require('express').Router();
const fs = require('fs');
const uuid = require("uuid");
const path = require ("path");


router.get('/api/notes',(req,res) => {
    fs.readFile('./db/db.json', "utf8",  (err,data) => {
     if (err) throw err
     
      res.json(JSON.parse(data))
    
    })
   
})

router.post('/api/notes',(req,res) => {
  fs.readFile('./db/db.json', "utf8",  (err,data) => {
    if (err) throw err
    let pnote = JSON.parse(data);
   let incomingNote = req.body;
    incomingNote.id = uuid.v4();
    pnote.push(incomingNote);
    
       
     fs.writeFile('./db/db.json', JSON.stringify(pnote), (err) => {
        if (err) throw err
        res.json(pnote);
    });


     
    });
  });


  router.delete("/api/notes/:id", (req, res) => {
    const incomingNote = req.params.id;
    fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
      if (err) throw err;
      const dnote = JSON.parse(data);
      for (let i = 0; i < dnote.length; i++) {
        if (incomingNote === dnote[i].id) {
          dnote.splice(i, 1);
        }
      }
      fs.writeFile(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(dnote),
        (err) => {
          if (err) throw err;
          res.status(200).send(true);
        }
      );
    });
  });
  
//  router.delete("/notes/:id", (req, res) => {
//     let noteId = req.params.id;
//     console.log(noteId);
//      fs.readFile("/db/db.json", (err, data) =>  {
//       let fileJson = JSON.parse(data);
//         if (err) throw err;
//         fileJson.forEach((element) => {
//             if (element.id === noteId) {
//                 fileJson.splice(...element, 1)
//             }
//         })
//     })





module.exports = router;
