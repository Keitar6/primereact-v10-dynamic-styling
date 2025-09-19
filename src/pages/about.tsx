import { useAppHref } from '@onecx/react-webcomponents';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

export const About = () => {
  const navigate = useNavigate();
  const { href } = useAppHref();

  return (
    <>
      <h1>About Page</h1>
      <Button
        label="Home page"
        onClick={() => navigate(href)}
        className="p-button-outlined"
      />
    </>
  );
};
