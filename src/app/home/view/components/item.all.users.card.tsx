import { Carousel } from "../../../../common";
import { CAROUSEL_IMAGES, IMAGES, IMAGES_BASE_URL } from "../../../../shared";

export function ItemAllUsersCard() {
  return (
    <>
      <div>
        <div className="sm:col-span-2 lg:col-span-3 flex items-center justify-center rounded-lg">
          <p className="text-3xl sm:text-5xl font-bold py-4 text-center text-blue-500">
            Bienvenido al Sistema de Tutoría Inteligente
          </p>
        </div>

        <div>
          <Carousel
            images={CAROUSEL_IMAGES}
            timeTransition={3000}
            fastTimeTransition={500}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {IMAGES.map((image, index) => (
            <div
              key={index}
              className="flex items-center justify-center bg-white rounded-lg shadow-lg p-4"
            >
              <img
                className="w-full h-32 object-contain"
                src={`${IMAGES_BASE_URL}${image.src}`}
                alt={image.alt}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
