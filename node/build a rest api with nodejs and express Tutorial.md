# Getting started: initialization
npm init -y    
npm install --save-dev nodemon
npm install --save express
# `package.json`
add 
- "type": "module",
  "scripts": {
    "start": "nodemon index.js"
  },

# Create index.js
- //const express=require('express');
-  import express from "express";
   const app = express();
   const PORT = 8355;
   const HOST = "0.0.0.0";
   app.listen(PORT, HOST, () => {
     console.log(`Server running on port http://localhost:${PORT}`);
   });
   
   app.get("/", async (req, res) => {
     res.send("helloworld");
   });





 Node.js Web API Tutorial
