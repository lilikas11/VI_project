import Menu from "../components/Menu";
import Card from "../components/Card";
import ProjectCard from "../components/ProjectCard";
import lia from "../assets/lia.png";
import liliana from "../assets/liliana.png";

const AboutUs = () => {
  return (
    <div className="relative min-h-screen bg-ghost-white">
      <div className="fixed top-0 left-0 w-1/5 h-full z-10">
        <Menu />
      </div>
      
      {/* Seção dos Cards das Pessoas */}
      <div className="ml-[20%] flex justify-center items-top space-x-8 p-4"> 
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

      <div className="ml-[20%] p-4 mt-4">
        <ProjectCard 
          title="About the Project"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin posuere leo ac ante tempus, nec efficitur velit dignissim. Vivamus quam ante, blandit et tincidunt a, convallis eu sapien. Nullam scelerisque maximus lobortis. Integer turpis dolor, bibendum vitae molestie sed, malesuada non purus. Vestibulum auctor ligula tellus, at semper justo venenatis eget. Donec at commodo turpis. Fusce sed ante vehicula lorem pharetra pellentesque. Nulla finibus a nunc rhoncus vehicula. Maecenas pretium nulla pellentesque urna condimentum dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse semper a elit non dapibus. Integer cursus, turpis quis vulputate condimentum, arcu quam fermentum justo, ac ultrices dui ante ut felis.

Curabitur nec est eu lectus tempus placerat sit amet in lacus. Curabitur condimentum risus ut nibh ornare gravida ac viverra erat. Quisque maximus auctor risus, ullamcorper aliquet dui condimentum vel. Integer in lacus magna. Donec nisl ipsum, vulputate sit amet ipsum eget, posuere gravida lorem. Integer in ipsum ut dolor lacinia porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec dapibus urna. Proin ut finibus sapien, in dapibus eros. Nullam viverra quis velit vel ullamcorper. Proin consectetur gravida posuere. Quisque placerat tortor tincidunt, dictum risus at, rutrum sapien.

Nam eu maximus lectus. Aliquam vitae gravida lectus. Nunc malesuada at nisl non blandit. Vivamus feugiat tortor nec rhoncus congue. Quisque cursus sapien sed semper consectetur. Cras ut massa vitae erat pharetra laoreet. Morbi luctus metus nec est rhoncus tincidunt. Pellentesque congue pharetra ipsum, nec laoreet ipsum mollis non. Nullam fringilla pellentesque neque, eu porta neque mattis nec. Morbi non nisi magna. Nam velit justo, facilisis ut mi non, posuere pellentesque libero. Integer gravida magna nec elementum vulputate. Nullam eu purus non libero pharetra lacinia nec quis urna. Vivamus aliquam sem eu tempor facilisis. Nullam ac dictum enim, ut auctor ante. Phasellus sed nisl tristique quam sollicitudin iaculis.

Phasellus fringilla mi ut condimentum porttitor. Maecenas euismod orci semper, commodo lorem non, interdum ex. Nulla lectus purus, lobortis vel sollicitudin non, ultrices non augue. Quisque luctus ante in dignissim hendrerit. Phasellus porttitor aliquet arcu, ut eleifend augue. Cras semper, leo eu scelerisque faucibus, lacus nunc euismod lorem, et blandit enim nisl eu risus. Donec lobortis commodo fringilla. Phasellus cursus dui nec augue elementum, in tristique arcu malesuada. Integer ut leo ut risus convallis pharetra at quis eros.

Donec varius interdum massa. Etiam et libero non ligula venenatis ultrices. Vivamus fringilla auctor elementum. Morbi sollicitudin ex lacus, quis eleifend tortor scelerisque eget. Nullam est metus, efficitur sed ipsum a, pharetra venenatis felis. Duis hendrerit tristique ornare. Praesent augue lectus, pharetra ut luctus ullamcorper, ornare sit amet urna. Vestibulum ullamcorper tempor sem, ut dignissim neque finibus vel. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut a eros non leo tempor molestie et ac dui. Cras tristique eros in eros varius, ac molestie purus dictum. Ut egestas velit quis nunc molestie ornare. Nullam sollicitudin egestas libero tincidunt viverra. Proin sit amet metus eget odio feugiat laoreet nec lobortis arcu. Integer lacus ligula, dictum vitae erat sit amet, sagittis dictum neque."        />
      </div>
    </div>
  );
};

export default AboutUs;
