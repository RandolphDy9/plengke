import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

type Testimonial = {
  name: string;
  role: string;
  image: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Lorem Ipsum",
    role: "Dolor Sit",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "Amet Consectetur",
    role: "Adipiscing Elit",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    quote:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    name: "Sed Do",
    role: "Eiusmod Tempor",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    quote:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    name: "Incididunt Ut",
    role: "Labore Et",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    quote:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    name: "Dolore Magna",
    role: "Aliqua Enim",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    quote:
      "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  },
  {
    name: "Minim Veniam",
    role: "Quis Nostrud",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    quote:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
  },
  {
    name: "Exercitation",
    role: "Ullamco Laboris",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    quote:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
  },
  {
    name: "Commodo Consequat",
    role: "Duis Aute",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    quote:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
  },
  {
    name: "Irure Dolor",
    role: "Reprehenderit In",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    quote:
      "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  },
  {
    name: "Voluptate Velit",
    role: "Esse Cillum",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    quote:
      "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
  },
  {
    name: "Fugiat Nulla",
    role: "Pariatur Excepteur",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    quote:
      "Omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
  },
  {
    name: "Sint Occaecat",
    role: "Cupidatat Non",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
    quote:
      "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
  },
];

const chunkArray = (
  array: Testimonial[],
  chunkSize: number
): Testimonial[][] => {
  const result: Testimonial[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const testimonialChunks = chunkArray(
  testimonials,
  Math.ceil(testimonials.length / 3)
);

export default function WallOfLoveSection() {
  return (
    <section>
      <div className="py-16 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-[#fd5e02] mb-4">
              Loved by the Community
            </h2>
            <p className="text-lg text-[#023341]/80 max-w-2xl mx-auto">
              These are the words of our customers who have enjoyed our food and
              services.
            </p>
            <div className="w-24 h-1 bg-linear-to-r from-[#fd5e02] via-[#023341] to-[#fd5e02] mx-auto rounded-full mt-4" />
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
            {testimonialChunks.map((chunk, chunkIndex) => (
              <div key={chunkIndex} className="space-y-3">
                {chunk.map(({ name, role, quote, image }, index) => (
                  <Card key={index}>
                    <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
                      <Avatar className="size-9">
                        <AvatarImage
                          alt={name}
                          src={image}
                          loading="lazy"
                          width="120"
                          height="120"
                        />
                        <AvatarFallback>ST</AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-medium">{name}</h3>

                        <span className="text-muted-foreground block text-sm tracking-wide">
                          {role}
                        </span>

                        <blockquote className="mt-3">
                          <p className="text-gray-700 dark:text-gray-300">
                            {quote}
                          </p>
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
