import ping from "ping";

export const checkDevice = (device, ipAddress) => {
   let result = ping.promise
    .probe(ipAddress)
    .then((res) => {
      if (res.alive) {
        console.log(
          `${device} esta conectado al servidor con la IP:  ${ipAddress}`
        )
        return true;
      } else {
        console.error(`${device} no esta conectado, verifica conexion`);
        return false;
      }
    })
    .catch((error) => {
      console.error("Error al hacer ping al dispositivo:", error.message);
    });

    return result
}; 