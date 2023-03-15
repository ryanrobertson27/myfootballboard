import Logout from "./Logout";

const DashboardSidebar = () => {
  let temp;

  return (
    <div className="flex w-full flex-col justify-between border-r border-gray-400">
      <div className="mt-5 ml-5 ">
        <div>LOGO</div>
        <div>Boards</div>
        <div>Past Boards</div>
        <div>Account</div>
      </div>
      <div className="mb-5 self-center">
        <Logout />
      </div>
    </div>
  );
};

export default DashboardSidebar;
