"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  X,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  content: string;
  image: string;
  hasVideo?: boolean;
  videoUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Bala Shanmugakumar",
    location: "Plutus Residence, Chennai",
    content:
      "Bala was looking for a match in wavelength and vision for his home. He found that in HomeLane. HomeLane's well-structured workflow helped him stay abreast of the process at all times, from design to production to delivery. The 3D design software, Spacecraft Pro, also gave him a clear picture of how his home would look like. Book your consultation with HomeLane today!",
    image: "/img4.jpg",
    hasVideo: false,
  },
  {
    id: 2,
    name: "Joytilak and Anushua",
    location: "Sobha Silicon Oasis, Bengaluru",
    content:
      "Joytilak and Anushua tried to find designers but they could find none, that matched their vision. HomeLane provided them with a designer who understood their vision and made it a reality even before the promised delivery date. The material quality and execution of the design were in their words 'top-notch'. The glowing compliments received about their home interiors from friends and family were a cherry on the cake.",
    image: "/placeholder.svg?height=300&width=400",
    hasVideo: true,
    videoUrl:
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
  },
  {
    id: 3,
    name: "V. Anithamahendiran",
    location: "Parappalayam, Tirupur, Coimbatore",
    content:
      "HomeLane brought Anitha's dream home to life for her, just the way she envisioned it. After doing some research she chose HomeLane where she got the best price and the quality she was looking for. The HomeLane designer delivered all the requirements before time and with the highest quality possible.",
    image: "/placeholder.svg?height=300&width=400",
    hasVideo: false,
  },
  {
    id: 4,
    name: "Rajesh Kumar",
    location: "DLF Phase 2, Gurgaon",
    content:
      "The attention to detail and quality of work exceeded our expectations. The team was professional and delivered exactly what was promised within the timeline.",
    image: "/placeholder.svg?height=300&width=400",
    hasVideo: false,
  },
  {
    id: 5,
    name: "Priya Sharma",
    location: "Whitefield, Bangalore",
    content:
      "Amazing experience with the design team. They understood our requirements perfectly and created a beautiful space that we absolutely love.",
    image: "/placeholder.svg?height=300&width=400",
    hasVideo: true,
    videoUrl: "/placeholder-video.mp4",
  },
  {
    id: 6,
    name: "Amit Patel",
    location: "Satellite, Ahmedabad",
    content:
      "Professional service from start to finish. The quality of materials and craftsmanship is outstanding. Highly recommended!",
    image: "/placeholder.svg?height=300&width=400",
    hasVideo: false,
  },
  {
    id: 7,
    name: "Amit ",
    location: "Satellite, Ahmedabad",
    content:
      "Professional service from start to finish. The quality of materials and craftsmanship is outstanding. Highly recommended!",
    image: "/placeholder.svg?height=300&width=400",
    hasVideo: false,
  },
];

export default function TestimonialsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupVideo, setPopupVideo] = useState<Testimonial | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const popupVideoRef = useRef<HTMLVideoElement | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [startIndex, setStartIndex] = useState(0);

  const [cardWidthPx, setCardWidthPx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  const totalSlides = Math.ceil(testimonials.length / visibleCount);

  const canGoPrev = currentSlide > 0;
  const canGoNext = currentSlide < totalSlides - 1;

  const prev = () => {
    if (canGoPrev) setCurrentSlide(currentSlide - 1);
  };

  const next = () => {
    if (canGoNext) setCurrentSlide(currentSlide + 1);
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  };

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(1); // mobile
      else if (width < 1024) setVisibleCount(2); // tablet
      else setVisibleCount(3); // desktop
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Calculate max start index (so we don't scroll past end)
  const maxStartIndex = testimonials.length - visibleCount;

  // Scroll container to the start of current slide group
  useEffect(() => {
    if (containerRef.current && cardWidthPx) {
      containerRef.current.scrollTo({
        left: currentSlide * visibleCount * cardWidthPx,
        behavior: "smooth",
      });
    }
  }, [currentSlide, cardWidthPx, visibleCount]);

  // Measure container width on mount and resize
  useEffect(() => {
    function updateCardWidth() {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setCardWidthPx(containerWidth / visibleCount);
      }
    }

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);

    return () => {
      window.removeEventListener("resize", updateCardWidth);
    };
  }, [visibleCount]);

  // Scroll the container to the desired position on index change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: startIndex * cardWidthPx,
        behavior: "auto", // no smooth scroll, instant jump
      });
    }
  }, [startIndex]);

  const openVideoPopup = (testimonial: Testimonial) => {
    setPopupVideo(testimonial);
    setIsPopupOpen(true);
    setIsPlaying(false);
  };

  const closeVideoPopup = () => {
    if (popupVideoRef.current) {
      popupVideoRef.current.pause();
    }
    setIsPopupOpen(false);
    setPopupVideo(null);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const togglePlayPause = () => {
    if (popupVideoRef.current) {
      if (isPlaying) {
        popupVideoRef.current.pause();
      } else {
        popupVideoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (popupVideoRef.current) {
      popupVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleTimeUpdate = () => {
    if (popupVideoRef.current) {
      setCurrentTime(popupVideoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (popupVideoRef.current) {
      setDuration(popupVideoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number.parseFloat(e.target.value);
    if (popupVideoRef.current) {
      popupVideoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <section className="md:py-28 pt-16 pb-4 px-8 snap-start md:h-screen min-h-screen bg-stone-100">
      <h2 className="text-3xl text-black lg:text-4xl font-light text-left md:mb-16 mb-4">
        Client Testimonials
      </h2>

      {/* Carousel container */}
      <div className="w-full  overflow-x-hidden" ref={containerRef}>
        <div className="flex ">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-full md:w-1/3 overflow-hidden text-black md:h-[35rem] flex flex-col md:px-6 "
            >
              <div className="relative md:h-80 h-48">
                {testimonial.hasVideo && testimonial.videoUrl ? (
                  <div className="relative w-full h-full">
                    <video
                      ref={(el) => {
                        videoRefs.current[testimonial.id] = el;
                      }}
                      className="w-full h-full object-cover"
                      poster={testimonial.image}
                      onEnded={() => setPlayingVideo(null)}
                    >
                      <source src={testimonial.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <button
                      onClick={() => openVideoPopup(testimonial)}
                      className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                    >
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                        {playingVideo === testimonial.id ? (
                          <Pause className="w-6 h-6 text-black ml-0.5" />
                        ) : (
                          <Play className="w-6 h-6 text-black ml-1" />
                        )}
                      </div>
                    </button>
                  </div>
                ) : (
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="py-2 flex flex-col ">
                <h3 className="font-medium text-lg mb-1">{testimonial.name}</h3>
                <p className="text-xs text-gray-500 mb-4">
                  {testimonial.location}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed flex-grow">
                  "{testimonial.content}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center space-x-8 text-black">
        <button
          onClick={prev}
          disabled={!canGoPrev}
          className={`p-2 rounded-full border border-gray-400 transition-colors ${
            canGoPrev
              ? "hover:bg-gray-200 cursor-pointer"
              : "opacity-40 cursor-not-allowed"
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-red-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={!canGoNext}
          className={`p-2 rounded-full border border-gray-400 transition-colors ${
            canGoNext
              ? "hover:bg-gray-200 cursor-pointer"
              : "opacity-40 cursor-not-allowed"
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Video Popup Modal */}
      {isPopupOpen && popupVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl bg-black overflow-hidden">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h3 className="font-medium text-lg">{popupVideo.name}</h3>
                  <p className="text-sm opacity-80">{popupVideo.location}</p>
                </div>
                <button
                  onClick={closeVideoPopup}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Video */}
            <div className="relative aspect-video">
              <video
                ref={popupVideoRef}
                className="w-full h-full object-cover"
                src={popupVideo.videoUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                onClick={togglePlayPause}
              />

              {/* Play/Pause Overlay */}
              {!isPlaying && (
                <button
                  onClick={togglePlayPause}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                >
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Play className="w-8 h-8 text-black ml-1" />
                  </div>
                </button>
              )}
            </div>

            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              {/* Progress Bar */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlayPause}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>

                  <span className="text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <button
                  onClick={toggleFullscreen}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize className="w-5 h-5" />
                  ) : (
                    <Maximize className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
