import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <div dir="rtl" className="relative mt-16 bg-purple-700 ">
      <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-3">
          <div className="md:max-w-md lg:col-span-2">
            <Link
              to="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center gap-2"
            >
              <span className=" text-xl font-bold tracking-wide text-gray-100 uppercase">
              أزياء العرائس
              </span>
              {/* <img
                src="/logo.jpg"
                alt="logo"
                className="w-[60px] rounded-full "
              /> */}
            </Link>
            <div className="mt-4 lg:max-w-sm">
              <p className="text-md text-gray-300">
              مرحبا بكم عند السيد زيتوني أحمد تاجر جملة و تجزئة في ملابس الرجال و النساء و مختص في بيع و كراء ملابس الأعراس …تحياتي.


              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 ">
            <div>
              <p className="font-semibold tracking-wide text-slate-100">
                روابط مفيدة
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    to="/"
                    className="transition-colors duration-300 text-gray-300 hover:text-slate-100"
                  >
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    className="transition-colors duration-300 text-gray-300 hover:text-slate-100"
                  >
                    جميع المنتجات
                  </Link>
                </li>

                <li>
                  <Link
                    to="/account"
                    className="transition-colors duration-300 text-gray-300 hover:text-slate-100"
                  >
                    حسابي
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold tracking-wide text-slate-100">
                خدمة العملاء
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    to="/contact"
                    className="transition-colors duration-300 text-gray-300 hover:text-slate-100"
                  >
                    اتصل بنا
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-deep-purple-accent-200 sm:flex-row">
          <p className="text-sm text-gray-100">
            © حقوق النشر 2024 Inc. جميع الحقوق محفوظة
          </p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            <a href="https://web.facebook.com/profile.php?id=61552207858595">
              <i className=" text-3xl fa-brands text-white fa-square-facebook"></i>
            </a>
            {/* <i className=" text-3xl fa-brands text-white fa-instagram"></i> */}
          </div>
        </div>
      </div>
    </div>
  );
};
