import img1 from "../assets/tolberts-gallery-1.jpg";
import img2 from "../assets/tolberts-gallery-2.jpg";
import img3 from "../assets/tolberts-gallery-3.jpg";
import img4 from "../assets/tolberts-gallery-4.jpg";
import img5 from "../assets/tolberts-gallery-5.jpg";
import img6 from "../assets/tolberts-gallery-6.jpg";
import img7 from "../assets/tolberts-gallery-7.jpg";
import img8 from "../assets/tolberts-gallery-8.jpg";
import img9 from "../assets/tolberts-gallery-9.jpg";
import img10 from "../assets/tolberts-gallery-10.jpg";
import img11 from "../assets/tolberts-gallery-11.jpg";
import img12 from "../assets/tolberts-gallery-12.jpg";

export default function ImageGallery() {
  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
  ];

  return (
    <div className="p-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-3">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={`gallery-${index}`}
            className="rounded-lg"
          />
        ))}
      </div>
    </div>
  );
}
