import express  from "express";
import cors  from "cors";

import { loadBackend } from "./backend/index.js";
import { handler } from "./frontend/build/handler.js";

var app = express();

app.use(cors());

var port = process.env.PORT || 12345;

app.use(express.json());

loadBackend(app);
app.use(handler);

app.listen(port,()=>{
    console.log(`Server ready in port ${port}`);
});




