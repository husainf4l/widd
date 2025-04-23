"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

const FeaturesSection: React.FC = () => {
  const images = [
    {
      src: "/images/widd360.png",
      alt: "Widd360 Camera – Saudi Innovation",
    },
    {
      src: "/images/widd3602.png",
      alt: "Widd360 Camera – Saudi Innovation",
    },
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  // Manual navigation
  const goToSlide = (index: number) => {
    setCurrentImage(index);
  };

  return (
    <section className="w-full py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        {/* Image Slideshow */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative overflow-hidden rounded-xl shadow-xl aspect-[10/5]">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentImage ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover w-full h-full"
                  priority={index === 0}
                />
              </div>
            ))}

            {/* Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImage ? "bg-white w-6" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2">
          <h3 className="text-3xl font-bold mb-4 leading-tight">
            رؤيا360 – الرؤية السعودية
          </h3>
          <p className="text-lg mb-6 leading-relaxed text-gray-100">
            تم تطوير <strong>رؤيا360</strong> بفكر سعودي ورؤية تقنية عصرية،
            لتكون أول كاميرا مدمجة في زي اللاعبين، تمنح الجمهور تجربة مشاهدة
            استثنائية بزاوية 360° كما لو كان في قلب الملعب. مصممة بدقة، خفيفة
            الوزن، لاسلكية بالكامل، وتبث الحدث مباشرة إلى تطبيق الواقع
            الافتراضي.
          </p>
          <ul className="list-disc list-inside space-y-2 text-blue-300 text-base">
            <li>عدسة مزدوجة (أمامية وخلفية) لرؤية محيطية واقعية</li>
            <li>تصوير فائق الوضوح بدقة 4K</li>
            <li>اتصال مباشر بالمنصة السحابية وبث فوري</li>
            <li>مصممة لتحمل الحركة، التعرق، وضغط المباريات</li>
            <li>ابتكار وصناعة سعودية 100%</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
