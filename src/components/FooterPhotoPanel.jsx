function PhotoGallery() {
  return (
    <div className="overflow-hidden">
      <div className="grid grid-cols-2 sm:grid-cols-4">
        <img
          src="/tlb-1.jpg"
          alt="Tolbert's Restaurant interior"
          className="aspect-square h-auto w-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
        <img
          src="/tlb-3.jpg"
          alt="Tolbert's Restaurant food"
          className="aspect-square h-auto w-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
        <img
          src="/tlb-4.jpg"
          alt="Tolbert's Restaurant atmosphere"
          className="aspect-square h-auto w-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
        <img
          src="/tlb-2.jpg"
          alt="Tolbert's Restaurant crowd"
          className="aspect-square h-auto w-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
}
export default PhotoGallery;
