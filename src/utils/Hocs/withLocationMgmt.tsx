import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CurrentLocationTopic } from '@onecx/integration-interface';

type Location = {
  url: string;
};

type WithLocationMgmtProps = {
  location: Location;
};

export function withLocationMgmt<P extends object>(
  RemoteComponent: React.ComponentType<P & WithLocationMgmtProps>,
): React.FC<P> {
  return (props: P) => {
    const [location, setLocation] = useState<Location>({ url: '' });

    useEffect(() => {
      const LocationTopic = new CurrentLocationTopic().subscribe((location) => {
        setLocation((prevValue) =>
          'url' in location && typeof location.url === 'string'
            ? { url: location.url }
            : prevValue,
        );

        return location;
      });

      return () => {
        LocationTopic.unsubscribe();
      };
    }, []);

    return (
      <BrowserRouter>
        <RemoteComponent {...props} location={location} />
      </BrowserRouter>
    );
  };
}
