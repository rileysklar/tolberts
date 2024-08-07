import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    text: "“Probably the best chili ever. And if you don’t get donkey tails you’re not getting the full experience. TONS of beer options, good food, good atmosphere and friendly staff! We always go when we’re in town!”",
    author: "Jerica Q.",
  },
  {
    text: "“Great Music, comfortable cozy venue.  A place I would visit again with friends!”",
    author: "Jean T.C.",
  },
  {
    text: "“We could hear the music from across the street. We stopped in for a beer and enjoyed the band.  Ended up closing the place down!”",
    author: "William S.",
  },
  {
    text: "”Great food and atmosphere, loved the food. Will be back!“",
    author: "Larry M.",
  },
  {
    text: "“Tolbert’s chili parlor is unspeakably good. It’s goodness transcends the bounds of any language. You might die if you don’t go- at least die on the inside.”",
    author: "Mark E.",
  },
];

function Testimonials() {
  return (
    <section className="flex flex-col gap-4 bg-[url('/tolbs-outside.jpg')] bg-cover bg-center bg-no-repeat px-4 py-[148px] text-white">
      <div className="morphism-x container px-8 flex w-full flex-col gap-4 p-4 pt-6 lg:py-12 lg:px-14 shadow-lg sm:w-1/2">
        <h2 className="noto text-center text-3xl lg:text-4xl font-bold">
          ⭐️⭐️⭐️⭐️⭐️
        </h2>
        <Carousel>
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <p className="lg:text-lg" >{testimonial.text}</p>

                <p className="text-right text-xl lg:text-2xl font-bold">
                  - {testimonial.author}
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4 flex justify-between">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

export default Testimonials;
