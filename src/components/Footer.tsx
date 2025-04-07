const Footer = () => {
  return (
    <footer className="bg-[#10121A] text-white py-6">
      <div className="container mx-auto text-center space-y-4">
        <div className="flex justify-center space-x-6">
          <a href="/privacy" className="text-sm hover:underline">
            سياسة الخصوصية
          </a>
          <a href="/terms" className="text-sm hover:underline">
            شروط الاستخدام
          </a>
          <a href="/contact" className="text-sm hover:underline">
            تواصل معنا
          </a>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} رؤية ٣٤. جميع الحقوق محفوظة.
          </p>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} رؤية ٣٤. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
