import { Carousel, Image } from "antd";
import { log } from "console";
import React, { useEffect, useState } from "react";
interface startAdsProps {
  images: string[];
}
const StartADS: React.FC<startAdsProps> = ({ images }) => {
  const [firstAnimate, setFirstAnimate] = useState<string>("");
  const [secondAnimate, setSecondAnimate] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setFirstAnimate("translate-x-10");
    }, 1000);
    setTimeout(() => {
      setSecondAnimate("-translate-x-10");
    }, 1100);
  }, []);
  return (
    <div
      style={{
        backgroundImage: `url('${"https://picsum.photos/600/400"}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
      }}
    >
      <div className="container m-auto">
        <div className=" flex justify-between items-center relative">
          <div className={`duration-700 ${firstAnimate} absolute z-30`}>
            <Image
              width={200}
              src={`https://img.lovepik.com/original_origin_pic/19/01/11/3abe5e2b757641f29d9369f6edeef476.png_wh860.png`}
              alt=""
              preview={false}
            />
          </div>
          <div className="w-full z-10 ">
            <Carousel
              autoplay
              className="!w-full md:!w-1/2"
              style={{
                // width: carouselSize,
                margin: "auto",
                height: 500,
              }}
            >
              {images.map((image) => (
                <>
                  <div>
                    <h3
                      className="text-red-500"
                      style={{
                        height: 500,
                        backgroundImage: `url('${image}')`,
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></h3>
                  </div>
                </>
              ))}
            </Carousel>
          </div>

          <div className={`absolute end-0 z-30 duration-700 ${secondAnimate}`}>
            <Image
              width={"200px"}
              preview={false}
              src={`https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/640px-Tux.svg.png`}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default StartADS;
