import { Status } from '@repo/observability/status';
import Link from 'next/link';

interface SubItem {
  title: string;
  href: string;
}

interface NavigationItem {
  title: string;
  href?: string;
  items?: SubItem[];
}

const navigationItems: NavigationItem[] = [
  { title: 'Item 1', href: '/item-1' },
  {
    title: 'Item 2',
    items: [
      { title: 'Subitem 1', href: '/subitem-1' },
      { title: 'Subitem 2', href: '/subitem-2' },
    ],
  },
  { title: 'Item 3', href: '/item-3' },
];

export const Footer = () => {
  return (
    <section className="dark border-foreground/10 border-t">
      <div className="w-full bg-background py-20 text-foreground lg:py-40">
        <div className="container mx-auto">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="flex flex-col items-start gap-8">
              <div className="flex flex-col gap-2">
                <h2 className="max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl">
                  next-forge
                </h2>
                <p className="max-w-lg text-left text-foreground/75 text-lg leading-relaxed tracking-tight">
                  This is the start of something new.
                </p>
              </div>
              <Status />
            </div>
            <div className="grid items-start gap-10 lg:grid-cols-3">
              {navigationItems.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-start gap-1 text-base"
                >
                  <div className="flex flex-col gap-2">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="flex items-center justify-between"
                        target={
                          item.href.includes('http') ? '_blank' : undefined
                        }
                        rel={
                          item.href.includes('http')
                            ? 'noopener noreferrer'
                            : undefined
                        }
                      >
                        <span className="text-xl">{item.title}</span>
                      </Link>
                    ) : (
                      <p className="text-xl">{item.title}</p>
                    )}
                    {item.items?.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className="flex items-center justify-between"
                        target={
                          subItem.href.includes('http') ? '_blank' : undefined
                        }
                        rel={
                          subItem.href.includes('http')
                            ? 'noopener noreferrer'
                            : undefined
                        }
                      >
                        <span className="text-foreground/75">
                          {subItem.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
