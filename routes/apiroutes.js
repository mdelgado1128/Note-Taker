const router = require('express').Router();
const fs = require('fs');
const uuid = require("uuid");


router.get('/api/notes',(req,res) => {
    fs.readFile('./db/db.json', "utf8",  (err,data) => {
     if (err) throw err
     console.log(data);
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



module.exports = router;