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
    <section className="snap-start py-20  bg-black text-white ">
      <div className="  px-8">
        <div className="flex md:flex-row flex-col items-start justify-between md:mb-8 mb-2">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-light mb-2">
            Completed <span className="text-gray-400">projects</span> that
            <br />
            speak for themselves
          </h2>
          <div className="md:text-right text-xs my-2">
            <p className="text-gray-400">
              IN EVERY PROJECT WE AIM TO FIND
              <br className="hidden md:block" />
              THE UNIQUE AESTHETIC
              <br className="hidden md:block" />
              FEELING OF THE SPACE
            </p>
          </div>
        </div>

        <Marquee
          pauseOnHover
          gradient={false}
          speed={50}
          className="md:h-[65vh] min-h-[55vh] overflow-hidden"
        >
          {slidesData.map((slide, index) => (
            <div key={index} className="w-[90vw] max-w-[1000px] mx-auto">
              {/* Desktop version */}
              <Link
                href={"/projects"}
                className="hidden md:grid grid-cols-1 lg:grid-cols-2 md:gap-4 gap-2 h-full px-2"
              >
                {/* Left Large Image */}
                <div className="relative w-full h-full min-h-[300px]">
                  <Image
                    src={slide.main}
                    alt="Main project"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
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
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Bottom left small image */}
                  <div className="col-span-1 row-span-2 relative min-h-[100px]">
                    <Image
                      src={slide.bottomLeft}
                      alt="Bottom left small"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Bottom right small image */}
                  <div className="col-span-1 row-span-2 relative min-h-[100px]">
                    <Image
                      src={slide.bottomRight}
                      alt="Bottom right small"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </Link>

              {/* Mobile version */}
              <Link
                href={"/projects"}
                className="md:hidden grid grid-cols-2 grid-rows-2 gap-4 px-2"
              >
                {/* Main image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={slide.main}
                    alt="Main project mobile"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                {/* Top right image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={slide.topRight}
                    alt="Top right mobile"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                {/* Bottom left image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={slide.bottomLeft}
                    alt="Bottom left mobile"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                {/* Bottom right image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={slide.bottomRight}
                    alt="Bottom right mobile"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </Link>
            </div>
          ))}
        </Marquee>

        <div className="mt-8 flex  justify-end mx-8 -my-8">
          <Link href={"/projects"} className="border-b">
            <button className=" flex items-center space-x-2 text-white hover:opacity-70 transition-opacity">
              <span>ALL COMPLETED PROJECTS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
