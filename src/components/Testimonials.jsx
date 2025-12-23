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
    <section className="flex flex-col items-center justify-center gap-4 bg-[url('/tolbs-outside.jpg')] bg-cover bg-center bg-no-repeat px-4 py-24 text-white sm:py-32 lg:py-36">
      <div className="morphism-x mx-auto flex w-full max-w-xl flex-col gap-4 rounded-xl p-6 shadow-xl sm:p-8 lg:p-10">
        <h2 className="noto text-center text-2xl font-bold sm:text-3xl lg:text-4xl">
          ⭐️⭐️⭐️⭐️⭐️
        </h2>
        <Carousel>
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <p className="text-base leading-relaxed sm:text-lg">{testimonial.text}</p>
                <p className="mt-4 text-right text-lg font-bold sm:text-xl lg:text-2xl">
                  - {testimonial.author}
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex justify-between">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

export default Testimonials;
