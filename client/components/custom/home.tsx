"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Banner() {
  const banners = [
    { imageUrl: "/assets/banner1.png" },
    { imageUrl: "/assets/banner2.png" },
    { imageUrl: "/assets/banner3.png" },
  ];

  return (
    <div className="w-full relative">
      <Carousel className="w-full max-w-full">
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <div className="relative overflow-hidden">
                <Card className="relative overflow-hidden rounded-lg">
                  <CardContent className="relative flex items-center justify-center h-[300px] sm:h-[450px] md:h-[650px]">
                    <Image
                      src={banner.imageUrl}
                      alt={`Banner ${index + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 z-10 p-2 bg-white bg-opacity-50 rounded-full transform -translate-y-1/2 top-1/2 hover:bg-opacity-75 transition duration-300" />
        <CarouselNext className="absolute right-2 z-10 p-2 bg-white bg-opacity-50 rounded-full transform -translate-y-1/2 top-1/2 hover:bg-opacity-75 transition duration-300" />
      </Carousel>
    </div>
  );
}