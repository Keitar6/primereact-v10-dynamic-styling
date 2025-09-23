import './App.css';
import { PRODUCT_NAME } from './onecxIntegration/utils/globals';
import { Button } from 'primereact/button';
import { withApp } from './utils/Hocs';

function App() {
  return (
    <div className={PRODUCT_NAME}>
      <header>
        <div>Learn React</div>
      </header>

      <h1>Home Page</h1>
      <Button>About page</Button>
      <Button>Event management</Button>
    </div>
  );
}

export default withApp(App);
