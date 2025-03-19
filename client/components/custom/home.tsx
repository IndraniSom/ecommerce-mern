"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { PauseIcon, PlayIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Banner() {
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovering, setIsHovering] = useState(false)

  const banners = [
    {
      imageUrl:
        "https://media.istockphoto.com/id/1185329848/photo/eco-natural-paper-cups-straws-toothbrush-flat-lay-on-gray-background-sustainable-lifestyle.webp?b=1&s=170667a&w=0&k=20&c=edFulXtClrJWP0pC9BZHbEVsOO6HhsZFz9pVi6QkNsQ=",
      title: "Eco-Friendly Products",
      description: "Sustainable solutions for everyday living",
    },
    {
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1678865183765-696a4b1887d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHN1c3RhaW5hYmxlJTIwcHJvZHVjdCUyMGJhbm5lcnxlbnwwfHwwfHx8MA%3D%3D",
      title: "Sustainable Living",
      description: "Small changes, big impact",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1525904097878-94fb15835963?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHN1c3RhaW5hYmxlJTIwcHJvZHVjdCUyMGJhbm5lcnxlbnwwfHwwfHx8MA%3D%3D",
      title: "Natural Materials",
      description: "Better for you, better for the planet",
    },
  ]

  const onSelect = useCallback(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
  }, [api])

  useEffect(() => {
    if (!api) return
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api, onSelect])

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (isPlaying && !isHovering) {
      intervalId = setInterval(() => {
        if (api) {
          api.scrollNext()
        }
      }, 5000)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [api, isPlaying, isHovering])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Carousel className="relative w-full max-w-full" setApi={setApi}>
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[300px] sm:h-[450px] md:h-[650px]">
                <Card className="w-full h-full rounded-lg overflow-hidden border-0">
                  <CardContent className="relative w-full h-full flex items-center justify-center p-0">
                    <Image
                      src={banner.imageUrl || "/placeholder.svg"}
                      alt={`Banner ${index + 1}`}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, 100vw"
                      style={{ objectFit: "cover" }}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {/* Gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                    {/* Banner content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white z-10">
                      <h2 className="text-2xl md:text-4xl font-bold mb-2 tracking-tight">{banner.title}</h2>
                      <p className="text-sm md:text-lg max-w-md opacity-90">{banner.description}</p>
                        <Button className="mt-4 bg-black hover:bg-primary/90 text-white">Shop Now</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                current === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}

          <Button
            size="icon"
            variant="outline"
            className="ml-2 bg-white/20 backdrop-blur-sm border-white/20 text-white hover:bg-white/30 hover:text-white"
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
          </Button>
        </div>

        <CarouselPrevious className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm border-white/20 text-white hover:bg-white/30 hover:text-white" />
        <CarouselNext className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm border-white/20 text-white hover:bg-white/30 hover:text-white" />
      </Carousel>
    </div>
  )
}


