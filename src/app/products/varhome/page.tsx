import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function VarHomePage() {
  return (
    <main className="min-h-screen bg-gray-700 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            VARhome – منظومة هجينة للمشاهدة المنزلية
          </h1>

          <div className="relative w-full aspect-video mb-8 rounded-xl overflow-hidden">
            <Image
              src="/images/section/a1.png"
              alt="VARhome Technology"
              fill
              className="object-cover"
            />
          </div>

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-xl leading-relaxed mb-6">
              <strong>VARhome</strong> هي أول منظومة هجينة تجمع بين الواقع
              المعزز والواقع الافتراضي بطريقة تحترم الحضور وتعزز اللحظة. الواقع
              المعزز دائم لعرض الإحصائيات وشاشة البث المباشر، والواقع الافتراضي
              للحظات الحاسمة فقط.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">المميزات الرئيسية</h2>
            <ul className="space-y-3 mb-8">
              <li>تعرض المباراة مباشرة في وضع الواقع المعزز</li>
              <li>تجربة جماعية تعزز التفاعل دون أي عزلة</li>
              <li>تتحوّل النظارة لتجربة واقع افتراضي عند اللحظات الحاسمة</li>
              <li>عودة سلسة للوضع الطبيعي بعد اللحظات الحاسمة</li>
              <li>عرض إحصائيات المباراة بشكل متكامل</li>
            </ul>

            <div className="mt-12">
              <Link
                href="/contact"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                طلب عرض توضيحي
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
