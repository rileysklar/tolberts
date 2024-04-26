function PhotoGallery() {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4">
        <img
          src="../../public/tlb-1.jpg"
          alt="Description of the image"
          className="h-auto w-full object-cover object-center"
        />
        <img
          src="../../public/tlb-2.jpg"
          alt="Description of the image"
          className="h-full w-full object-cover object-center"
        />
        <img
          src="../../public/tlb-4.jpg"
          alt="Description of the image"
          className="h-full w-full object-cover object-center"
        />
        <img
          src="../../public/tlb-4.jpg"
          alt="Description of the image"
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
}
export default PhotoGallery;
