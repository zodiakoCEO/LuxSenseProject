//get, post
//Pasar los datos de checkdevice por variables de entorno
import { parse } from "path";
import { checkDevice } from "../service/checkDevice.js";

export const getIndex = (req, res) => {
  res.send('Ruta funcionando correctamente.')
  console.log('rute Ok.')
}

export const getDevices = async (req, res) => {
  const isDeviceConnected = await checkDevice("ESP32", "192.168.0.172");
  if (isDeviceConnected) {
     res.status(200).json({
    msg: "Dispositivo conectado.",
    status: true,
  });
  console.log({
    msg: "Dispositivo conectado.",
    status: true,
  })}else{
 res.status(500).json({
      msg: "Error, dispositivo no encontrado",
      status: false,
    });
  }
  };

export const postDashboardData = (req, res) => { 
  const {saludo} = req.body
  const parsedSaludo = JSON.parse(saludo)
  console.log(parsedSaludo)
  res.status(200).json('Gracias por enviar')
}