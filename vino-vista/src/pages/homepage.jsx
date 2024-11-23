import Hero from "../components/Hero";
import Menu from "../components/Menu";

const Homepage = () => {
  return (
    <div className="relative min-h-screen">
      <div className="fixed top-0 left-0 w-1/5 h-full z-10">
        <Menu />
      </div>

      <div className="w-full min-h-screen">
        <Hero />
      </div>
    </div>
  );
};

export default Homepage;
