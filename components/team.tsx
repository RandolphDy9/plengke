"use client";

import PageHeader from "@/components/page-header";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  alt: string;
};

const defaultMembers: TeamMember[] = [
  { name: "Maria", role: "Kitchen Manager", image: "/images/staff-2.jpg", alt: "Chef proudly presenting large lechon roll" },
  { name: "Miguel", role: "Head Chef", image: "/images/staff-1.jpg", alt: "Team member holding lechon roll with warm smile" },
  { name: "Ana", role: "Store Manager", image: "/images/staff-3.jpg", alt: "Staff member displaying tray of lechon slices" },
];

type TeamProps = {
  members?: TeamMember[];
  title?: string;
  subtitle?: string;
};

export default function Team({ members, title, subtitle }: TeamProps) {
  const teamMembers = members && members.length > 0 ? members : defaultMembers;

  return (
    <section id="team" className="py-20 bg-[#fcf5e3]/50">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <PageHeader
            title={title || "Meet Our Team"}
            subtitle={subtitle || "The passionate people behind your favorite Filipino dishes"}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="animate-on-scroll glass rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#fd5e02]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-[#023341] mb-1">{member.name}</h3>
                <p className="text-[#fd5e02] font-semibold">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
