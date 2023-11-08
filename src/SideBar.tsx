import { RiCustomerService2Fill } from "react-icons/ri";

const SideBar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen bg-slate-700 w-16 m-0 flex flex-col text-white shadow-lg">
            <SideBarIcon
                icon={<RiCustomerService2Fill size={32} />}
                text={"tooltip"}
            />
        </div>
    );
};

const SideBarIcon = ({ icon, text }: { icon: JSX.Element; text: string }) => (
    <div className="relative flex items-center justify-center my-2 mx-auto w-12 h-12 bg-gray-800 text-green-500 shadow-lg hover:bg-green-600 hover:text-white rounded-3xl hover:rounded-xl transition-all duration-300 ease-linear cursor-pointer group">
        {icon}
        <span className="absolute left-14 bg-gray-900 p-2 ml-2 rounded-md shadow-md text-white text-xs font-bold transition-all duration-100 scale-0 group-hover:scale-100">
            {text}
        </span>
    </div>
);

export default SideBar;
