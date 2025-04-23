import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Technology from "@/components/sections/Technology";
import DemoAnalytics from "@/components/sections/DemoAnalytics";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Technology />

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/saudi-vision.jpg"
                  alt="WIDD.AI - Born in Saudi Arabia"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-2xl"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-xl w-64">
                <div className="text-lg font-bold text-primary mb-2">
                  Saudi Vision 2030
                </div>
                <p className="text-sm text-black/70">
                  Proudly contributing to Saudi Arabia's technological
                  transformation through innovation in sports analytics.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Where Technology Meets Tradition
              </h2>
              <p className="text-lg text-black/80 mb-6">
                WIDD.AI is an ethical sports intelligence platform that fuses
                cutting-edge AI with the soul of the game. Born in Saudi Arabia,
                WIDD is built for athletes, coaches, and fans who believe
                performance is about more than numbers—it's about heart.
              </p>
              <p className="text-lg text-black/80 mb-8">
                We capture emotion, precision, and play through live data,
                immersive visuals, and ethical AI that respects the game's
                spirit. Whether tracking a sprint, breaking down a tactic, or
                reliving a historic goal—WIDD does it with integrity,
                creativity, and love.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-primary/5 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">
                    150+
                  </div>
                  <div className="text-sm text-black/70">
                    Unique data points captured per player per second
                  </div>
                </div>
                <div className="bg-secondary/5 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-secondary mb-2">
                    98%
                  </div>
                  <div className="text-sm text-black/70">
                    Accuracy in emotional state analysis
                  </div>
                </div>
              </div>

              <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors">
                Learn More About Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      <DemoAnalytics />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Experience the Future of Sports Intelligence
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Join the athletes, coaches, and teams already using WIDD.AI to
            transform how they understand and experience sports.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-secondary text-black px-8 py-4 rounded-md text-lg font-medium hover:bg-opacity-90 transition-colors">
              Request a Demo
            </button>
            <button className="bg-white text-primary px-8 py-4 rounded-md text-lg font-medium hover:bg-opacity-90 transition-colors">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
