import { useState, useEffect, useRef } from "react";
import { personalInfo } from "../data/personalInfo";
import { educationStats } from "../data/education";
import { experienceStats } from "../data/experience";

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

  const LoadingIcon = () => (
    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {!loading && icon && iconPosition === "left" && (
        <span className={`mr-2 ${typeof icon === "string" ? "text-lg" : ""}`}>
          {icon}
        </span>
      )}

      {loading && (
        <span className="mr-2">
          <LoadingIcon />
        </span>
      )}

      <span>{children}</span>

      {!loading && icon && iconPosition === "right" && (
        <span className={`ml-2 ${typeof icon === "string" ? "text-lg" : ""}`}>
          {icon}
        </span>
      )}
    </button>
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
  icon = null,
  title = null,
  subtitle = null,
  ...props
}) => {
  const variants = {
    default: "bg-white",
    primary: "bg-blue-50 border-blue-200",
    secondary: "bg-gray-50 border-gray-200",
    success: "bg-green-50 border-green-200",
    warning: "bg-yellow-50 border-yellow-200",
    gradient: "bg-gradient-to-br from-blue-600 to-purple-600 text-white",
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
    sm: "rounded-sm",
    md: "rounded-md",
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
    overflow-hidden border
  `;

  const cardClasses = `${baseClasses} ${className}`.trim();

  return (
    <div className={cardClasses} {...props}>
      {(icon || title || subtitle) && (
        <div className="mb-6">
          {icon && (
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-xl">{icon}</span>
            </div>
          )}

          {title && (
            <h3
              className={`text-xl font-bold mb-2 ${
                variant === "gradient" ? "text-white" : "text-gray-900"
              }`}
            >
              {title}
            </h3>
          )}

          {subtitle && (
            <p
              className={`text-sm ${
                variant === "gradient" ? "text-gray-200" : "text-gray-600"
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="flex-grow">{children}</div>
    </div>
  );
};

// Composant StatsCounter pour animer les chiffres
const StatsCounter = ({
  end,
  duration = 2000,
  suffix = "",
  className = "",
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationId;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOutCubic * end);

      setCount(currentCount);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
};

// Composant principal Home
const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Animation de frappe pour le titre
  const words = [
    "Future Analyste de Données",
    "Économiste Passionnée",
    "Spécialiste Comptabilité",
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex <= currentWord.length) {
        setTypedText(currentWord.slice(0, charIndex));
        charIndex++;
      } else {
        setTimeout(() => {
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setTypedText("");
        }, 2000);
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentWordIndex]);

  // Statistiques pour la section highlights
  const stats = [
    {
      number: educationStats.totalYearsOfStudy,
      label: "Années d'études",
      icon: "🎓",
      suffix: "+",
    },
    {
      number: experienceStats.totalMonthsExperience,
      label: "Mois d'expérience",
      icon: "💼",
      suffix: "",
    },
    {
      number: experienceStats.industriesWorked.length,
      label: "Secteurs explorés",
      icon: "🏢",
      suffix: "",
    },
    {
      number: 100,
      label: "Motivation",
      icon: "🚀",
      suffix: "%",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Section Hero améliorée */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-12 lg:py-16 overflow-hidden min-h-[85vh] flex items-center">
        {/* Éléments de fond animés */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full animate-pulse"
            style={{ animationDuration: "3s" }}
          ></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full animate-bounce"
            style={{ animationDuration: "4s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-32 h-32 bg-blue-300/10 rounded-full animate-ping"
            style={{ animationDuration: "2s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Avatar animé avec animation de flottement */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div
                className="w-full h-full bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20"
                style={{
                  animation: "float 3s ease-in-out infinite",
                }}
              >
                <span className="text-4xl font-bold">
                  {personalInfo.firstName.charAt(0)}
                  {personalInfo.lastName.charAt(0)}
                </span>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-30 animate-pulse"></div>
            </div>

            {/* Nom avec animation */}
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              {personalInfo.fullName}
            </h1>

            {/* Titre animé avec effet de frappe */}
            <div className="h-12 mb-6">
              <p className="text-xl md:text-2xl text-blue-100 font-light">
                {typedText}
                <span className="animate-pulse">|</span>
              </p>
            </div>

            <p
              className={`text-base md:text-lg max-w-4xl mx-auto mb-8 leading-relaxed text-blue-50 transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              {personalInfo.introduction}
            </p>

            {/* Call-to-actions optimisés */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              <Button
                variant="primary"
                size="md"
                icon="📄"
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-2xl"
              >
                Télécharger mon CV
              </Button>
              <Button
                variant="outline"
                size="md"
                icon="💬"
                className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm"
              >
                Démarrer une conversation
              </Button>
            </div>
          </div>
        </div>

        {/* Indicateur de scroll */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-0.5 h-2 bg-white/70 rounded-full mt-1 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Section Highlights/Statistiques */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Mon Parcours en Chiffres
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez mon évolution professionnelle et académique à travers
              des données concrètes
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-8"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4 group-hover:animate-bounce">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      <StatsCounter
                        end={stat.number}
                        suffix={stat.suffix}
                        duration={2000}
                      />
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section À propos enrichie */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              À Propos de Moi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mon histoire, mes valeurs et ma vision pour l'avenir
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-8"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contenu principal */}
            <div>
              <Card
                padding="xl"
                shadow="lg"
                className="hover:shadow-2xl transition-shadow duration-300"
              >
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {personalInfo.about}
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 text-xl">🎯</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Mon Objectif
                      </h4>
                      <p className="text-gray-600">{personalInfo.objective}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-xl">📚</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Statut Actuel
                      </h4>
                      <p className="text-gray-600">
                        {personalInfo.currentStatus}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 text-xl">✨</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Disponibilité
                      </h4>
                      <p className="text-gray-600">
                        {personalInfo.availability}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Informations de contact */}
            <div>
              <div className="grid grid-cols-1 gap-6">
                <Card
                  variant="primary"
                  icon="📍"
                  title="Localisation"
                  padding="lg"
                  hover={true}
                >
                  <p className="text-gray-700 font-medium">
                    {personalInfo.location}
                  </p>
                </Card>

                <Card
                  variant="success"
                  icon="📧"
                  title="Email"
                  padding="lg"
                  hover={true}
                >
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-green-700 font-medium hover:text-green-800 transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </Card>

                <Card
                  variant="warning"
                  icon="📱"
                  title="Téléphone"
                  padding="lg"
                  hover={true}
                >
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="text-yellow-700 font-medium hover:text-yellow-800 transition-colors"
                  >
                    {personalInfo.phone}
                  </a>
                </Card>
              </div>

              {/* Call-to-action secondaire */}
              <div className="mt-8 text-center">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon="🚀"
                  className="shadow-lg hover:shadow-xl"
                >
                  Découvrir Mon Parcours
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA finale */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prête à Transformer les Données en Insights
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Collaborons ensemble pour donner du sens aux données et créer de la
            valeur ajoutée
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              variant="primary"
              size="lg"
              icon="📞"
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              Démarrer un Projet
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon="📋"
              className="border-2 border-white text-white hover:bg-white/10"
            >
              Voir Mes Compétences
            </Button>
          </div>
        </div>
      </section>

      {/* Styles CSS intégrés pour les animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
