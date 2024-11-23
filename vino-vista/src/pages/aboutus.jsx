import Menu from "../components/Menu";
import Card from "../components/Card";
import lia from "../assets/lia.png";
import liliana from "../assets/liliana.png";

const AboutUs = () => {
  return (
    <div className="relative min-h-screen bg-ghost-white">
      <div className="fixed top-0 left-0 w-1/5 h-full z-10">
        <Menu />
      </div>
      
      <div className="ml-[20%] flex justify-center items-top space-x-8 p-4 "> 
        <Card 
          title="Lia Cardoso" 
          description="I am a full-stack developer with a passion for wine. I am excited to share my knowledge with you!" 
          image={lia} 
        />
        <Card 
          title="Liliana Ribeiro" 
          description="I am a full-stack developer with a passion for wine. I am excited to share my knowledge with you!" 
          image={liliana} 
        />
      </div>
    </div>
  );
};

export default AboutUs;
