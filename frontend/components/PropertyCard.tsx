'use client';

import Link from 'next/link';
import { MapPin, ArrowRight, BedDouble, Bath, Ruler } from 'lucide-react';

interface PropertyCardProps {
  id: number;
  image: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  address: string;
  status: string;
  featured: boolean;
  description: string;
  propertyType: string;
  latitude?: number;
  longitude?: number;
}

const PropertyCard = ({ 
  id, 
  image, 
  price, 
  beds, 
  baths, 
  sqft, 
  address, 
  status, 
  featured, 
  description,
  propertyType,
  latitude,
  longitude 
}: PropertyCardProps) => {
  return (
    <Link
      href={`/properties/${id}`}
      className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <article className="bg-white rounded-[32px] overflow-hidden shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_90px_-40px_rgba(15,23,42,0.5)] flex flex-col h-full">
        <div className="relative h-56 overflow-hidden flex-shrink-0">
          <img
            src={image}
            alt={propertyType}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" aria-hidden="true"></div>
          {featured && (
            <div className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-slate-900 shadow-lg">
              Featured
            </div>
          )}
          <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-white shadow-lg">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
            {status}
          </div>
        </div>

        <div className="p-7 flex flex-col flex-1 justify-between">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-slate-900">{price}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                {propertyType}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {description}
              </p>
            </div>
            
            <p className="text-sm text-muted-foreground flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="font-medium">{address}</span>
            </p>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-2xl bg-muted/40 px-3 py-2.5 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <BedDouble className="w-4 h-4 text-primary" />
                </div>
                <p className="text-xs font-semibold text-slate-900">{beds}</p>
                <p className="text-xs text-muted-foreground">Beds</p>
              </div>
              <div className="rounded-2xl bg-muted/40 px-3 py-2.5 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Bath className="w-4 h-4 text-primary" />
                </div>
                <p className="text-xs font-semibold text-slate-900">{baths}</p>
                <p className="text-xs text-muted-foreground">Baths</p>
              </div>
              <div className="rounded-2xl bg-muted/40 px-3 py-2.5 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Ruler className="w-4 h-4 text-primary" />
                </div>
                <p className="text-xs font-semibold text-slate-900">{sqft}</p>
                <p className="text-xs text-muted-foreground">Sqft</p>
              </div>
            </div>

            <button className="w-full h-11 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all shadow-sm">
              View details
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PropertyCard;
