import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
  //   GET DISCOUNT

  let deduction = 0;
  deduction = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );
  return (
    <Link
      to={`/${product.slug}`}
      className="flex flex-col items-center gap-2 w-[90%] h-[60vh] lg:h-full   lg:w-[20em] p-2 lg:p-4  bg-slate-100  relative shadow-lg "
      dir="rtl"
    >
      <div className="overflow-hidden rounded-lg w-full h-full">
        {/* discount tag */}

        {deduction > 0 && (
          <div className="bg-purple-800 text-white w-fit absolute top-6 right-6 px-2 font-bold  z-10">
            {deduction}% تخفيض
          </div>
        )}
        <img
          src={
            product.images[0]?.image?.path ||
            "https://content.optimumnutrition.com/i/on/C100969_Image_01?layer0=$PDP$"
          }
          alt="product image"
          className="w-full h-full lg:h-[350px] object-cover hover:scale-105 duration-300 transition"
        />
      </div>

      <h2 className="text-md lg:text-xl font-bold">{product.name}</h2>
      <p className="lg:text-2xl font-bold ">
        {product.oldPrice && (
          <span className="text-sm font-normal line-through">
            DA {product.oldPrice}
          </span>
        )}{" "}
        <span className="text-purple-700">DA {product.price} </span>
      </p>

      <button className="hidden w-full lg:flex items-center justify-center gap-4 bg-purple-800 text-white p-2 hover:bg-purple-900 transition active:scale-95">
        {/* <i className="text-lg fa-solid fa-cart-plus"></i> */}
        <p className="text-lg font-bold">اشترِي الآن</p>
      </button>
    </Link>
  );
};
ProductCard.propTypes = {
  product: PropTypes.object,
};
