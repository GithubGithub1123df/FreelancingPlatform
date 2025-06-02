
function UserNotification() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-spaceBetween bg-white flex-column vh-100">

        <h1>Notification</h1>

        <div className="d-flex align-items-center justify-content-center flex-column w-75 vh-100 overflow-hidden" >
            <ul className="align-items-center w-75 h-100 overflow-y-scroll overflow-hidden list-unstyled">
          <li className="m-2 bg-primary rounded-3 w-100 p-2 m-2 text-align-center ">
          5From : Category / Title | Status |
          </li>
</ul>
        </div>
      </div>
    </>
  );
}
export default UserNotification;
