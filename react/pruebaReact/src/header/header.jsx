import "./header.css";

function Header() {
  return (
    <>
      <header>
        <div className="buscador">
          <div className="busqueda">
            <i class="lupa bi bi-search"></i>
            <input type="text" placeholder="Buscar"/>
          </div>
          <button>
            <i class="bi bi-send-fill"></i>
          </button>
        </div>
        <div className="links">
          <a className="active" href="">Dashboard</a>
          <a href="">Historial</a>
          <a href="">Ambientes</a>
        </div>
        <div>
          <div className="switch">
            <button className="moon">
              <img src="src\assets\moon.svg" alt=""  />
            </button>
            <button className="sun">
              <img src="src\assets\sun.svg" alt=""  />
            </button>
          </div>

          <div>
            <h5>Joe Lopez</h5>
            <img width={'30px'} height={'30px'} src="src\assets\OnePiece.jpg" alt="" className="perfil" />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;