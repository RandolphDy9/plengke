import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import PageHeader from "@/components/page-header";

type Testimonial = {
  name: string;
  role: string;
  image: string;
  quote: string;
};

const defaultTestimonials: Testimonial[] = [
  { name: "Lorem Ipsum", role: "Dolor Sit", image: "https://randomuser.me/api/portraits/men/1.jpg", quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { name: "Amet Consectetur", role: "Adipiscing Elit", image: "https://randomuser.me/api/portraits/men/6.jpg", quote: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
  { name: "Sed Do", role: "Eiusmod Tempor", image: "https://randomuser.me/api/portraits/men/7.jpg", quote: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
  { name: "Incididunt Ut", role: "Labore Et", image: "https://randomuser.me/api/portraits/men/8.jpg", quote: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
  { name: "Dolore Magna", role: "Aliqua Enim", image: "https://randomuser.me/api/portraits/men/4.jpg", quote: "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
  { name: "Minim Veniam", role: "Quis Nostrud", image: "https://randomuser.me/api/portraits/men/2.jpg", quote: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores." },
  { name: "Exercitation", role: "Ullamco Laboris", image: "https://randomuser.me/api/portraits/men/5.jpg", quote: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit." },
  { name: "Commodo Consequat", role: "Duis Aute", image: "https://randomuser.me/api/portraits/men/9.jpg", quote: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti." },
  { name: "Irure Dolor", role: "Reprehenderit In", image: "https://randomuser.me/api/portraits/men/10.jpg", quote: "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga." },
  { name: "Voluptate Velit", role: "Esse Cillum", image: "https://randomuser.me/api/portraits/men/11.jpg", quote: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio." },
  { name: "Fugiat Nulla", role: "Pariatur Excepteur", image: "https://randomuser.me/api/portraits/men/12.jpg", quote: "Omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis." },
  { name: "Sint Occaecat", role: "Cupidatat Non", image: "https://randomuser.me/api/portraits/men/13.jpg", quote: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur." },
];

const chunkArray = (array: Testimonial[], chunkSize: number): Testimonial[][] => {
  const result: Testimonial[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

type WallOfLoveSectionProps = {
  testimonials?: Testimonial[];
  title?: string;
  subtitle?: string;
};

export default function WallOfLoveSection({ testimonials, title, subtitle }: WallOfLoveSectionProps) {
  const items = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;
  const chunks = chunkArray(items, Math.ceil(items.length / 3));

  return (
    <section>
      <div className="py-16 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12">
            <PageHeader
              title={title || "Loved by the Community"}
              subtitle={subtitle || "These are the words of our customers who have enjoyed our food and services."}
            />
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
            {chunks.map((chunk, chunkIndex) => (
              <div key={chunkIndex} className="space-y-3">
                {chunk.map(({ name, role, quote, image }, index) => (
                  <Card key={index}>
                    <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
                      <Avatar className="size-9">
                        <AvatarImage alt={name} src={image} loading="lazy" width="120" height="120" />
                        <AvatarFallback>ST</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#fd5e02] text-[#fd5e02]" />
                          ))}
                        </div>
                        <h3 className="font-medium">{name}</h3>
                        <span className="text-muted-foreground block text-sm tracking-wide">{role}</span>
                        <blockquote className="mt-3">
                          <p className="text-gray-700 dark:text-gray-300">{quote}</p>
                        </blockquote>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
