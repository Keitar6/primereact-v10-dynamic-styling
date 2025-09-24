import { FC } from 'react';
import { Button } from 'primereact/button';
import { withRemote } from '../../utils/Hocs';
import '../../styles/styles.css';

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
      <Button>First Button</Button>
      <Button>Second Button</Button>
    </>
  );
};

export default withRemote(Remote);
