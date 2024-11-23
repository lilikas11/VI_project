import logo from "../assets/logo_vino.png";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/fotos-gratis/bela-paisagem-de-um-vinhedo-sob-um-ceu-azul-claro-durante-o-dia_181624-32290.jpg?t=st=1732378905~exp=1732382505~hmac=09080c39364cc257dd74cbcb8f6fcdc89b10bea1f2ac153aadd664d91110b907&w=1380)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center flex justify-end items-center w-full">
        <div className="max-w-md mr-64">
          <h1 className="mb-5 text-5xl font-bold text-center">Welcome to</h1>
          <img
            src={logo}
            className="h-max w-max mx-auto mb-4"
            alt="VinoVista Logo"
          />
          <p className="mb-10 text-2xl text-center">
            Portugal is a top wine producer, crafting around 7 million
            hectoliters of wine yearly. Known for its diversity, it offers
            unique wines like Port, Vinho Verde, and robust reds from native
            grape varieties. The industry is vital for exports, showcasing
            Portugals rich winemaking tradition.
          </p>
          <button className="btn bg-lightgreen btn-lg border-lightgreen">
            <Link to="/statistics-1">Get started!</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
