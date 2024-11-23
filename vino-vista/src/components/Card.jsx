import PropTypes from "prop-types";

function Card({ title, description, image }) {
  return (
    <div className="card lg:card-side bg-lightgreen shadow-xl rounded-md">
      <figure>
        <img
          src={image}
          alt={title}
          className="w-64 h-64 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,    
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired, 
};

export default Card;
