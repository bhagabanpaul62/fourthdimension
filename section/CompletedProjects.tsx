import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react";
import Marquee from "react-fast-marquee";

const slidesData = [
  {
    main: "/img1.jpg",
    topRight: "/img2.jpg",
    bottomLeft: "/img3.jpg",
    bottomRight: "/img4.jpg",
  },
  {
    main: "/img5.jpg",
    topRight: "/img6.jpg",
    bottomLeft: "/img7.jpg",
    bottomRight: "/img8.jpg",
  },
  {
    main: "/img2.jpg",
    topRight: "/img4.jpg",
    bottomLeft: "/img1.jpg",
    bottomRight: "/img3.jpg",
  },
  {
    main: "/img6.jpg",
    topRight: "/img1.jpg",
    bottomLeft: "/img5.jpg",
    bottomRight: "/img7.jpg",
  },
  {
    main: "/img3.jpg",
    topRight: "/img8.jpg",
    bottomLeft: "/img2.jpg",
    bottomRight: "/img6.jpg",
  },
];

export default function CompletedProjects() {
  return (
    <section className="snap-start py-20 h-screen bg-black text-white">
      <div className=" mx-auto px-8">
        <div className="flex items-start justify-between mb-8">
          <h2 className="text-4xl lg:text-5xl font-light max-w-lg">
            Completed <span className="text-gray-400">projects</span> that
            <br />
            speak for themselves
          </h2>
          <div className="text-right text-xs">
            <p className="text-gray-400 mb-2">IN EVERY PROJECT</p>
            <p className="text-gray-400 mb-2">WE AIM TO FIND</p>
            <p className="text-gray-400 mb-2">THE UNIQUE AESTHETIC</p>
            <p className="text-gray-400">FEELING OF THE SPACE</p>
          </div>
        </div>

        <Marquee
          pauseOnHover
          gradient={false}
          speed={50}
          className="h-[65vh] overflow-hidden"
        >
          {slidesData.map((slide, index) => (
            // <SwiperSlide key={index} className="h-fit">
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full w-[1000px] px-2 "
            >
              {/* Left Large Image */}
              <div className="relative w-full h-full min-h-[300px]">
                <Image
                  src={slide.main}
                  alt="Main project"
                  fill
                  className="object-cover "
                />
              </div>

              {/* Right Complex Grid */}
              <div className="grid grid-cols-2 grid-rows-4 gap-4 w-full h-full aspect-[3/4]">
                {/* Large top image (spans 2 columns) */}
                <div className="col-span-2 row-span-2 relative min-h-[150px]">
                  <Image
                    src={slide.topRight}
                    alt="Top right large"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Bottom left small image */}
                <div className="col-span-1 row-span-2 relative min-h-[100px]">
                  <Image
                    src={slide.bottomLeft}
                    alt="Bottom left small"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Bottom right small image */}
                <div className="col-span-1 row-span-2 relative min-h-[100px]">
                  <Image
                    src={slide.bottomRight}
                    alt="Bottom right small"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            // </SwiperSlide>
          ))}
        </Marquee>

        <div className="mt-8 flex  justify-end mx-8 -my-8">
          <Link href={"/projects"} className="border-b">
            <button className="flex items-center space-x-2 text-white hover:opacity-70 transition-opacity">
              <span>ALL COMPLETED PROJECTS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
