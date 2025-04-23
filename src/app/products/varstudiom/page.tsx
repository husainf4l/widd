import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function VarStudiomPage() {
  return (
    <main className="min-h-screen bg-gray-700 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            VARstudiom – تجربة مشاهدة متكاملة في الاستوديو
          </h1>

          <div className="relative w-full aspect-video mb-8 rounded-xl overflow-hidden">
            <Image
              src="/images/section/a2.png"
              alt="VARstudiom Technology"
              fill
              className="object-cover"
            />
          </div>

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-xl leading-relaxed mb-6">
              <strong>VARstudiom</strong> هي أول منظومة هجينة تجمع بين الواقع
              المعزز والواقع الافتراضي بطريقة تحترم الحضور وتعزز اللحظة. تعرض
              الإحصائيات على الزجاج الشفاف وأنت وسط الجمهور. عند اللحظات
              الحاسمة، تتحوّل لتجربة VR قصيرة، ثم تعود للواقع بسلاسة.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">المميزات الرئيسية</h2>
            <ul className="space-y-3 mb-8">
              <li>عرض الإحصائيات على زجاج شفاف</li>
              <li>تجربة غامرة وسط الجمهور</li>
              <li>تحول سلس إلى تجربة VR في اللحظات الحاسمة</li>
              <li>عرض متكامل للبيانات والتحليلات</li>
              <li>تصميم متطور يناسب بيئة الاستوديو</li>
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
