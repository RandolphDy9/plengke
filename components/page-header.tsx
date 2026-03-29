type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="text-center container mx-auto px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-teal-900 mb-4 animate-on-scroll">
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-lg text-teal-800/80 max-w-2xl mx-auto animate-on-scroll"
          style={{ transitionDelay: "100ms" }}
        >
          {subtitle}
        </p>
      )}
      <div
        className="w-24 h-1 bg-linear-to-r from-orange-500 via-teal-700 to-orange-500 mx-auto rounded-full mt-4 animate-on-scroll"
        style={{ transitionDelay: "200ms" }}
      />
    </div>
  );
}
