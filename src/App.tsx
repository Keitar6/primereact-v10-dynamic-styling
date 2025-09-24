import { Button } from 'primereact/button';
import { PRODUCT_NAME } from './onecxIntegration/utils/globals';
import { withApp } from './utils/Hocs';
// import './styles/styles.css';

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
