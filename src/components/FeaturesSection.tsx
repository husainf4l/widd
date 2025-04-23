"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const FeaturesSection: React.FC = () => {
  const products = [
    {
      id: "widdvar",
      name: "WIDDvar",
      description: "تقنية تحكيم متطورة بالذكاء الاصطناعي",
      imageSrc: "/images/section/a1.png",
      link: "/products/widdvar",
    },
    {
      id: "widdpost",
      name: "WIDDpost",
      description: "تحليل متكامل لما بعد المباراة",
      imageSrc: "/images/section/a2.png",
      link: "/products/widdpost",
    },
    {
      id: "widdone",
      name: "WIDDone",
      description: "حل متكامل للأندية بتكلفة معقولة",
      imageSrc: "/images/section/a3.png",
      link: "/products/widdone",
    },
    {
      id: "widd360",
      name: "Widd360",
      description: "كاميرا بزاوية 360° مدمجة في زي اللاعبين",
      imageSrc: "/images/widd360.png",
      link: "/products/widd360",
    },
    {
      id: "varhome",
      name: "VARhome",
      description:
        "تعرض المباراة مباشرة في وضع الواقع المعزز، كتجربة جماعية تعزز التفاعل دون أي عزلة. وعند اللحظات الحاسمة، تتحوّل النظارة لتجربة واقع افتراضي قصيرة، ثم تعود بسلاسة",
      imageSrc: "/images/section/a1.png",
      link: "/products/widd-var-one",
    },
    {
      id: "varstudiom",
      name: "VARstudiom",
      description:
        "تعرض الإحصائيات على الزجاج الشفاف وأنت وسط الجمهور. عند اللحظات الحاسمة، تتحوّل لتجربة VR قصيرة، ثم تعود للواقع بسلاسة",
      imageSrc: "/images/section/a2.png",
      link: "/products/widd-var",
    },
  ];

  return (
    <section className="w-full bg-background dark:bg-gray-900 text-foreground dark:text-white overflow-hidden p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={product.link}
            className="relative flex flex-col justify-end overflow-hidden group transition-all duration-700 aspect-[6/4] rounded-xl cursor-pointer"
          >
            {/* Background Image without Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src={product.imageSrc}
                alt={product.name}
                fill
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Content with subtle gradient for readability */}
            <div className="relative z-10 p-4 md:p-6 space-y-2 w-full bg-gradient-to-t from-black/40 via-black/20 to-transparent rounded-b-xl">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                {product.name}
              </h3>
              <p className="text-sm text-white">{product.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
