import Navigation from "./Navigation";
import { personalInfo } from "../../data/personalInfo";

const Header = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Nom */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setCurrentPage("accueil")}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl">
                {personalInfo.firstName.charAt(0)}
                {personalInfo.lastName.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {personalInfo.fullName}
              </h1>
              <p className="text-sm text-gray-600">{personalInfo.title}</p>
            </div>
          </div>

          {/* Navigation */}
          <Navigation
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
