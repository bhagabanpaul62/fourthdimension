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
  _id: string;
  clientName: string;
  location: string;
  content: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  isActive: boolean;
  displayOrder: number;
}

export default function TestimonialsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupVideo, setPopupVideo] = useState<Testimonial | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const popupVideoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch("/api/testimonials");
        const data = await res.json();
        
        if (data && Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        } else {
          // Fallback testimonials for testing
          setTestimonials([
            {
              _id: "1",
              clientName: "John Smith",
              location: "New York, NY",
              content: "Fourth Dimension transformed our home completely. Their attention to detail and creative vision exceeded all our expectations.",
              mediaType: "image",
              mediaUrl: "/img1.jpg",
              isActive: true,
              displayOrder: 1
            },
            {
              _id: "2",
              clientName: "Sarah Johnson",
              location: "Los Angeles, CA",
              content: "Working with Fourth Dimension was an absolute pleasure. They understood our vision perfectly and delivered stunning results.",
              mediaType: "image",
              mediaUrl: "/img2.jpg",
              isActive: true,
              displayOrder: 2
            },
            {
              _id: "3",
              clientName: "Michael Brown",
              location: "Chicago, IL",
              content: "The team's professionalism and expertise shone through every aspect of the project. Highly recommended!",
              mediaType: "image",
              mediaUrl: "/img3.jpg",
              isActive: true,
              displayOrder: 3
            }
          ]);
        }
      } catch (err) {
        console.error("Failed to fetch testimonials", err);
        // Use fallback on error
        setTestimonials([
          {
            _id: "1",
            clientName: "John Smith",
            location: "New York, NY",
            content: "Fourth Dimension transformed our home completely. Their attention to detail and creative vision exceeded all our expectations.",
            mediaType: "image",
            mediaUrl: "/img1.jpg",
            isActive: true,
            displayOrder: 1
          },
          {
            _id: "2",
            clientName: "Sarah Johnson",
            location: "Los Angeles, CA",
            content: "Working with Fourth Dimension was an absolute pleasure. They understood our vision perfectly and delivered stunning results.",
            mediaType: "image",
            mediaUrl: "/img2.jpg",
            isActive: true,
            displayOrder: 2
          },
          {
            _id: "3",
            clientName: "Michael Brown",
            location: "Chicago, IL",
            content: "The team's professionalism and expertise shone through every aspect of the project. Highly recommended!",
            mediaType: "image",
            mediaUrl: "/img3.jpg",
            isActive: true,
            displayOrder: 3
          }
        ]);
      }
    }
    fetchTestimonials();
  }, []);

  // Simplified carousel logic - each testimonial is one slide
  const totalSlides = testimonials.length;
  // For infinite loop carousel, we can always go prev/next if we have testimonials
  const canGoPrev = testimonials.length > 1;
  const canGoNext = testimonials.length > 1;

  const prev = () => {
    if (testimonials.length === 0) return;
    const newSlide = currentSlide > 0 ? currentSlide - 1 : testimonials.length - 1;
    setCurrentSlide(newSlide);
  };

  const next = () => {
    if (testimonials.length === 0) return;
    const newSlide = currentSlide < testimonials.length - 1 ? currentSlide + 1 : 0;
    setCurrentSlide(newSlide);
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < testimonials.length) {
      setCurrentSlide(index);
    }
  };

  // Safety check to ensure currentSlide is within bounds
  useEffect(() => {
    if (testimonials.length > 0 && currentSlide >= testimonials.length) {
      setCurrentSlide(0);
    }
  }, [testimonials.length, currentSlide]);

  // Handle responsive sizing
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      // For this design we want 1 testimonial per view
      setVisibleCount(1);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);
  
  // Simplified auto-scroll functionality
  useEffect(() => {
    if (!autoplayEnabled || testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => {
        const nextSlide = prev < testimonials.length - 1 ? prev + 1 : 0;
        return nextSlide;
      });
    }, 6000);
    
    return () => clearInterval(interval);
  }, [autoplayEnabled, testimonials.length]);
  
  // Improved touch navigation handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (testimonials.length <= 1) return;
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setAutoplayEnabled(false);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || testimonials.length <= 1) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - dragStartX;
    setDragOffset(diff);
  };
  
  const handleTouchEnd = () => {
    if (!isDragging || testimonials.length <= 1) return;
    
    const threshold = 50;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        prev(); // Swipe right - go to previous
      } else {
        next(); // Swipe left - go to next
      }
    }
    
    setIsDragging(false);
    setDragOffset(0);
    setTimeout(() => setAutoplayEnabled(true), 1000);
  };

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
        popupVideoRef.current.play().catch(e => console.error("Error attempting to play video:", e));
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
      document.documentElement.requestFullscreen().catch(err => {
        console.error("Error attempting to enable full-screen mode:", err);
      });
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

  function isYouTubeUrl(url: string) {
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url) || /^[a-zA-Z0-9_-]{11}$/.test(url);
  }

  function getYouTubeId(url: string) {
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  }

  function getYouTubeThumbnail(url: string) {
    const id = getYouTubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "/placeholder.svg";
  }

  return (
    <section className="min-h-screen md:h-screen px-4 md:px-6 lg:px-10 snap-start bg-stone-100 flex flex-col md:overflow-hidden">
      <div className="py-6 md:py-8 max-w-7xl mx-auto w-full flex-shrink-0">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-black font-light mb-2 md:mb-4">
          Client <span className="text-black/50">Testimonials</span>
        </h2>
        <p className="text-gray-600 max-w-2xl text-sm md:text-base">
          Hear what our clients have to say about their experience working with Fourth Dimension.
        </p>
      </div>
      
      <div 
        className="w-full max-w-7xl mx-auto flex-1 flex flex-col min-h-0 md:overflow-hidden"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex flex-1 transition-transform duration-700 ease-out"
          style={{ 
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {/* Debug info */}
          {/* {process.env.NODE_ENV === 'development' && (
            <div className="fixed top-4 left-4 bg-red-500 text-white p-2 rounded z-50">
              Slide: {currentSlide} / {testimonials.length - 1}
              <br />
              Transform: translateX(-{currentSlide * 100}%)
            </div>
          )} */}
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial._id} 
              className="w-full flex-shrink-0 flex flex-col min-w-full"
              style={{ 
                minWidth: '100%',
                width: '100%'
              }}
            >
              <div className="flex flex-col md:flex-row flex-1 bg-white shadow-lg rounded-lg overflow-hidden mx-1 sm:mx-2 relative">
                {/* Debug indicator */}
                <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded text-xs z-10">
                  {index + 1} of {testimonials.length}
                </div>
                {/* Left side: Image/Video */}
                <div className="md:w-1/2 relative h-100 sm:h-72 md:h-auto min-h-0">
                  {testimonial.mediaType === "video" ? (
                    isYouTubeUrl(testimonial.mediaUrl) ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={getYouTubeThumbnail(testimonial.mediaUrl)}
                          alt={`${testimonial.clientName} video thumbnail`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                        <button
                          onClick={() => openVideoPopup(testimonial)}
                          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                          aria-label="Play video testimonial"
                        >
                          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-16 md:h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                            <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-6 md:h-6 text-black ml-1" />
                          </div>
                        </button>
                      </div>
                    ) : (
                      <div className="relative w-full h-full">
                        <video
                          ref={(el) => {
                            videoRefs.current[testimonial._id] = el;
                          }}
                          className="w-full h-full object-cover"
                          poster={testimonial.mediaUrl}
                          onError={(e) => console.error("Video error:", e)}
                        >
                          <source src={testimonial.mediaUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <button
                          onClick={() => openVideoPopup(testimonial)}
                          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                          aria-label="Play video testimonial"
                        >
                          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-16 md:h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                            <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-6 md:h-6 text-black ml-1" />
                          </div>
                        </button>
                      </div>
                    )
                  ) : (
                    <div className="relative w-full h-full">
                      <Image
                        src={testimonial.mediaUrl || "/placeholder.svg"}
                        alt={testimonial.clientName}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
                    </div>
                  )}
                </div>
                
                {/* Right side: Testimonial text */}
                <div className="md:w-1/2 p-5 sm:p-6 md:p-6 lg:p-8 flex flex-col justify-center min-h-0">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-10 md:h-10 text-gray-300 mb-4 sm:mb-5 md:mb-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  
                  <div className="flex-1 min-h-0 flex flex-col justify-center">
                    <p className="text-lg sm:text-xl md:text-lg text-gray-800 leading-relaxed mb-5 sm:mb-6 md:mb-6 font-light">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex-shrink-0">
                      <h3 className="font-medium text-lg sm:text-xl md:text-lg text-black mb-1">{testimonial.clientName}</h3>
                      <p className="text-sm sm:text-base md:text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-4 md:pt-6 pb-4 md:pb-6 max-w-7xl mx-auto w-full flex-shrink-0">
        <div className="flex items-center justify-between md:justify-center">
          {/* Left control */}
          <button
            onClick={prev}
            disabled={!canGoPrev}
            aria-label="Previous testimonial"
            className={`p-2 md:p-3 rounded-full border border-gray-300 bg-white shadow transition-all ${
              canGoPrev 
                ? "hover:bg-gray-50 hover:shadow-md cursor-pointer" 
                : "opacity-40 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-black" />
          </button>
          
          {/* Pagination dots - visible on larger screens */}
          <div className="hidden md:flex space-x-2 mx-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? "bg-black scale-110" 
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
          
          {/* Current/total indicator - visible on mobile */}
          <div className="flex md:hidden items-center">
            <span className="font-medium text-xs md:text-sm">
              {currentSlide + 1} <span className="text-gray-500 font-normal">/ {testimonials.length}</span>
            </span>
          </div>
          
          {/* Right control */}
          <button
            onClick={next}
            disabled={!canGoNext}
            aria-label="Next testimonial"
            className={`p-2 md:p-3 rounded-full border border-gray-300 bg-white shadow transition-all ${
              canGoNext 
                ? "hover:bg-gray-50 hover:shadow-md cursor-pointer" 
                : "opacity-40 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-black" />
          </button>
        </div>
        
        {/* Auto-play toggle */}
        <div className="flex justify-center mt-3 md:mt-4">
          <button
            onClick={() => setAutoplayEnabled(!autoplayEnabled)}
            className={`text-xs md:text-sm flex items-center gap-1 md:gap-2 px-2 py-1 md:px-3 md:py-1.5 rounded-full transition-colors ${
              autoplayEnabled ? "text-black" : "text-gray-500"
            }`}
            aria-pressed={autoplayEnabled}
            aria-label={autoplayEnabled ? "Disable auto-play" : "Enable auto-play"}
          >
            <span className={`block w-2 h-2 md:w-3 md:h-3 rounded-full ${autoplayEnabled ? "bg-black" : "bg-gray-400"}`}></span>
            {autoplayEnabled ? "Auto-play on" : "Auto-play off"}
          </button>
        </div>
      </div>
      {isPopupOpen && popupVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl bg-black overflow-hidden">
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h3 className="font-medium text-lg">{popupVideo.clientName}</h3>
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
            <div className="relative aspect-video w-full">
              {isYouTubeUrl(popupVideo.mediaUrl) ? (
                <iframe
                  className="w-full h-full"
                  src={`https://youtube.com/embed/${getYouTubeId(popupVideo.mediaUrl)}?autoplay=1&controls=1&modestbranding=1&rel=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  ref={popupVideoRef}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  poster={popupVideo.mediaUrl}
                  onError={(e) => console.error("Popup video error:", e)}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                >
                  <source src={popupVideo.mediaUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
