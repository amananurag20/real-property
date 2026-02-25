'use client';

import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

interface RequestCardProps {
  id: number;
  type: string;
  budget: string;
  location: string;
  propertyType: string;
  timeline: string;
  status: string;
}

const RequestCard = ({ 
  id, 
  type, 
  budget, 
  location, 
  propertyType, 
  timeline, 
  status 
}: RequestCardProps) => {
  return (
    <Link
      href={`/requests/${id}`}
      className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <article className="bg-white rounded-[32px] p-6 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.35)] border border-border/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_90px_-40px_rgba(15,23,42,0.45)]">
        <div className="flex items-center justify-between mb-6">
          <span className="inline-flex items-center rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white shadow-sm">
            {type} Request
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
            <span className="h-2 w-2 rounded-full bg-current"></span>
            {status}
          </span>
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
              {propertyType}
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              {location}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-muted/30 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Budget</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{budget}</p>
            </div>
            <div className="rounded-2xl bg-muted/30 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Timeline</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{timeline}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3">
            <span className="text-xs font-medium text-muted-foreground">Tap to view request details</span>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition-all group-hover:bg-slate-800 group-hover:translate-x-1">
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default RequestCard;
