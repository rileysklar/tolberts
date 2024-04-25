function PhotoGallery() {
  return (
    <div>
      <div class="grid grid-cols-2 sm:grid-cols-4">
        <img
          src="../../public/tlb-1.jpg"
          alt="Description of the image"
          class="h-auto w-full object-cover object-center"
        />
        <img
          src="../../public/tlb-2.jpg"
          alt="Description of the image"
          class="h-full w-full object-cover object-center"
        />
        <img
          src="../../public/tlb-3.jpg"
          alt="Description of the image"
          class="h-full w-full object-cover object-center"
        />
        <img
          src="../../public/tlb-4.jpg"
          alt="Description of the image"
          class="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
}
export default PhotoGallery;
