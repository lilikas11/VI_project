import PropTypes from "prop-types";

const ProjectCard = ({ title, description }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg ">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {title}
        </h2>
        <p className="text-gray-700 text-lg text-justify">{description}</p>
      </div>
    );
  };

ProjectCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };
  
export default ProjectCard;
  