interface LogoProps {
  size?: string; // Tailwind size classes like 'text-6xl', 'text-2xl', etc.
  additionalClasses?: string; // Additional classes for customization
}

const Logo = ({
  size = "text-6xl md:text-8xl",
  additionalClasses = "",
}: LogoProps) => {
  return (
    <h1
      className={`${size} font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-red-500 drop-shadow-2xl leading-tight ${additionalClasses}`}
    >
      <span className="text-white">رؤية</span> ٣٤
    </h1>
  );
};

export default Logo;
