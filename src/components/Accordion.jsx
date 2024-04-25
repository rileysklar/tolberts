import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          What is the history behind Tolbert's Chili Parlor?
        </AccordionTrigger>
        <AccordionContent>
          Tolbert's Chili Parlor was founded by Frank X. Tolbert in 1976 in
          Dallas, originally. Frank X. Tolbert is known as "The Grandfather of
          Chili" and co-founded the Terlingua Chili Cookoff in 1967. The
          restaurant is now located in a historic building from 1911 in downtown
          Grapevine, Texas.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          What is unique about the Terlingua burger at Tolbert's?
        </AccordionTrigger>
        <AccordionContent>
          The Terlingua burger at Tolbert's features the famous Terlingua chili.
          It is served on a grilled brioche bun with cheese, diced onions, and
          seasoned with Terlingua chili salt. The beef patty receives an
          abundance of flame, making the burger notably juicy and flavorful.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          Is Tolbert's Chili Parlor suitable for children?
        </AccordionTrigger>
        <AccordionContent>
          Yes, Tolbert's Chili Parlor is family-friendly and suitable for
          children. The menu offers a variety of options that cater to all age
          groups, ensuring a pleasant dining experience for families.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          Does Tolbert's Chili Parlor have vegetarian options?
        </AccordionTrigger>
        <AccordionContent>
          While Tolbert's Chili Parlor is famous for its chili and burgers, they
          do offer a selection of vegetarian options. Please check their current
          menu or ask the staff for vegetarian dishes available during your
          visit.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>
          Can you dine at Tolbert's Chili Parlor without a reservation?
        </AccordionTrigger>
        <AccordionContent>
          Yes, Tolbert's Chili Parlor generally welcomes walk-ins. However,
          during busy times or for large groups, it's advisable to make a
          reservation to ensure seating is available.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>
          What are the operating hours of Tolbert's Chili Parlor?
        </AccordionTrigger>
        <AccordionContent>
          The operating hours can vary, so it's best to check Tolbert's Chili
          Parlor's official website or contact them directly to get the most
          accurate and up-to-date information on their hours of operation.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-7">
        <AccordionTrigger>
          Is there parking available at Tolbert's Chili Parlor?
        </AccordionTrigger>
        <AccordionContent>
          Yes, there is parking available near Tolbert's Chili Parlor. There are
          street parking options and public parking lots in downtown Grapevine,
          which are convenient for visitors.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
