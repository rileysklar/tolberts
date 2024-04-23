import { Button } from "./button";

export default function Footer() {
  return (
    <footer className="bg-black p-4 text-center text-white">
      <p>
        &copy; {new Date().getFullYear()}{" "}
        <Button variant="link" className="p-0 text-base text-white">
          Tolbert's Restaurant
        </Button>
      </p>
    </footer>
  );
}
