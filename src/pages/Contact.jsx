import { useState } from "react";
import { personalInfo } from "../data/personalInfo";

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

// Composant ContactForm intégré
const ContactForm = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    sujet: "",
    message: "",
    typeContact: "general",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const typeContactOptions = [
    { value: "general", label: "Demande générale", icon: "💬" },
    { value: "stage", label: "Opportunité de stage", icon: "🎓" },
    { value: "emploi", label: "Opportunité d'emploi", icon: "💼" },
    { value: "collaboration", label: "Collaboration", icon: "🤝" },
    { value: "autre", label: "Autre", icon: "📝" },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est obligatoire";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est obligatoire";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.sujet.trim()) {
      newErrors.sujet = "Le sujet est obligatoire";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est obligatoire";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      setFormData({
        nom: "",
        email: "",
        telephone: "",
        sujet: "",
        message: "",
        typeContact: "general",
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setErrors({});
  };

  const FormInput = ({
    label,
    name,
    type = "text",
    required = false,
    icon = null,
    placeholder = "",
    ...props
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`
          w-full px-4 py-3 border rounded-lg
          focus:ring-4 focus:ring-blue-300 focus:border-blue-500
          transition-all duration-200
          ${
            errors[name]
              ? "border-red-500 bg-red-50"
              : "border-gray-300 hover:border-gray-400"
          }
        `}
        {...props}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm flex items-center">
          <span className="mr-1">⚠️</span>
          {errors[name]}
        </p>
      )}
    </div>
  );

  const FormTextArea = ({
    label,
    name,
    required = false,
    icon = null,
    placeholder = "",
    rows = 4,
    ...props
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        className={`
          w-full px-4 py-3 border rounded-lg resize-none
          focus:ring-4 focus:ring-blue-300 focus:border-blue-500
          transition-all duration-200
          ${
            errors[name]
              ? "border-red-500 bg-red-50"
              : "border-gray-300 hover:border-gray-400"
          }
        `}
        {...props}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm flex items-center">
          <span className="mr-1">⚠️</span>
          {errors[name]}
        </p>
      )}
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl">✓</span>
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-4">
          Message envoyé avec succès !
        </h3>
        <p className="text-green-700 mb-6">
          Merci pour votre message. Je vous répondrai dans les plus brefs
          délais.
        </p>
        <Button variant="success" onClick={resetForm} icon="📝">
          Envoyer un autre message
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Contactez-moi</h3>
        <p className="text-gray-600">
          N'hésitez pas à me contacter pour toute question ou opportunité
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Type de contact */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            <span className="mr-2">📋</span>
            Type de demande
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {typeContactOptions.map((option) => (
              <label
                key={option.value}
                className={`
                  flex items-center p-3 border rounded-lg cursor-pointer transition-all
                  ${
                    formData.typeContact === option.value
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 hover:border-gray-400"
                  }
                `}
              >
                <input
                  type="radio"
                  name="typeContact"
                  value={option.value}
                  checked={formData.typeContact === option.value}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className="mr-2">{option.icon}</span>
                <span className="text-sm font-medium">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Nom complet"
            name="nom"
            required
            icon="👤"
            placeholder="Votre nom et prénom"
          />
          <FormInput
            label="Adresse email"
            name="email"
            type="email"
            required
            icon="📧"
            placeholder="votre.email@exemple.com"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Téléphone (optionnel)"
            name="telephone"
            type="tel"
            icon="📱"
            placeholder="+212 XXX-XXXXXX"
          />
          <FormInput
            label="Sujet"
            name="sujet"
            required
            icon="📝"
            placeholder="Objet de votre message"
          />
        </div>

        <FormTextArea
          label="Message"
          name="message"
          required
          icon="💬"
          placeholder="Décrivez votre demande en détail..."
          rows={6}
        />

        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
            icon={isSubmitting ? null : "📤"}
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
          </Button>
        </div>
      </form>
    </div>
  );
};

// Composant principal Contact
const Contact = () => {
  // Liens sociaux et professionnels
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: "💼",
      url: "https://linkedin.com/in/sanae-saber",
      color: "bg-blue-600 hover:bg-blue-700",
      description: "Profil professionnel LinkedIn",
    },
    {
      name: "GitHub",
      icon: "💻",
      url: "https://github.com/sanaesaber",
      color: "bg-gray-800 hover:bg-gray-900",
      description: "Projets et code source",
    },
    {
      name: "Email",
      icon: "📧",
      url: `mailto:${personalInfo.email}`,
      color: "bg-green-600 hover:bg-green-700",
      description: "Contact direct par email",
    },
    {
      name: "Téléphone",
      icon: "📱",
      url: `tel:${personalInfo.phone}`,
      color: "bg-purple-600 hover:bg-purple-700",
      description: "Appel téléphonique",
    },
    {
      name: "CV PDF",
      icon: "📄",
      url: "/cv-sanae-saber.pdf",
      color: "bg-red-600 hover:bg-red-700",
      description: "Télécharger mon CV",
    },
    {
      name: "Portfolio",
      icon: "🎨",
      url: "#",
      color: "bg-yellow-600 hover:bg-yellow-700",
      description: "Voir mes projets",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section Hero */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-12 lg:py-16 overflow-hidden min-h-[85vh] flex items-center">
        {/* Éléments de fond animés */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-400/10 rounded-full animate-bounce"
            style={{ animationDuration: "3s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-24 h-24 bg-blue-300/10 rounded-full animate-ping"
            style={{ animationDuration: "2s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-32 h-32 mx-auto mb-6">
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
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Contactez-moi
          </h1>

          <p className="text-base md:text-lg max-w-4xl mx-auto mb-8 leading-relaxed text-blue-50">
            Prête à transformer vos données en insights précieux. N'hésitez pas
            à me contacter pour discuter de vos projets, opportunités de stage
            ou toute collaboration professionnelle.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="md"
              icon="📧"
              className="bg-white text-blue-600 hover:bg-blue-50 shadow-2xl"
              onClick={() =>
                (window.location.href = `mailto:${personalInfo.email}`)
              }
            >
              Envoyer un Email
            </Button>
            <Button
              variant="outline"
              size="md"
              icon="📱"
              className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm"
              onClick={() =>
                (window.location.href = `tel:${personalInfo.phone}`)
              }
            >
              Appeler Maintenant
            </Button>
          </div>
        </div>

        {/* Indicateur de scroll */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-0.5 h-2 bg-white/70 rounded-full mt-1 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Section Liens Sociaux */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Retrouvez-moi sur
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connectons-nous sur les plateformes professionnelles et découvrez
              mon univers
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : "_self"}
                rel={link.url.startsWith("http") ? "noopener noreferrer" : ""}
                className="block group"
              >
                <Card
                  hover={true}
                  padding="lg"
                  className="text-center group-hover:scale-105 transition-transform duration-300 h-full"
                >
                  <div
                    className={`w-16 h-16 ${link.color} rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110`}
                  >
                    <span className="text-white text-2xl">{link.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {link.name}
                  </h3>
                  <p className="text-gray-600">{link.description}</p>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Section Contact Principal */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Prenons Contact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Que ce soit pour un projet, un stage ou simplement pour échanger,
              je suis à votre disposition
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-8"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Informations de contact */}
            <div>
              <Card padding="xl" shadow="lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Mes Coordonnées
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-xl">👤</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800">
                        Nom complet
                      </h4>
                      <p className="text-blue-600">{personalInfo.fullName}</p>
                    </div>
                  </div>

                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <span className="text-white text-xl">📧</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800">Email</h4>
                      <p className="text-green-600 hover:text-green-800">
                        {personalInfo.email}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <span className="text-white text-xl">📱</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800">
                        Téléphone
                      </h4>
                      <p className="text-purple-600 hover:text-purple-800">
                        {personalInfo.phone}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                    <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-xl">📍</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-800">
                        Localisation
                      </h4>
                      <p className="text-yellow-600">{personalInfo.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-orange-50 rounded-lg">
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-xl">✨</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-800">
                        Disponibilité
                      </h4>
                      <p className="text-orange-600">
                        {personalInfo.availability}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Boutons d'action rapide */}
                <div className="mt-8 space-y-4">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    icon="📧"
                    onClick={() =>
                      (window.location.href = `mailto:${personalInfo.email}?subject=Contact depuis le site web`)
                    }
                  >
                    Envoyer un Email
                  </Button>
                  <Button
                    variant="success"
                    size="lg"
                    fullWidth
                    icon="📱"
                    onClick={() =>
                      (window.location.href = `tel:${personalInfo.phone}`)
                    }
                  >
                    Appeler Maintenant
                  </Button>
                </div>
              </Card>
            </div>

            {/* Formulaire de contact */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Section Préférences de Contact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Mes Préférences de Contact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pour une communication optimale, voici mes préférences et
              disponibilités
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              variant="primary"
              padding="lg"
              className="text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-bold text-blue-800 mb-4">
                Horaires Préférés
              </h3>
              <div className="text-blue-600 space-y-2">
                <p>
                  <strong>Lundi - Vendredi:</strong>
                </p>
                <p>9h00 - 18h00</p>
                <p>
                  <strong>Weekend:</strong>
                </p>
                <p>Sur rendez-vous</p>
              </div>
            </Card>

            <Card
              variant="success"
              padding="lg"
              className="text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl mb-4">💬</div>
              <div className="text-green-600 space-y-2">
                <p>
                  <strong>1. Email professionnel</strong>
                </p>
                <p>
                  <strong>2. LinkedIn</strong>
                </p>
                <p>
                  <strong>3. Téléphone</strong>
                </p>
                <p>
                  <strong>4. Formulaire de contact</strong>
                </p>
              </div>
            </Card>

            <Card
              variant="warning"
              padding="lg"
              className="text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-yellow-800 mb-4">
                Délai de Réponse
              </h3>
              <div className="text-yellow-600 space-y-2">
                <p>
                  <strong>Email:</strong> 24h max
                </p>
                <p>
                  <strong>LinkedIn:</strong> 48h max
                </p>
                <p>
                  <strong>Téléphone:</strong> Immédiat
                </p>
                <p>
                  <strong>Urgences:</strong> Téléphone
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Section CTA finale */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Créons Ensemble Quelque Chose d'Extraordinaire
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Que ce soit pour un stage, un projet de data science, ou simplement
            pour échanger sur l'économie et l'analyse de données, je suis
            toujours ravie de faire de nouvelles rencontres professionnelles.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              variant="primary"
              size="lg"
              icon="🤝"
              className="bg-white text-blue-600 hover:bg-blue-50"
              onClick={() =>
                (window.location.href = `mailto:${personalInfo.email}?subject=Collaboration Professionnelle`)
              }
            >
              Proposer une Collaboration
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon="💼"
              className="border-2 border-white text-white hover:bg-white/10"
              onClick={() =>
                window.open("https://linkedin.com/in/sanae-saber", "_blank")
              }
            >
              Connecter sur LinkedIn
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

export default Contact;
