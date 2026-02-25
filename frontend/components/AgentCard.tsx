'use client';

import Link from 'next/link';
import { Users, Home, MapPin, CheckCircle2 } from 'lucide-react';

interface AgentCardProps {
  id: number;
  name: string;
  agency: string;
  experience: string;
  specialization: string;
  serviceAreas: string;
  verified: boolean;
  image: string;
}

const AgentCard = ({ 
  id, 
  name, 
  agency, 
  experience, 
  specialization, 
  serviceAreas, 
  verified, 
  image 
}: AgentCardProps) => {
  return (
    <Link
      href={`/agents/${id}`}
      className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <article className="bg-white rounded-[32px] p-6 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.35)] border border-border/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_90px_-40px_rgba(15,23,42,0.45)]">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="h-24 w-24 rounded-full overflow-hidden ring-4 ring-primary/10 shadow-lg">
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover"
              />
            </div>
            {verified && (
              <div className="absolute -bottom-2 -right-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 shadow-lg">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-sm font-medium text-primary/80">{agency}</p>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{serviceAreas}</p>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full">
            <div className="rounded-2xl bg-muted/30 px-3 py-3">
              <Users className="mx-auto mb-2 h-5 w-5 text-primary" />
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Experience</p>
              <p className="text-sm font-semibold text-slate-900">{experience}</p>
            </div>
            <div className="rounded-2xl bg-muted/30 px-3 py-3">
              <Home className="mx-auto mb-2 h-5 w-5 text-primary" />
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Specialty</p>
              <p className="text-sm font-semibold text-slate-900">{specialization}</p>
            </div>
            <div className="rounded-2xl bg-muted/30 px-3 py-3">
              <MapPin className="mx-auto mb-2 h-5 w-5 text-primary" />
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Service</p>
              <p className="text-sm font-semibold text-slate-900">{serviceAreas}</p>
            </div>
          </div>

          <span className="inline-flex h-11 w-full items-center justify-center rounded-full bg-slate-900 px-8 text-sm font-semibold text-white shadow-sm transition-all group-hover:bg-slate-800">
            View profile
          </span>
        </div>
      </article>
    </Link>
  );
};

export default AgentCard;
