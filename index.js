import express from "express";
import multer from "multer";

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => { 
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const filename= Date.now() + "-" + file.originalname;
    cb(null,filename);
},
});



const filefilter = (req,file,cb) => {
    if(file.mimetype.startwith("image")) {
        cb(null,true);
    }else{
        cb(new Error("only image file"),false)
    };
}
const upload = multer({ storage,filefilter});  

app.post("/upload",upload.array("image",6),(req, res) => {
    res.send("File uploaded successfully!");
});

app.listen(3005, () => {
    console.log("server is running...");
});  