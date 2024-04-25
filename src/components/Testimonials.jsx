import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    text: "I love the food at Tolbert's. I have been coming here for years and I am never disappointed. The service is always great and the food is always delicious.",
    author: "John Doe",
  },
  {
    text: "I love the food at Tolbert's. I have been coming here for years and I am never disappointed. The service is always great and the food is always delicious.",
    author: "Jane Doe",
  },
  {
    text: "I love the food at Tolbert's. I have been coming here for years and I am never disappointed. The service is always great and the food is always delicious.",
    author: "Jim Doe",
  },
];

function Testimonials() {
  return (
    <section className="chili-white  py-[148px]">
      <h2 className="noto text-center text-3xl font-bold">
        What our patrons say
      </h2>
      <div className="morphism container mx-auto p-12">
        <Carousel>
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <p>{testimonial.text}</p>
                <p className="text-right font-bold">- {testimonial.author}</p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}

export default Testimonials;
