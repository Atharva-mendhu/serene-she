"use client";

import { Card } from "@/components/ui/card";
import {
  Users,
  Briefcase,
  Calendar,
  MapPin,
  Building2,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

const upcomingEvents = [
  {
    id: "1",
    title: "Women in Tech Meetup",
    date: "Mar 15, 2024",
    time: "6:00 PM",
    location: "Virtual",
    attendees: 45,
  },
  {
    id: "2",
    title: "Leadership Workshop",
    date: "Mar 20, 2024",
    time: "2:00 PM",
    location: "Virtual",
    attendees: 30,
  },
];

const jobOpportunities = [
  {
    id: "1",
    title: "Senior Product Manager",
    company: "Tech Solutions Inc.",
    location: "Remote",
    type: "Full-time",
    posted: "2 days ago",
  },
  {
    id: "2",
    title: "Engineering Team Lead",
    company: "Innovation Labs",
    location: "Hybrid",
    type: "Full-time",
    posted: "1 week ago",
  },
  {
    id: "3",
    title: "UX Research Lead",
    company: "Design Co",
    location: "Remote",
    type: "Contract",
    posted: "3 days ago",
  },
];

const mentors = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "VP of Engineering",
    company: "Tech Giants",
    expertise: ["Leadership", "Career Growth", "Technical Management"],
    availability: "Available for 30min sessions",
  },
  {
    id: "2",
    name: "Emily Chen",
    role: "Product Director",
    company: "Innovation Co",
    expertise: ["Product Strategy", "Team Building", "Career Transitions"],
    availability: "Available for 45min sessions",
  },
];

export default function NetworkingSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/10 rounded-full">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold">Your Network</h3>
                <p className="text-sm text-muted-foreground">150+ connections</p>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              Grow Network
            </button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-full">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold">Events</h3>
                <p className="text-sm text-muted-foreground">{upcomingEvents.length} upcoming</p>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              Browse Events
            </button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/10 rounded-full">
                <Briefcase className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold">Job Matches</h3>
                <p className="text-sm text-muted-foreground">{jobOpportunities.length} new matches</p>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              View All
            </button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{event.title}</h3>
                    <span className="text-sm text-primary">{event.attendees} attending</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20">
                    Join Event
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Featured Job Opportunities</h2>
          <div className="space-y-3">
            {jobOpportunities.map((job) => (
              <Card key={job.id} className="p-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{job.title}</h3>
                      <span className="text-sm text-muted-foreground">{job.posted}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      <span>{job.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {job.type}
                    </span>
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      {job.location}
                    </span>
                  </div>
                  <button className="w-full px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 flex items-center justify-center space-x-2">
                    <span>View Details</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Available Mentors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mentors.map((mentor) => (
            <Card key={mentor.id} className="p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">{mentor.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    {mentor.role} at {mentor.company}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{mentor.availability}</span>
                  <button className="flex items-center space-x-2 text-primary hover:text-primary/80">
                    <MessageCircle className="h-4 w-4" />
                    <span>Connect</span>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 
