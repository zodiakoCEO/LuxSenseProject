import "./app.css";

function Main() {
  return (
    <>
      <main>
        <div className="info">
            <div className="info_ambiente">
                <h2>Selecciona un ambiente</h2>
                <div className="iconos">
                    <img src="src\assets\OnePiece.jpg" alt="" />
                    <img src="src\assets\OnePiece.jpg" alt="" />
                    <img src="src\assets\OnePiece.jpg" alt="" />
                    <img src="src\assets\OnePiece.jpg" alt="" />
                    <button className="circle">
                        <i class="bi bi-plus"></i>
                    </button>
                </div>
            </div>
            
            <div className="notificaciones">
                <div className="notificacion notif_1"> {/*todas la notis son card */}
                    <div>
                        <h5>Cocina</h5>
                        <h5>Se regulo la energia suministrada para cumplir con la meta de 35kwh al mes </h5>
                    </div>
                    <i class="bi bi-rocket-takeoff-fill"></i>
                </div>

                <div className="notificacion notif_2">
                    <div>
                        <h5>Sala de estar</h5>
                        <h5>Se regulo la energia suministrada para cumplir con la meta de 35kwh al mes </h5>
                    </div>
                    <i class="danger bi bi-rocket-takeoff-fill"></i>
                </div>

                <div className="notificacion notif_3">
                    <div>
                        <h5>Cocina</h5>
                        <h5>Se regulo la energia suministrada para cumplir con la meta de 35kwh al mes </h5>
                    </div>
                    <i class="danger bi bi-rocket-takeoff-fill"></i>
                </div>

                <button className="more">
                    <i class="bi bi-plus"></i>    
                </button>
            </div>
        </div>

        <div className="main-dashboard">
            <div className="dashboard">
                <div>
                    <h3>Consumo energético </h3>
                    <p>Se ha presentado un consumo energético del <span>75% de la meta este mes</span></p>
                </div>
                <img src="src\assets\GraficoLinear.svg" alt="" />
            </div>
            <div className="adicionales">   
                <h3>Voltaje</h3>
                <div>
                    <img src="src\assets\Grafico1.svg" alt="" />
                    <p>Este mes se han consumido <span className="sp_1">35 voltios</span></p>
                </div>
                <h3>Corriente</h3>
                <div>
                    <img src="src\assets\Grafico2.svg" alt="" />
                    <p>La corriente de este mes ha <span className="sp_2">sido de 45%</span></p>
                </div>
                <h3>Potencia activa</h3>
                <div>
                    <img src="src\assets\Grafico3.svg" alt="" />
                    <p>La potencia activa de este mes <span className="sp_3">ha sido de 50 kW</span></p>
                </div>
            </div>
        </div>
      </main>
    </>
  );
}

export default Main;

// text, img, button, card,