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
    { imageUrl: "https://media.istockphoto.com/id/1185329848/photo/eco-natural-paper-cups-straws-toothbrush-flat-lay-on-gray-background-sustainable-lifestyle.webp?b=1&s=170667a&w=0&k=20&c=edFulXtClrJWP0pC9BZHbEVsOO6HhsZFz9pVi6QkNsQ=" },
    { imageUrl: "https://plus.unsplash.com/premium_photo-1678865183765-696a4b1887d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHN1c3RhaW5hYmxlJTIwcHJvZHVjdCUyMGJhbm5lcnxlbnwwfHwwfHx8MA%3D%3D" },
    { imageUrl: "https://images.unsplash.com/photo-1525904097878-94fb15835963?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHN1c3RhaW5hYmxlJTIwcHJvZHVjdCUyMGJhbm5lcnxlbnwwfHwwfHx8MA%3D%3D" },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <Carousel className="relative w-full max-w-full">
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[300px] sm:h-[450px] md:h-[650px]">
                <Card className="w-full h-full rounded-lg overflow-hidden">
                  <CardContent className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={banner.imageUrl}
                      alt={`Banner ${index + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white bg-opacity-75 rounded-full hover:bg-opacity-90 transition duration-300" />
        <CarouselNext className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white bg-opacity-75 rounded-full hover:bg-opacity-90 transition duration-300" />
      </Carousel>
    </div>
  );
}
