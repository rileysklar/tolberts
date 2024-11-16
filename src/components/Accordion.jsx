import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDemo({ faqData }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqData.map((faq, index) => (
        <AccordionItem value={`item-${index + 1}`} key={`item-${index + 1}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
