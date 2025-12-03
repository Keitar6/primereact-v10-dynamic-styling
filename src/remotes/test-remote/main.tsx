import { FC } from 'react';
import { Button } from 'primereact/button';
import {
  useSyncedLocation,
  withRemote,
} from '../../react-integration-functionalities-test/src';
import { APP_GLOBALS } from '../../utils/constants/globals';

type Props = {
  location: {
    url: string;
  };
};

const Remote: FC<Props> = () => {
  const location = useSyncedLocation();

  return (
    <>
      <h5 className="testyStylessy">test remote</h5>
      <span>{location.url}</span>
      <Button>First Button</Button>
      <Button>Second Button</Button>
    </>
  );
};

export default withRemote(Remote, APP_GLOBALS);
