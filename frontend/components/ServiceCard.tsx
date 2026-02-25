'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: string;
  count: string;
  image: string;
  description: string;
}

const ServiceCard = ({ service, count, image, description }: ServiceCardProps) => {
  return (
    <Link
      href="/services"
      className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <article className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border/50 bg-white/95 shadow-[0_25px_50px_-30px_rgba(15,23,42,0.4)] transition-all duration-500 backdrop-blur-md hover:-translate-y-1 hover:shadow-[0_35px_70px_-35px_rgba(15,23,42,0.45)]">
        <div className="relative h-32 w-full overflow-hidden">
          <img
            src={image}
            alt={`${service} professionals`}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" aria-hidden="true"></div>
        </div>

        <div className="flex flex-1 flex-col items-center gap-4 px-6 pb-6 pt-5 text-center">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {service}
            </h3>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary/70">
              {count} Specialists
            </p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all group-hover:bg-slate-800">
            Connect now
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </article>
    </Link>
  );
};

export default ServiceCard;
