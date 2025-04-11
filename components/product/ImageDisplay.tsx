"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ImageDisplay({images}: {images: string[]}) {
  return (
    <div className="relative w-full">
      <Carousel className="h-fit">
        <CarouselPrevious className="absolute z-[100] top-1/2 left-0 transform -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </CarouselPrevious>
        <CarouselContent>
          {images.map((image, index) => (
              <CarouselItem key={index}>
                <img
                    src={image}
                    alt="product"
                    className="w-full h-full object-cover"
                />
              </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </CarouselNext>
      </Carousel>
    </div>
  );
}
