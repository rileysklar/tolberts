import { Button } from "./button";

export default function TopNav() {
  return (
    <nav
      className="flex w-full justify-between bg-black
       p-4 text-xl font-semibold text-white"
    >
      <div className="mx-auto flex w-full max-w-7xl ">
        <div className="logo w-[100px]">
          <img src="src/assets/logo-white.png" alt="Logo" />
        </div>
        <div className="menu flex w-full justify-end space-x-4">
          <Button variant="link" className="text-xl text-white">
            <a href="/">Home</a>
          </Button>

          <Button variant="link" className="text-xl text-white">
            Menu
          </Button>
          <Button variant="link" className="text-xl text-white">
            <a href="/about">About</a>
          </Button>
          <Button variant="link" className=" text-xl text-white">
            Order
          </Button>
        </div>
      </div>
    </nav>
  );
}
