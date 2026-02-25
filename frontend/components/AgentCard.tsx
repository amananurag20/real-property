'use client';

import Link from 'next/link';
import { MapPin, CheckCircle2, MessageSquare, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <article className="bg-white rounded-[28px] overflow-hidden shadow-[0_25px_50px_-30px_rgba(15,23,42,0.4)] border border-border/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_35px_70px_-35px_rgba(15,23,42,0.45)] flex flex-col h-full">
        {/* Background Header */}
        <div className="h-20 bg-gradient-to-r from-primary/10 to-primary/5 flex-shrink-0"></div>

        {/* Content */}
        <div className="px-6 pb-6 flex flex-col flex-1 justify-between">
          <div className="space-y-4">
            {/* Profile Image */}
            <div className="flex justify-center -mt-16">
              <div className="relative">
                <div className="h-32 w-32 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                  <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover"
                  />
                </div>
                {verified && (
                  <div className="absolute -bottom-1 -right-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 shadow-lg border-4 border-white">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Agent Info */}
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {name}
              </h3>
              <p className="text-sm font-medium text-primary">{agency}</p>
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <MapPin className="w-3 h-3" />
                {serviceAreas}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-muted/30 px-3 py-3 text-center">
                <p className="text-xs uppercase tracking-wide text-black font-bold">Experience</p>
                <p className="text-sm font-normal text-slate-900 mt-1">{experience}</p>
              </div>
              <div className="rounded-2xl bg-muted/30 px-3 py-3 text-center">
                <p className="text-xs uppercase tracking-wide text-black font-bold">Specialty</p>
                <p className="text-sm font-normal text-slate-900 mt-1">{specialization}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1 h-10 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all">
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </Button>
            <Button variant="outline" className="flex-1 h-10 rounded-xl border-2 font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default AgentCard;
