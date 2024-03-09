import { useParams } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import { SideNav } from "../../components/SideNav";
import { Footer } from "../../components/Footer";
import { useEffect, useState } from "react";
import { BestProducts } from "../../components/LandingPage/BestProducts";
import { ImagesSwiper } from "../../widgets/ImagesSwiper";
import { useSelector } from "react-redux";
import { Feedback } from "../../components/LandingPage/Feedback";
import { CheckoutForm } from "../../widgets/CheckoutForm";
import { Link as LinkScroll } from "react-scroll";
import DOMPurify from "dompurify";
import ProductNotFound from "../ProductNotFound";
import OrderSuccess from "../OrderSuccess";
import { Helmet } from "react-helmet";
import MetaPixel from "../../utils/meta/metaPixel";
const ProductDetails = () => {
  //
  const { productID } = useParams();
  const [openSideNav, setOpenSideNav] = useState(false);

  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    if (openSideNav) {
      body.style.overflowY = "hidden";
    } else {
      body.style.overflowY = "auto";
    }
  }, [openSideNav]);

  //   GET DISCOUNT
  let deduction = 0;

  const products = useSelector((state) => state.products.items);

  const product = products.find((product) => product.slug === productID);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  const sanitizedDescription = DOMPurify.sanitize(
    product?.description.replace(/\n/g, "<br>")
  );

  const [selectedOptions, setSelectedOptions] = useState({
    size: null,
    color: null,
    quantity: 1,

    productInfo: {
      name: null,
      price: null,
      slug: null,
    },
  });

  useEffect(() => {
    // Assuming `product` is an object with `name` and `price` properties
    if (product) {
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        productInfo: {
          name: product.name,
          price: product.price,
          slug: product.slug,
        },
      }));
    }
  }, [product]);

  // get unique productColors

  // State to hold the unique colors array
  const [uniqueColors, setUniqueColors] = useState([]);
  const handleColorClick = (color) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      color,
    })); // You can add additional logic here based on the selected color if needed
  };

  useEffect(() => {
    const colorSet = new Set();

    const uniqueColorsArray = product?.images.filter((obj) => {
      const trimmedColor = obj.productColor.trim().toLowerCase();
      if (trimmedColor !== "") {
        if (!colorSet.has(trimmedColor)) {
          colorSet.add(trimmedColor);
          return true;
        }
      }
      return false;
    });
    

    setUniqueColors(uniqueColorsArray);
  }, [product]); // Empty dependency array ensures the effect runs only once on component mount

  const handleIncrement = () => {
    if (selectedOptions.quantity < 20) {
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        quantity: prevOptions.quantity + 1,
      }));
    }
  };

  const handleDecrement = () => {
    if (selectedOptions.quantity > 1) {
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        quantity: prevOptions.quantity - 1,
      }));
    }
  };
  // SIZE

  const handleSizeClick = (size) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      size,
    })); // You can add additional logic here based on the selected size if needed
  };

  if (product) {
    deduction = Math.round(
      ((product.oldPrice - product.price) / product.oldPrice) * 100
    );
  }

  const [formikErrors, setFormikErrors] = useState({});

  // Callback function to update Formik errors in the parent
  const handleFormikErrorsChange = (errors) => {
    setFormikErrors(errors);
  };

  if (!product) {
    return <ProductNotFound />;
  }

  if (orderSuccess) {
    return <OrderSuccess />;
  }

  return (
    <div className="min-h-screen bg-[#edf2f4]  flex flex-col relative overflow-hidden">
      <Helmet>
        <title>{`${product?.name} - ${product?.price} DA`}</title>
        <meta name="description" content={product?.description} />

        {/* Balises Open Graph pour le partage sur les réseaux sociaux */}
        <meta
          property="og:title"
          content={`${product?.name} - ${product?.price} DA`}
        />
        <meta property="og:description" content={product?.description} />
        <meta property="og:image" content={product?.images[0]?.image?.path} />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_TOP_SHOE_DZ_BASE_API}/${product?.slug}`}
        />

        {/* Balises Twitter Card pour le partage sur Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${product?.name} - ${product?.price} DA`}
        />
        <meta name="twitter:description" content={product?.description} />
        <meta name="twitter:image" content="URL_IMAGE_DU_PRODUIT" />

        {/* Balises méta supplémentaires */}
        <meta
          name="keywords"
          content="détails du produit, achat de chaussures, informations sur les chaussures, expérience d'achat"
        />
        <meta name="robots" content="index, follow" />

        {/* Balise meta viewport pour le design responsive */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>


<MetaPixel/>

      <NavBar setOpenSideNav={setOpenSideNav} />
      <SideNav setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} />
      <div style={{ marginTop: "5em" }}>
        <div className="p-4 lg:p-8 flex flex-col gap-6">
          <h1 dir="rtl" className="text-3xl lg:text-5xl font-bold">
            {product?.name}{" "}
          </h1>
          <hr />

          <div className="flex flex-col md:flex-row relative gap-4">
            <div className="flex-1 h-full md:w-1/2 flex justify-center items-center sticky top-0 h-fit">
              {product?.images && product?.images.length > 0 ? (
                <ImagesSwiper productImages={product?.images} />
              ) : (
                <div className="swiper-slide flex justify-center items-center">
                  <img
                    src={
                      "https://content.optimumnutrition.com/i/on/C100969_Image_01?layer0=$PDP$"
                    }
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <LinkScroll
                to={"variants"}
                spy={true}
                smooth={true}
                offset={-400}
              >
                <button className="lg:hidden w-full flex items-center justify-center gap-4 bg-purple-800 text-white p-2 hover:bg-purple-900 transition active:scale-95">
                  <i className="text-lg fa-solid fa-shopping-cart"></i>
                  <p className="text-lg font-bold">شراء</p>
                </button>
              </LinkScroll>
              <div
                dir="rtl"
                className="flex h-fit w-full items-center flex-wrap gap-2"
              >
                <h2 className="text-xl md:text-4xl font-bold text-purple-800 ml-2">
                  {product?.price} DA
                </h2>
                {parseFloat(product?.oldPrice) > 0 && (
                  <>
                    <span className="ml-4 text-md md:text-2xl  line-through text-gray-600">
                      {product?.oldPrice} DA
                    </span>

                    {deduction > 0 && (
                      <div
                        style={{ whiteSpace: "nowrap" }}
                        className="ml-12 bg-purple-800 text-white py-1 px-2 font-bold"
                      >
                        {deduction}% تخفيض
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="flex h-fit w-full items-end flex-col ">
                <h2 className="text-3xl mb-4 text-purple-700 underline font-bold">
                  
                    المواصفات{" "}
                  
                </h2>
                <p
                  dir="rtl"
                  className="text-lg"
                  dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                ></p>
              </div>

              {product.stock > 0 ? (
                <>
                  {product && uniqueColors?.length > 0 && (
                    <div dir="rtl" className="flex flex-col gap-3 ">
                      <h2 className="text-3xl mb-4 text-purple-700 underline">اللون:</h2>
                      <div className="flex flex-wrap gap-3">
                        {uniqueColors.map((colorObj, index) => (
                          <div
                            key={index}
                            className={`circle cursor-pointer w-16 h-16 border border-2 transition  ${
                              selectedOptions.color === colorObj.productColor
                                ? "bg-purple-200 border-purple-800 p-1"
                                : "bg-slate-200"
                            } `}
                            onClick={() =>
                              handleColorClick(colorObj.productColor)
                            }
                          >
                            <img
                              src={
                                colorObj.image?.path ||
                                "https://content.optimumnutrition.com/i/on/C100969_Image_01?layer0=$PDP$"
                              }
                              className="w-full h-full object-cover"
                              alt=""
                            />

                            {selectedOptions.color ===
                              colorObj.productColor && (
                              <div className="transform text-center">
                                <i className="fas fa-check text-purple-500"></i>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {formikErrors.color && (
                        <div className="text-red-500 text-sm mt-1">
                          {formikErrors.color}
                        </div>
                      )}
                    </div>
                  )}
                  {product && product?.size.length > 0 && (
                    <div dir="rtl" className="flex flex-col gap-3 ">
                      {product && product.size.length > 0 && (
                        <div>
                          <h2 className="text-3xl mb-4 text-purple-700 text-purple-700 underline">الطول:</h2>
                          <div className="flex flex-wrap gap-3">
                            {product.size.map((size, index) => (
                              <div
                                key={index}
                                className={`cursor-pointer min-w-[50px] p-2 h-10 border border-2 ${
                                  selectedOptions.size === size
                                    ? "bg-purple-600 text-white relative"
                                    : "bg-slate-200 border border-purple-500 text-gray-700"
                                } flex justify-center gap-2 items-center transition duration-300 ease-in-out transform hover:scale-110 active:scale-95`}
                                onClick={() => handleSizeClick(size)}
                              >
                                {selectedOptions.size === size && (
                                  <div className="transform">
                                    <i className="fas fa-check text-purple-500"></i>
                                  </div>
                                )}
                                <span>{size}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {formikErrors.size && (
                        <div className="text-red-500 text-sm mt-1">
                          {formikErrors.size}
                        </div>
                      )}
                    </div>
                  )}

                  <div dir="rtl" id="variants" className="flex flex-col gap-3 ">
                    <h2 className="text-3xl mb-4 text-purple-700 underline">الكمية:</h2>
                    <div className="flex gap-3 items-center">
                      <div
                        className="cursor-pointer bg-purple-600 w-10 h-10 border border-2 border-purple-500 flex justify-center items-center transition duration-300 ease-in-out transform hover:scale-110 active:scale-95"
                        onClick={handleDecrement}
                      >
                        <i className="fas fa-minus text-white"></i>
                      </div>

                      <span className="text-lg w-10 text-center">
                        {selectedOptions.quantity}
                      </span>

                      <div
                        className="cursor-pointer bg-purple-600 w-10 h-10 border border-2 border-purple-500 flex justify-center items-center transition duration-300 ease-in-out transform hover:scale-110 active:scale-95"
                        onClick={handleIncrement}
                      >
                        <i className="fas fa-plus text-white"></i>
                      </div>
                    </div>

                    {formikErrors.quantity && (
                      <div className="text-red-500 text-sm mt-1">
                        {formikErrors.quantity}
                      </div>
                    )}
                  </div>

                  <div dir="rtl">
                    <CheckoutForm
                      setOrderSuccess={setOrderSuccess}
                      handleFormikErrorsChange={handleFormikErrorsChange}
                      selectedOptions={selectedOptions}
                      product={product}
                      uniqueColors={uniqueColors}
                    />{" "}
                  </div>
                </>
              ) : (
                <div
                  dir="rtl"
                  className="bg-red-500 text-white p-4 shadow-md"
                >
                  <p className="text-lg font-semibold">نفدت الكمية حالياً</p>
                </div>
              )}

             
            </div>
          </div>
        </div>
      </div>
      <Feedback />
      <BestProducts productsList={products} />
      <Footer />
    </div>
  );
  //
};

export default ProductDetails;
