import { personalInfo } from "../../data/personalInfo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Informations personnelles */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">
              {personalInfo.fullName}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {personalInfo.tagline}
            </p>
            <div className="flex items-center text-gray-300">
              <span className="mr-2">📍</span>
              {personalInfo.location}
            </div>
            <div className="text-gray-300">
              <span className="mr-2">🎯</span>
              {personalInfo.availability}
            </div>
          </div>

          {/* Contact rapide */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
            <div className="space-y-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
              >
                <span className="mr-3">📧</span>
                {personalInfo.email}
              </a>
              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
              >
                <span className="mr-3">📱</span>
                {personalInfo.phone}
              </a>
            </div>
          </div>

          {/* Objectif professionnel */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">
              Objectif Professionnel
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {personalInfo.objective}
            </p>
            <div className="text-gray-300">
              <span className="mr-2">📚</span>
              {personalInfo.currentStatus}
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} {personalInfo.fullName}. Tous droits réservés.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Site web personnel - CV en ligne
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
