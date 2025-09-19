import { FC } from 'react';
import { Button } from 'primereact/button';
import '../../styles/styles.css';
import { withRemote } from '../../utils/Hocs/hocsManagement';

type Props = {
  location: {
    url: string;
  };
};

const Remote: FC<Props> = ({ location }) => {
  return (
    <>
      <h5 className="testyStylessy">test remote</h5>
      <span>{location.url}</span>
      <Button label="First Button" />
      <Button label="Second Button" />
    </>
  );
};

export default withRemote(Remote);
