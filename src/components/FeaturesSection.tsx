"use client";

const players = [
  {
    name: "ليام ووكر",
    position: "مهاجم • #9",
    avatar: "https://i.pravatar.cc/100?img=1",
    stats: {
      matches: 24,
      goals: 15,
      assists: 8,
      speed: "33.5 كم/س",
    },
  },
  {
    name: "صوفيا مينديز",
    position: "لاعب وسط • #14",
    avatar: "https://i.pravatar.cc/100?img=3",
    stats: {
      matches: 28,
      goals: 5,
      assists: 14,
      passAccuracy: "91%",
    },
  },
  {
    name: "عمر الحسين",
    position: "مدافع • #5",
    avatar: "https://i.pravatar.cc/100?img=5",
    stats: {
      matches: 30,
      goals: 2,
      assists: 6,
      tackles: 45,
    },
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-[#00020a] text-white py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-10 tracking-wide text-right">
          اللاعبين المميزين
        </h2>

        <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
          {players.map((player, index) => (
            <div
              key={index}
              className="bg-[#10121A] rounded-2xl p-6 shadow-lg border border-cyan-600 hover:shadow-cyan-400/50 hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={player.avatar}
                  alt="Player Avatar"
                  className="w-16 h-16 rounded-full border-2 border-cyan-400 hover:scale-110 transition-transform duration-300"
                />
                <div className="text-right">
                  <h3 className="text-xl font-semibold">{player.name}</h3>
                  <p className="text-sm text-cyan-300">{player.position}</p>
                </div>
              </div>
              <ul className="text-sm space-y-2 text-gray-300 text-right">
                <li>
                  <span className="text-cyan-400 font-semibold">
                    المباريات:
                  </span>{" "}
                  {player.stats.matches}
                </li>
                <li>
                  <span className="text-cyan-400 font-semibold">الأهداف:</span>{" "}
                  {player.stats.goals}
                </li>
                <li>
                  <span className="text-cyan-400 font-semibold">
                    التمريرات:
                  </span>{" "}
                  {player.stats.assists}
                </li>
                {player.stats.speed && (
                  <li>
                    <span className="text-cyan-400 font-semibold">السرعة:</span>{" "}
                    {player.stats.speed}
                  </li>
                )}
                {player.stats.passAccuracy && (
                  <li>
                    <span className="text-cyan-400 font-semibold">
                      دقة التمرير:
                    </span>{" "}
                    {player.stats.passAccuracy}
                  </li>
                )}
                {player.stats.tackles && (
                  <li>
                    <span className="text-cyan-400 font-semibold">
                      التدخلات:
                    </span>{" "}
                    {player.stats.tackles}
                  </li>
                )}
              </ul>
              <button className="mt-6 w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold py-3 px-4 rounded-lg transition-all">
                عرض الملف الشخصي
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
