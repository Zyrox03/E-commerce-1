import { Button } from "../../widgets/Button";
import { HeroSwiper } from "../../widgets/HeroSwiper";
import { Link as LinkScroll } from "react-scroll";
export const Hero = () => {
  return (
    <div
      dir="rtl"
      className="h-[90vh] flex items-center justify-start relative"
      id="hero"
    >
      <HeroSwiper />
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(0,0,0,0.75))",
          zIndex: 10,
        }}
      ></div>
      <div className="p-4 flex flex-col items-start max-w-3xl text-start justify-center gap-12 relative z-10">
        <h1 className="text-5xl font-bold text-purple-100">
          {" "}
          استكشفوا تشكيلتنا الفاخرة من أزياء الزفاف
        </h1>
        <p className="text-md lg:text-xl text-white w-5/6">
          أضيفوا لمسة أناقة إلى أناقتكم مع مجموعتنا المتنوعة والمريحة من أزياء
          الزفاف. سواء كنتم تبحثون عن أطقم رسمية أو أنيقة، لدينا التصميم المثالي
          لكل لحظة خاصة. اكتشفوا أحدث التصاميم لدينا وانطلقوا بثقة مع Top Suit
          DZ.
        </p>
        <LinkScroll to={"all-products"} spy={true} smooth={true} offset={-80}>
          <Button text={<i className="fa-solid fa-arrow-down"></i>} icon="fa-solid fa-arrow-down" />
        </LinkScroll>
      </div>
    </div>
  );
};
