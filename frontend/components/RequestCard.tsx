'use client';

import Link from 'next/link';
import { MapPin, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RequestCardProps {
  id: number;
  type: string;
  title: string;
  location: string;
  budget: string;
  timeline: string;
  user: string;
  posted: string;
}

const RequestCard = ({ 
  id, 
  type, 
  title, 
  location, 
  budget, 
  timeline, 
  user,
  posted
}: RequestCardProps) => {
  return (
    <Link href={`/requests/${id}`} className="block h-full">
      <article className="bg-white rounded-[28px] p-6 shadow-[0_25px_50px_-30px_rgba(15,23,42,0.4)] border border-border/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_35px_70px_-35px_rgba(15,23,42,0.45)] flex flex-col h-full group">
        <div className="flex items-center justify-between mb-3 flex-shrink-0">
          <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
            {type} Request
          </span>
          <span className="text-xs text-muted-foreground font-medium">{posted}</span>
        </div>

        <div className="space-y-3 flex-1">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              {location}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-muted/30 px-3 py-2.5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Budget</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{budget}</p>
            </div>
            <div className="rounded-2xl bg-muted/30 px-3 py-2.5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Timeline</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{timeline}</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <User className="w-3 h-3" />
            Posted by {user}
          </p>
        </div>

        <Button className="w-full h-10 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all flex-shrink-0 mt-4 group-hover:bg-primary">
          View Details
        </Button>
      </article>
    </Link>
  );
};

export default RequestCard;
