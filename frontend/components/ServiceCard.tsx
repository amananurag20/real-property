'use client';

import Link from 'next/link';
import { MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getServiceImage } from '@/data/services';

interface ServiceCardProps {
  id: number;
  name: string;
  type: string;
  location: string;
  experience: number;
  verified: boolean;
  phone: string;
  image?: string;
}

const ServiceCard = ({ 
  id, 
  name, 
  type, 
  location, 
  experience, 
  verified, 
  phone,
  image
}: ServiceCardProps) => {
  const serviceImage = image || getServiceImage(type as any);

  return (
    <Link
      href={`/services/${id}`}
      className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <article className="bg-white rounded-[32px] overflow-hidden shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_90px_-40px_rgba(15,23,42,0.5)] flex flex-col h-full">
        {/* Image Section with Overlay */}
        <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
          <img
            src={serviceImage}
            alt={type}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" aria-hidden="true"></div>
          
          {/* Badges */}
          <div className="absolute inset-0 flex items-start justify-between p-4">
            <div className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-slate-900 shadow-lg">
              {type}
            </div>
            {verified && (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                <CheckCircle2 className="w-4 h-4" />
                Verified
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-7 flex flex-col flex-1 justify-between">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                {name}
              </h3>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1">
                <span className="text-xs font-semibold text-primary">
                  {experience} yrs
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              <p className="text-sm text-muted-foreground flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="font-medium">{location}</span>
              </p>

              <p className="text-sm text-muted-foreground flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="font-medium">{phone}</span>
              </p>
            </div>
          </div>

          <Button className="w-full h-11 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all shadow-sm mt-4">
            Connect
          </Button>
        </div>
      </article>
    </Link>
  );
};

export default ServiceCard;
