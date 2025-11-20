import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

//Rutas
import dashboardRoutes from './routes/DashboardRoutes.js'

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/",dashboardRoutes);

app.use((res,req,next) => {
    res.status(404).send("No se puede encontrar la pagina.")
})


const PORT = process.env.PORT;
app.listen(PORT,'0.0.0.0', () => {
    console.log(`Corriendo en el puerto`);
});