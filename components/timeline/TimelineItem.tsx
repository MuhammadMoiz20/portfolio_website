import { ComponentType } from 'react';

interface TimelineItemProps {
  title: string;
  date: string;
  description: string;
  Icon: ComponentType<{ size?: number }>;
  category?: string;
}

export default function TimelineItem({ title, date, description, Icon, category }: TimelineItemProps) {
  return (
    <div className="rounded-lg border p-4">
      {category && (
        <div className="mb-2 inline-block rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
          {category}
        </div>
      )}
      <h3 className="mb-1 text-lg font-semibold">{title}</h3>
      <p className="mb-2 text-xs text-muted-foreground">{date}</p>
      <p className="text-sm">{description}</p>
    </div>
  );
}


