import { useState, useEffect } from "react";
import { education, educationStats } from "../data/education";
import {
  experience,
  experienceStats,
  careerObjectives,
} from "../data/experience";

// Composant Button intégré
const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon = null,
  iconPosition = "left",
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl border-transparent",
    secondary:
      "bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl border-transparent",
    outline:
      "bg-transparent hover:bg-blue-50 text-blue-600 border-2 border-blue-600 hover:border-blue-700",
    ghost: "bg-transparent hover:bg-blue-50 text-blue-600 border-transparent",
    success:
      "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl border-transparent",
    warning:
      "bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg hover:shadow-xl border-transparent",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
    xl: "px-10 py-4 text-xl",
  };

  const baseClasses = `
    inline-flex items-center justify-center
    font-semibold rounded-lg
    transition-all duration-300 transform
    hover:scale-105 active:scale-95
    focus:outline-none focus:ring-4 focus:ring-blue-300
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    ${fullWidth ? "w-full" : ""}
  `;

  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${disabled || loading ? "pointer-events-none" : ""}
    ${className}
  `.trim();

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className={`mr-2 ${typeof icon === "string" ? "text-lg" : ""}`}>
          {icon}
        </span>
      )}

      <span>{children}</span>

      {icon && iconPosition === "right" && (
        <span className={`ml-2 ${typeof icon === "string" ? "text-lg" : ""}`}>
          {icon}
        </span>
      )}
    </button>
  );
};

// Composant Badge intégré
const Badge = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    primary: "bg-blue-100 text-blue-800 border-blue-200",
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    purple: "bg-purple-100 text-purple-800 border-purple-200",
    orange: "bg-orange-100 text-orange-800 border-orange-200",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  const badgeClasses = `
    inline-flex items-center font-medium rounded-full border
    transition-all duration-200
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.trim();

  return (
    <span className={badgeClasses} {...props}>
      {children}
    </span>
  );
};

// Composant Card intégré
const Card = ({
  children,
  variant = "default",
  hover = true,
  padding = "lg",
  shadow = "md",
  rounded = "lg",
  className = "",
  ...props
}) => {
  const variants = {
    default: "bg-white border-gray-200",
    primary: "bg-blue-50 border-blue-200",
    success: "bg-green-50 border-green-200",
    warning: "bg-yellow-50 border-yellow-200",
    purple: "bg-purple-50 border-purple-200",
    orange: "bg-orange-50 border-orange-200",
  };

  const paddings = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  const shadows = {
    sm: "shadow-sm",
    md: "shadow-lg",
    lg: "shadow-xl",
    xl: "shadow-2xl",
  };

  const roundings = {
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
  };

  const baseClasses = `
    ${variants[variant]}
    ${paddings[padding]}
    ${shadows[shadow]}
    ${roundings[rounded]}
    ${
      hover
        ? "transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        : ""
    }
    border overflow-hidden
  `;

  const cardClasses = `${baseClasses} ${className}`.trim();

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

// Composant Timeline
const TimelineItem = ({ item, index, isLast }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`relative flex items-start transition-all duration-700 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
      }`}
    >
      {/* Timeline ligne */}
      <div className="flex flex-col items-center mr-6">
        <div
          className={`w-4 h-4 rounded-full border-4 ${
            item.color || "bg-blue-500"
          } border-white shadow-lg z-10`}
        ></div>
        {!isLast && <div className="w-0.5 h-16 bg-gray-300 mt-2"></div>}
      </div>

      {/* Contenu */}
      <div className="flex-1 pb-8">
        <Card
          variant={item.status === "current" ? "primary" : "default"}
          hover={true}
          className="relative"
        >
          {/* Badge de période */}
          <div className="absolute top-4 right-4">
            <Badge
              variant={item.status === "current" ? "primary" : "default"}
              size="sm"
            >
              {item.period}
            </Badge>
          </div>

          {/* En-tête */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2 pr-24">
              {item.degree}
            </h3>
            <div className="flex items-center text-gray-600 mb-2">
              <span className="mr-2">🏫</span>
              <span className="font-medium">{item.institution}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="mr-2">📍</span>
              <span>{item.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed mb-6">
            {item.description}
          </p>

          {/* Points forts */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Points forts :</h4>
            <div className="flex flex-wrap gap-2">
              {item.highlights.map((highlight, idx) => (
                <Badge key={idx} variant="primary" size="sm">
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Composant Experience Card
const ExperienceCard = ({ exp, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 300);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <Card hover={true} className="h-full">
        {/* En-tête avec badge */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {exp.position}
            </h3>
            <div className="flex items-center text-gray-600 mb-1">
              <span className="mr-2">🏢</span>
              <span className="font-medium">{exp.company}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="mr-2">📍</span>
              <span>{exp.location}</span>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="success" size="sm" className="mb-2">
              {exp.duration}
            </Badge>
            <div className="text-sm text-gray-500">{exp.period}</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed mb-6">{exp.description}</p>

        {/* Responsabilités */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <span className="mr-2">📋</span>
            Responsabilités principales :
          </h4>
          <ul className="space-y-2">
            {exp.responsibilities.map((resp, idx) => (
              <li key={idx} className="flex items-start text-gray-700">
                <span className="text-blue-500 mr-2 mt-1">•</span>
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Compétences acquises */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <span className="mr-2">🎯</span>
            Compétences développées :
          </h4>
          <div className="flex flex-wrap gap-2">
            {exp.skills.map((skill, idx) => (
              <Badge key={idx} variant="warning" size="sm">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Réalisations */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <span className="mr-2">🏆</span>
            Réalisations :
          </h4>
          <ul className="space-y-1">
            {exp.achievements.map((achievement, idx) => (
              <li key={idx} className="flex items-start text-gray-700">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
};

// Composant principal Parcours
const Parcours = () => {
  const [activeTab, setActiveTab] = useState("formation");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section Hero */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-16 overflow-hidden">
        {/* Éléments de fond animés */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-400/10 rounded-full animate-bounce"
            style={{ animationDuration: "3s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Parcours & Formation
          </h1>
          <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed text-blue-50">
            Découvrez mon parcours académique et professionnel, de la
            comptabilité vers l'analyse de données, en passant par l'économie
            appliquée.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-white to-blue-200 mx-auto mt-8"></div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8 py-4">
            <button
              onClick={() => setActiveTab("formation")}
              className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300 ${
                activeTab === "formation"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <span className="mr-2">🎓</span>
              Formation Académique
            </button>
            <button
              onClick={() => setActiveTab("experience")}
              className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300 ${
                activeTab === "experience"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <span className="mr-2">💼</span>
              Expérience Professionnelle
            </button>
          </div>
        </div>
      </section>

      {/* Contenu des tabs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Formation */}
          {activeTab === "formation" && (
            <div>
              {/* Statistiques de formation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <Card variant="primary" padding="lg" className="text-center">
                  <div className="text-3xl mb-4">🎓</div>
                  <div className="text-2xl font-bold text-blue-700 mb-2">
                    {educationStats.totalYearsOfStudy}+
                  </div>
                  <p className="text-blue-600 font-medium">Années d'études</p>
                </Card>

                <Card variant="success" padding="lg" className="text-center">
                  <div className="text-3xl mb-4">📜</div>
                  <div className="text-2xl font-bold text-green-700 mb-2">
                    {educationStats.certifications.length}
                  </div>
                  <p className="text-green-600 font-medium">Diplômes obtenus</p>
                </Card>

                <Card variant="purple" padding="lg" className="text-center">
                  <div className="text-3xl mb-4">🔬</div>
                  <div className="text-2xl font-bold text-purple-700 mb-2">
                    3
                  </div>
                  <p className="text-purple-600 font-medium">
                    Domaines d'expertise
                  </p>
                </Card>
              </div>

              {/* Timeline de formation */}
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                  Mon Parcours Académique
                </h2>
                <div className="space-y-0">
                  {education.map((item, index) => (
                    <TimelineItem
                      key={item.id}
                      item={item}
                      index={index}
                      isLast={index === education.length - 1}
                    />
                  ))}
                </div>
              </div>

              {/* Réalisations académiques */}
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Réalisations Académiques
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {educationStats.academicAchievements.map(
                    (achievement, index) => (
                      <Card
                        key={index}
                        variant="default"
                        padding="lg"
                        hover={true}
                      >
                        <div className="flex items-start">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <span className="text-green-600 text-lg">✓</span>
                          </div>
                          <p className="text-gray-700 font-medium">
                            {achievement}
                          </p>
                        </div>
                      </Card>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab Expérience */}
          {activeTab === "experience" && (
            <div>
              {/* Statistiques d'expérience */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <Card variant="success" padding="lg" className="text-center">
                  <div className="text-3xl mb-4">⏱️</div>
                  <div className="text-2xl font-bold text-green-700 mb-2">
                    {experienceStats.totalMonthsExperience}
                  </div>
                  <p className="text-green-600 font-medium">
                    Mois d'expérience
                  </p>
                </Card>

                <Card variant="warning" padding="lg" className="text-center">
                  <div className="text-3xl mb-4">🏢</div>
                  <div className="text-2xl font-bold text-yellow-700 mb-2">
                    {experienceStats.industriesWorked.length}
                  </div>
                  <p className="text-yellow-600 font-medium">
                    Secteurs explorés
                  </p>
                </Card>

                <Card variant="purple" padding="lg" className="text-center">
                  <div className="text-3xl mb-4">🎯</div>
                  <div className="text-2xl font-bold text-purple-700 mb-2">
                    {experienceStats.keyCompetencies.length}
                  </div>
                  <p className="text-purple-600 font-medium">
                    Compétences clés
                  </p>
                </Card>
              </div>

              {/* Expériences professionnelles */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                  Mes Expériences Professionnelles
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {experience.map((exp, index) => (
                    <ExperienceCard key={exp.id} exp={exp} index={index} />
                  ))}
                </div>
              </div>

              {/* Objectifs de carrière */}
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Objectifs de Carrière
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card variant="primary" padding="lg">
                    <div className="text-center">
                      <div className="text-3xl mb-4">🎯</div>
                      <h4 className="font-bold text-blue-700 mb-3">
                        Court Terme
                      </h4>
                      <p className="text-blue-600">
                        {careerObjectives.shortTerm}
                      </p>
                    </div>
                  </Card>

                  <Card variant="success" padding="lg">
                    <div className="text-center">
                      <div className="text-3xl mb-4">📈</div>
                      <h4 className="font-bold text-green-700 mb-3">
                        Moyen Terme
                      </h4>
                      <p className="text-green-600">
                        {careerObjectives.mediumTerm}
                      </p>
                    </div>
                  </Card>

                  <Card variant="purple" padding="lg">
                    <div className="text-center">
                      <div className="text-3xl mb-4">🚀</div>
                      <h4 className="font-bold text-purple-700 mb-3">
                        Long Terme
                      </h4>
                      <p className="text-purple-600">
                        {careerObjectives.longTerm}
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prête pour de Nouveaux Défis
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Mon parcours m'a préparée à relever les défis de l'analyse de
            données. Explorons ensemble les opportunités qui s'offrent à nous.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              variant="primary"
              size="lg"
              icon="📞"
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              Discutons d'un Projet
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon="📄"
              className="border-2 border-white text-white hover:bg-white/10"
            >
              Télécharger mon CV
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Parcours;
