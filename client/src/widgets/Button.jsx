import PropTypes from "prop-types";
export const Button = ({ text }) => {
  return <button className="primary_button ">{text}</button>;
};
Button.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
};
