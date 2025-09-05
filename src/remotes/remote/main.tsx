import { FC } from 'react';
import { withLocationMgmt } from '../../onecxIntegration/utils/withLocationMgmt';
import '../../../styles/styles.css';

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
    </>
  );
};

export default withLocationMgmt(Remote);
