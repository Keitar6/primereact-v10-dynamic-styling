import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { confirmPopup, ConfirmPopup } from 'primereact/confirmpopup';
import { APP_GLOBALS } from './utils/constants/globals';
import { withApp } from './react-integration-functionalities-test/src';

function App() {
  const toast = useRef<Toast>(null);

  const accept = () => {
    toast.current.show({
      severity: 'info',
      summary: 'Confirmed',
      detail: 'You have accepted',
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: 'warn',
      summary: 'Rejected',
      detail: 'You have rejected',
      life: 3000,
    });
  };

  const confirm1 = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: 'Are you sure you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept,
      reject,
    });
  };

  const confirm2 = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: 'Do you want to go to event mgmt?',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept,
      reject,
    });
  };

  return (
    <div className={APP_GLOBALS.PRODUCT_NAME}>
      <header>
        <div>Learn React</div>
      </header>

      <h1>Home Page</h1>
      <Toast ref={toast} />
      <ConfirmPopup />
      <Button onClick={confirm1} icon="pi pi-check" label="About page" />
      <Button onClick={confirm2} icon="pi pi-times" label="Event management" />
    </div>
  );
}

export default withApp(App, APP_GLOBALS);
