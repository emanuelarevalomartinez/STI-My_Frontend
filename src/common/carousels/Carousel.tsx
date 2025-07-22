import { useEffect, useState } from "react";

interface Image {
  src: string;
  alt: string;
}

interface Props {
  images: Image[],
  timeTransition: number,
  fastTimeTransition: number,
}

export function Carousel({images, timeTransition, fastTimeTransition}:Props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [_, setTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      nextImage();
    }, timeTransition);
    
    return () => clearInterval(timer);
  }, [currentImage]);

  const nextImage = () => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
      setTransitioning(false);
    }, fastTimeTransition);
  };

  const goToImage = (index: number) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentImage(index);
      setTransitioning(false);
    }, fastTimeTransition);
  };

  return (
    <div className="relative rounded-lg overflow-hidden my-2">
      <div className="relative flex w-full h-80 md:h-[500px]">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-500 ease-in-out ${
              currentImage === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={image.src}
              className="object-cover w-full h-full"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      
      <div className="flex absolute bottom-5 left-1/2 z-10 -translate-x-1/2 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full transition ${
              currentImage === index ? "bg-gray-600" : "bg-gray-200 hover:bg-gray-400"
            }`}
            onClick={() => goToImage(index)}
          />
        ))}
      </div>
    </div>
  );
}