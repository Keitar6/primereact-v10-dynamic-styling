import { Button } from 'primereact/button';
// import { Knob } from 'primereact/knob';

// import { ConfirmPopup } from 'primereact/confirmpopup';

// const BasicDemo = () => (
//   <div className="card flex justify-center">
//     <Knob onChange={(e) => e.value} min={-50} max={50} />
//   </div>
// );

export const Home = () => {
  // const [isPopOn, setIsPopOn] = useState(false);

  return (
    <>
      <h1>Home Page</h1>
      <Button label="About page">About page</Button>
      <Button label="Event management">Event management</Button>

      {/* <div className="card flex flex-wrap gap-2 justify-center">
        <ConfirmPopup>
          <ConfirmPopup.Trigger variant="outlined">Save</ConfirmPopup.Trigger>
          <ConfirmPopup.Portal>
            <ConfirmPopup.Content>
              <ConfirmPopup.Icon className="pi pi-exclamation-triangle" />
              <ConfirmPopup.Message>
                Are you sure you want to proceed?
              </ConfirmPopup.Message>
            </ConfirmPopup.Content>
            <ConfirmPopup.Footer>
              <ConfirmPopup.Reject severity="secondary" variant="outlined">
                Cancel
              </ConfirmPopup.Reject>
              <ConfirmPopup.Accept>Save</ConfirmPopup.Accept>
            </ConfirmPopup.Footer>
          </ConfirmPopup.Portal>
        </ConfirmPopup>
        <ConfirmPopup>
          <ConfirmPopup.Trigger severity="danger" variant="outlined">
            Delete
          </ConfirmPopup.Trigger>
          <ConfirmPopup.Portal>
            <ConfirmPopup.Content>
              <ConfirmPopup.Icon className="pi pi-info-circle" />
              <ConfirmPopup.Message>
                Are you sure you want to proceed?
              </ConfirmPopup.Message>
            </ConfirmPopup.Content>
            <ConfirmPopup.Footer>
              <ConfirmPopup.Reject severity="secondary" variant="outlined">
                Cancel
              </ConfirmPopup.Reject>
              <ConfirmPopup.Accept severity="danger">
                Delete
              </ConfirmPopup.Accept>
            </ConfirmPopup.Footer>
          </ConfirmPopup.Portal>
        </ConfirmPopup>
      </div> */}
      {/* <BasicDemo /> */}
    </>
  );
};
