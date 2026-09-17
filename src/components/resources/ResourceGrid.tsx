import React from 'react';
import resourcesData from '../../data/resources.json';
import { ResourceCard } from './ResourceCard';

export const ResourceGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {resourcesData.resources.map((res) => (
        <ResourceCard
          key={res.id}
          id={res.id}
          title={res.title}
          category={res.category}
          description={res.description}
          format={res.format}
          tag={res.tag}
        />
      ))}
    </div>
  );
};
