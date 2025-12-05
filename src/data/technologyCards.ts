import { TechnologyCard } from '@/types/game';

export const technologyCards: TechnologyCard[] = [
  // === EXISTING PAIRS ===
  
  // Pair 1: Cloud Storage
  {
    id: 'google-drive',
    name: 'Google Drive',
    type: 'big-tech',
    category: 'Stockage Cloud',
    description: 'Stockage cloud avec données aux USA, analyse automatique des fichiers',
    icon: '☁️',
    pillar: 'responsabilite',
    stats: {
      cost: '12€/utilisateur/mois',
      co2: '45kg CO2/an',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'nextcloud'
  },
  {
    id: 'nextcloud',
    name: 'Nextcloud',
    type: 'nird',
    category: 'Stockage Cloud',
    description: 'Cloud souverain hébergé en France, données chiffrées et contrôlées',
    icon: '🔒',
    pillar: 'responsabilite',
    stats: {
      cost: '5€/utilisateur/mois',
      co2: '15kg CO2/an',
      dataLocation: '🇫🇷 France'
    },
    alternativeId: 'google-drive',
    savings: { euros: 7, co2Kg: 30 }
  },

  // Pair 2: Email
  {
    id: 'gmail',
    name: 'Gmail',
    type: 'big-tech',
    category: 'Messagerie',
    description: 'Service email avec scan publicitaire des contenus',
    icon: '📧',
    pillar: 'responsabilite',
    stats: {
      cost: '6€/utilisateur/mois',
      co2: '20kg CO2/an',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'protonmail'
  },
  {
    id: 'protonmail',
    name: 'ProtonMail',
    type: 'nird',
    category: 'Messagerie',
    description: 'Email chiffré de bout en bout, hébergé en Suisse',
    icon: '🛡️',
    pillar: 'responsabilite',
    stats: {
      cost: '4€/utilisateur/mois',
      co2: '8kg CO2/an',
      dataLocation: '🇨🇭 Suisse'
    },
    alternativeId: 'gmail',
    savings: { euros: 2, co2Kg: 12 }
  },

  // Pair 3: Video Conferencing
  {
    id: 'zoom',
    name: 'Zoom',
    type: 'big-tech',
    category: 'Visioconférence',
    description: 'Plateforme américaine avec historique de failles de sécurité',
    icon: '📹',
    pillar: 'responsabilite',
    stats: {
      cost: '15€/utilisateur/mois',
      co2: '35kg CO2/an',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'jitsi'
  },
  {
    id: 'jitsi',
    name: 'Jitsi Meet',
    type: 'nird',
    category: 'Visioconférence',
    description: 'Visio open source, auto-hébergeable, sans compte requis',
    icon: '🎥',
    pillar: 'inclusion',
    stats: {
      cost: 'Gratuit',
      co2: '10kg CO2/an',
      dataLocation: '🇫🇷 Auto-hébergé'
    },
    alternativeId: 'zoom',
    savings: { euros: 15, co2Kg: 25 }
  },

  // Pair 4: Office Suite
  {
    id: 'microsoft-365',
    name: 'Microsoft 365',
    type: 'big-tech',
    category: 'Suite Bureautique',
    description: 'Suite Office cloud avec télémétrie extensive',
    icon: '📊',
    pillar: 'responsabilite',
    stats: {
      cost: '12€/utilisateur/mois',
      co2: '40kg CO2/an',
      dataLocation: '🇺🇸 USA/Irlande'
    },
    alternativeId: 'libreoffice'
  },
  {
    id: 'libreoffice',
    name: 'LibreOffice',
    type: 'nird',
    category: 'Suite Bureautique',
    description: 'Suite bureautique libre, fonctionne hors ligne, formats ouverts',
    icon: '📝',
    pillar: 'inclusion',
    stats: {
      cost: 'Gratuit',
      co2: '5kg CO2/an',
      dataLocation: '💻 Local'
    },
    alternativeId: 'microsoft-365',
    savings: { euros: 12, co2Kg: 35 }
  },

  // Pair 5: LMS
  {
    id: 'google-classroom',
    name: 'Google Classroom',
    type: 'big-tech',
    category: 'Plateforme Éducative',
    description: 'LMS gratuit mais collecte massive de données élèves',
    icon: '🎓',
    pillar: 'responsabilite',
    stats: {
      cost: 'Gratuit (données)',
      co2: '25kg CO2/an',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'moodle'
  },
  {
    id: 'moodle',
    name: 'Moodle',
    type: 'nird',
    category: 'Plateforme Éducative',
    description: 'LMS open source, personnalisable, données hébergées localement',
    icon: '📚',
    pillar: 'inclusion',
    stats: {
      cost: '3€/utilisateur/mois',
      co2: '10kg CO2/an',
      dataLocation: '🇫🇷 France'
    },
    alternativeId: 'google-classroom',
    savings: { euros: 0, co2Kg: 15 }
  },

  // Pair 6: Operating System
  {
    id: 'windows',
    name: 'Windows 11',
    type: 'big-tech',
    category: 'Système d\'exploitation',
    description: 'OS propriétaire avec télémétrie, obsolescence programmée',
    icon: '🪟',
    pillar: 'durabilite',
    stats: {
      cost: '150€/licence',
      co2: '50kg CO2/an',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'linux'
  },
  {
    id: 'linux',
    name: 'Linux Ubuntu',
    type: 'nird',
    category: 'Système d\'exploitation',
    description: 'OS libre, léger, prolonge la vie des ordinateurs',
    icon: '🐧',
    pillar: 'durabilite',
    stats: {
      cost: 'Gratuit',
      co2: '15kg CO2/an',
      dataLocation: '💻 Local'
    },
    alternativeId: 'windows',
    savings: { euros: 150, co2Kg: 35 }
  },

  // Pair 7: Search Engine
  {
    id: 'google-search',
    name: 'Google Search',
    type: 'big-tech',
    category: 'Moteur de recherche',
    description: 'Tracking publicitaire, bulle de filtre, données personnelles',
    icon: '🔍',
    pillar: 'responsabilite',
    stats: {
      cost: 'Gratuit (données)',
      co2: '7g CO2/recherche',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'qwant'
  },
  {
    id: 'qwant',
    name: 'Qwant',
    type: 'nird',
    category: 'Moteur de recherche',
    description: 'Moteur français, pas de tracking, résultats neutres',
    icon: '🔎',
    pillar: 'responsabilite',
    stats: {
      cost: 'Gratuit',
      co2: '3g CO2/recherche',
      dataLocation: '🇫🇷 France'
    },
    alternativeId: 'google-search',
    savings: { euros: 0, co2Kg: 5 }
  },

  // Pair 8: Browser
  {
    id: 'chrome',
    name: 'Google Chrome',
    type: 'big-tech',
    category: 'Navigateur',
    description: 'Navigateur avec tracking intégré et forte consommation RAM',
    icon: '🌐',
    pillar: 'responsabilite',
    stats: {
      cost: 'Gratuit (données)',
      co2: '30kg CO2/an',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'firefox'
  },
  {
    id: 'firefox',
    name: 'Firefox',
    type: 'nird',
    category: 'Navigateur',
    description: 'Navigateur open source, protection vie privée intégrée',
    icon: '🦊',
    pillar: 'responsabilite',
    stats: {
      cost: 'Gratuit',
      co2: '20kg CO2/an',
      dataLocation: '🔒 Local'
    },
    alternativeId: 'chrome',
    savings: { euros: 0, co2Kg: 10 }
  },

  // Pair 9: Hardware
  {
    id: 'apple-macbook',
    name: 'MacBook Pro',
    type: 'big-tech',
    category: 'Matériel',
    description: 'Ordinateur non réparable, obsolescence rapide',
    icon: '💻',
    pillar: 'durabilite',
    stats: {
      cost: '2000€',
      co2: '400kg CO2',
      dataLocation: '🇨🇳 Chine'
    },
    alternativeId: 'reconditionne'
  },
  {
    id: 'reconditionne',
    name: 'PC Reconditionné',
    type: 'nird',
    category: 'Matériel',
    description: 'Ordinateur remis à neuf, économie circulaire',
    icon: '♻️',
    pillar: 'durabilite',
    stats: {
      cost: '400€',
      co2: '50kg CO2',
      dataLocation: '🇫🇷 France'
    },
    alternativeId: 'apple-macbook',
    savings: { euros: 1600, co2Kg: 350 }
  },

  // Pair 10: AI Assistant
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    type: 'big-tech',
    category: 'Assistant IA',
    description: 'IA américaine, données d\'entraînement controversées',
    icon: '🤖',
    pillar: 'responsabilite',
    stats: {
      cost: '20€/mois',
      co2: '500g CO2/requête',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'mistral'
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    type: 'nird',
    category: 'Assistant IA',
    description: 'IA française, modèles open source disponibles',
    icon: '🇫🇷',
    pillar: 'responsabilite',
    stats: {
      cost: '15€/mois',
      co2: '200g CO2/requête',
      dataLocation: '🇫🇷 France'
    },
    alternativeId: 'chatgpt',
    savings: { euros: 5, co2Kg: 100 }
  },

  // === NEW PAIRS (20+) ===

  // Pair 11: Team Communication - Slack vs Mattermost
  {
    id: 'slack',
    name: 'Slack',
    type: 'big-tech',
    category: 'Communication Équipe',
    description: 'Messagerie d\'équipe américaine, données sur serveurs US',
    icon: '💬',
    pillar: 'responsabilite',
    stats: {
      cost: '8€/utilisateur/mois',
      co2: '25kg CO2/an',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'mattermost'
  },
  {
    id: 'mattermost',
    name: 'Mattermost',
    type: 'nird',
    category: 'Communication Équipe',
    description: 'Alternative open source auto-hébergeable, données contrôlées',
    icon: '🔐',
    pillar: 'responsabilite',
    stats: {
      cost: '3€/utilisateur/mois',
      co2: '10kg CO2/an',
      dataLocation: '🇫🇷 Auto-hébergé'
    },
    alternativeId: 'slack',
    savings: { euros: 5, co2Kg: 15 }
  },

  // Pair 12: Gaming/Community - Discord vs Element
  {
    id: 'discord',
    name: 'Discord',
    type: 'big-tech',
    category: 'Communauté',
    description: 'Plateforme communautaire collectant données comportementales',
    icon: '🎮',
    pillar: 'responsabilite',
    stats: {
      cost: 'Gratuit (données)',
      co2: '30kg CO2/an',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'element'
  },
  {
    id: 'element',
    name: 'Element (Matrix)',
    type: 'nird',
    category: 'Communauté',
    description: 'Messagerie décentralisée, chiffrement de bout en bout',
    icon: '🌐',
    pillar: 'responsabilite',
    stats: {
      cost: 'Gratuit',
      co2: '12kg CO2/an',
      dataLocation: '🔒 Décentralisé'
    },
    alternativeId: 'discord',
    savings: { euros: 0, co2Kg: 18 }
  },

  // Pair 13: Instant Messaging - WhatsApp vs Signal
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    type: 'big-tech',
    category: 'Messagerie Instantanée',
    description: 'Messagerie Meta, partage métadonnées avec Facebook',
    icon: '📱',
    pillar: 'responsabilite',
    stats: {
      cost: 'Gratuit (données)',
      co2: '15kg CO2/an',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'signal'
  },
  {
    id: 'signal',
    name: 'Signal',
    type: 'nird',
    category: 'Messagerie Instantanée',
    description: 'Messagerie ultra-sécurisée, aucune collecte de données',
    icon: '🔏',
    pillar: 'responsabilite',
    stats: {
      cost: 'Gratuit',
      co2: '8kg CO2/an',
      dataLocation: '🔒 Chiffré E2E'
    },
    alternativeId: 'whatsapp',
    savings: { euros: 0, co2Kg: 7 }
  },

  // Pair 14: Teams vs Rocket.Chat
  {
    id: 'ms-teams',
    name: 'Microsoft Teams',
    type: 'big-tech',
    category: 'Collaboration',
    description: 'Plateforme collaborative avec télémétrie Microsoft',
    icon: '👥',
    pillar: 'responsabilite',
    stats: {
      cost: '12€/utilisateur/mois',
      co2: '35kg CO2/an',
      dataLocation: '🇺🇸 USA/Irlande'
    },
    alternativeId: 'rocketchat'
  },
  {
    id: 'rocketchat',
    name: 'Rocket.Chat',
    type: 'nird',
    category: 'Collaboration',
    description: 'Plateforme de communication open source complète',
    icon: '🚀',
    pillar: 'inclusion',
    stats: {
      cost: '4€/utilisateur/mois',
      co2: '12kg CO2/an',
      dataLocation: '🇫🇷 Auto-hébergé'
    },
    alternativeId: 'ms-teams',
    savings: { euros: 8, co2Kg: 23 }
  },

  // Pair 15: Cloud Storage - Dropbox vs Cozy Cloud
  {
    id: 'dropbox',
    name: 'Dropbox',
    type: 'big-tech',
    category: 'Stockage Personnel',
    description: 'Service cloud américain, données accessibles par l\'entreprise',
    icon: '📦',
    pillar: 'responsabilite',
    stats: {
      cost: '10€/mois',
      co2: '40kg CO2/an',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'cozycloud'
  },
  {
    id: 'cozycloud',
    name: 'Cozy Cloud',
    type: 'nird',
    category: 'Stockage Personnel',
    description: 'Cloud personnel français, agrégateur de données souverain',
    icon: '🏠',
    pillar: 'responsabilite',
    stats: {
      cost: '3€/mois',
      co2: '12kg CO2/an',
      dataLocation: '🇫🇷 France'
    },
    alternativeId: 'dropbox',
    savings: { euros: 7, co2Kg: 28 }
  },

  // Pair 16: iCloud vs Tresorit
  {
    id: 'icloud',
    name: 'iCloud',
    type: 'big-tech',
    category: 'Stockage Apple',
    description: 'Écosystème fermé Apple, données sur serveurs américains',
    icon: '☁️',
    pillar: 'responsabilite',
    stats: {
      cost: '10€/mois',
      co2: '35kg CO2/an',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'tresorit'
  },
  {
    id: 'tresorit',
    name: 'Tresorit',
    type: 'nird',
    category: 'Stockage Sécurisé',
    description: 'Cloud suisse chiffré zero-knowledge, RGPD compliant',
    icon: '🔐',
    pillar: 'responsabilite',
    stats: {
      cost: '8€/mois',
      co2: '15kg CO2/an',
      dataLocation: '🇨🇭 Suisse'
    },
    alternativeId: 'icloud',
    savings: { euros: 2, co2Kg: 20 }
  },

  // Pair 17: Social - Instagram vs Pixelfed
  {
    id: 'instagram',
    name: 'Instagram',
    type: 'big-tech',
    category: 'Réseau Social',
    description: 'Réseau Meta, tracking publicitaire intensif',
    icon: '📸',
    pillar: 'responsabilite',
    stats: {
      cost: 'Gratuit (données)',
      co2: '50kg CO2/an',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'pixelfed'
  },
  {
    id: 'pixelfed',
    name: 'Pixelfed',
    type: 'nird',
    category: 'Réseau Social',
    description: 'Alternative décentralisée, pas de publicité ni tracking',
    icon: '🖼️',
    pillar: 'responsabilite',
    stats: {
      cost: 'Gratuit',
      co2: '10kg CO2/an',
      dataLocation: '🌍 Fédéré'
    },
    alternativeId: 'instagram',
    savings: { euros: 0, co2Kg: 40 }
  },

  // Pair 18: Twitter/X vs Mastodon
  {
    id: 'twitter',
    name: 'X (Twitter)',
    type: 'big-tech',
    category: 'Microblogging',
    description: 'Réseau propriétaire avec algorithme opaque',
    icon: '🐦',
    pillar: 'responsabilite',
    stats: {
      cost: 'Gratuit (données)',
      co2: '45kg CO2/an',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'mastodon'
  },
  {
    id: 'mastodon',
    name: 'Mastodon',
    type: 'nird',
    category: 'Microblogging',
    description: 'Réseau décentralisé et fédéré, pas d\'algorithme de manipulation',
    icon: '🦣',
    pillar: 'inclusion',
    stats: {
      cost: 'Gratuit',
      co2: '8kg CO2/an',
      dataLocation: '🌍 Fédéré'
    },
    alternativeId: 'twitter',
    savings: { euros: 0, co2Kg: 37 }
  },

  // Pair 19: Video - TikTok vs PeerTube
  {
    id: 'tiktok',
    name: 'TikTok',
    type: 'big-tech',
    category: 'Vidéo Courte',
    description: 'Plateforme chinoise, collecte massive de données utilisateurs',
    icon: '🎵',
    pillar: 'responsabilite',
    stats: {
      cost: 'Gratuit (données)',
      co2: '60kg CO2/an',
      dataLocation: '🇨🇳 Chine/🇺🇸 USA'
    },
    alternativeId: 'peertube'
  },
  {
    id: 'peertube',
    name: 'PeerTube',
    type: 'nird',
    category: 'Vidéo',
    description: 'Alternative décentralisée à YouTube, hébergement P2P',
    icon: '🎬',
    pillar: 'durabilite',
    stats: {
      cost: 'Gratuit',
      co2: '15kg CO2/an',
      dataLocation: '🌍 Fédéré'
    },
    alternativeId: 'tiktok',
    savings: { euros: 0, co2Kg: 45 }
  },

  // Pair 20: Dev Tools - GitHub vs GitLab
  {
    id: 'github',
    name: 'GitHub',
    type: 'big-tech',
    category: 'Code Source',
    description: 'Plateforme Microsoft, code potentiellement utilisé pour IA',
    icon: '🐙',
    pillar: 'responsabilite',
    stats: {
      cost: '4€/utilisateur/mois',
      co2: '20kg CO2/an',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'gitlab'
  },
  {
    id: 'gitlab',
    name: 'GitLab Self-Hosted',
    type: 'nird',
    category: 'Code Source',
    description: 'Forge logicielle auto-hébergeable, contrôle total du code',
    icon: '🦊',
    pillar: 'responsabilite',
    stats: {
      cost: '2€/utilisateur/mois',
      co2: '10kg CO2/an',
      dataLocation: '🇫🇷 Auto-hébergé'
    },
    alternativeId: 'github',
    savings: { euros: 2, co2Kg: 10 }
  },

  // Pair 21: AI Coding - Copilot vs TabNine
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    type: 'big-tech',
    category: 'Assistance Code',
    description: 'IA Microsoft entraînée sur code open source controversé',
    icon: '🤖',
    pillar: 'responsabilite',
    stats: {
      cost: '10€/mois',
      co2: '300g CO2/session',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'tabnine'
  },
  {
    id: 'tabnine',
    name: 'TabNine Local',
    type: 'nird',
    category: 'Assistance Code',
    description: 'IA locale, fonctionne hors ligne, respecte la propriété du code',
    icon: '⌨️',
    pillar: 'responsabilite',
    stats: {
      cost: '8€/mois',
      co2: '50g CO2/session',
      dataLocation: '💻 Local'
    },
    alternativeId: 'copilot',
    savings: { euros: 2, co2Kg: 80 }
  },

  // Pair 22: IDE - VS Code vs VSCodium
  {
    id: 'vscode',
    name: 'VS Code',
    type: 'big-tech',
    category: 'Éditeur Code',
    description: 'Éditeur Microsoft avec télémétrie et tracking intégré',
    icon: '💻',
    pillar: 'responsabilite',
    stats: {
      cost: 'Gratuit',
      co2: '10kg CO2/an',
      dataLocation: '🇺🇸 USA (télémétrie)'
    },
    alternativeId: 'vscodium'
  },
  {
    id: 'vscodium',
    name: 'VSCodium',
    type: 'nird',
    category: 'Éditeur Code',
    description: 'VS Code sans télémétrie Microsoft, 100% open source',
    icon: '✨',
    pillar: 'responsabilite',
    stats: {
      cost: 'Gratuit',
      co2: '8kg CO2/an',
      dataLocation: '💻 Local'
    },
    alternativeId: 'vscode',
    savings: { euros: 0, co2Kg: 2 }
  },

  // Pair 23: Education - Canvas vs OpenEdX
  {
    id: 'canvas',
    name: 'Canvas LMS',
    type: 'big-tech',
    category: 'LMS Éducatif',
    description: 'LMS propriétaire américain, données élèves exportées',
    icon: '📋',
    pillar: 'responsabilite',
    stats: {
      cost: '5€/élève/an',
      co2: '30kg CO2/an',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'openedx'
  },
  {
    id: 'openedx',
    name: 'Open edX',
    type: 'nird',
    category: 'LMS Éducatif',
    description: 'Plateforme MOOC open source, utilisée par Harvard et MIT',
    icon: '🎓',
    pillar: 'inclusion',
    stats: {
      cost: '2€/élève/an',
      co2: '12kg CO2/an',
      dataLocation: '🇫🇷 Auto-hébergé'
    },
    alternativeId: 'canvas',
    savings: { euros: 3, co2Kg: 18 }
  },

  // Pair 24: Quiz - Kahoot vs Wooclap
  {
    id: 'kahoot',
    name: 'Kahoot!',
    type: 'big-tech',
    category: 'Quiz Interactif',
    description: 'Plateforme quiz américaine, données utilisateurs collectées',
    icon: '🎯',
    pillar: 'responsabilite',
    stats: {
      cost: '6€/enseignant/mois',
      co2: '20kg CO2/an',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'wooclap'
  },
  {
    id: 'wooclap',
    name: 'Wooclap',
    type: 'nird',
    category: 'Quiz Interactif',
    description: 'Alternative belge/européenne, RGPD compliant',
    icon: '✋',
    pillar: 'responsabilite',
    stats: {
      cost: '4€/enseignant/mois',
      co2: '10kg CO2/an',
      dataLocation: '🇪🇺 Europe'
    },
    alternativeId: 'kahoot',
    savings: { euros: 2, co2Kg: 10 }
  },

  // Pair 25: Language Learning - Duolingo vs Anki
  {
    id: 'duolingo',
    name: 'Duolingo',
    type: 'big-tech',
    category: 'Apprentissage Langues',
    description: 'App avec publicités intrusives et gamification addictive',
    icon: '🦉',
    pillar: 'inclusion',
    stats: {
      cost: '7€/mois premium',
      co2: '25kg CO2/an',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'anki'
  },
  {
    id: 'anki',
    name: 'Anki',
    type: 'nird',
    category: 'Apprentissage',
    description: 'Flashcards open source, fonctionne hors ligne, 100% gratuit',
    icon: '🧠',
    pillar: 'inclusion',
    stats: {
      cost: 'Gratuit',
      co2: '3kg CO2/an',
      dataLocation: '💻 Local'
    },
    alternativeId: 'duolingo',
    savings: { euros: 7, co2Kg: 22 }
  },

  // Pair 26: Analytics - Google Analytics vs Matomo
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    type: 'big-tech',
    category: 'Analytics Web',
    description: 'Tracking invasif, données vendues aux annonceurs',
    icon: '📈',
    pillar: 'responsabilite',
    stats: {
      cost: 'Gratuit (données)',
      co2: '15kg CO2/an',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'matomo'
  },
  {
    id: 'matomo',
    name: 'Matomo',
    type: 'nird',
    category: 'Analytics Web',
    description: 'Analytics respectueux, auto-hébergeable, RGPD compliant',
    icon: '📊',
    pillar: 'responsabilite',
    stats: {
      cost: '2€/mois',
      co2: '5kg CO2/an',
      dataLocation: '🇫🇷 Auto-hébergé'
    },
    alternativeId: 'google-analytics',
    savings: { euros: 0, co2Kg: 10 }
  },

  // Pair 27: Analytics - Mixpanel vs Plausible
  {
    id: 'mixpanel',
    name: 'Mixpanel',
    type: 'big-tech',
    category: 'Product Analytics',
    description: 'Analytics produit américain avec tracking utilisateur détaillé',
    icon: '🔬',
    pillar: 'responsabilite',
    stats: {
      cost: '25€/mois',
      co2: '20kg CO2/an',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'plausible'
  },
  {
    id: 'plausible',
    name: 'Plausible',
    type: 'nird',
    category: 'Product Analytics',
    description: 'Analytics léger et éthique, pas de cookies',
    icon: '🌱',
    pillar: 'durabilite',
    stats: {
      cost: '9€/mois',
      co2: '3kg CO2/an',
      dataLocation: '🇪🇺 Europe'
    },
    alternativeId: 'mixpanel',
    savings: { euros: 16, co2Kg: 17 }
  },

  // Pair 28: Design - Figma vs Penpot
  {
    id: 'figma',
    name: 'Figma',
    type: 'big-tech',
    category: 'Design UI',
    description: 'Outil Adobe, données design sur serveurs américains',
    icon: '🎨',
    pillar: 'responsabilite',
    stats: {
      cost: '12€/utilisateur/mois',
      co2: '30kg CO2/an',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'penpot'
  },
  {
    id: 'penpot',
    name: 'Penpot',
    type: 'nird',
    category: 'Design UI',
    description: 'Alternative open source espagnole, auto-hébergeable',
    icon: '✏️',
    pillar: 'inclusion',
    stats: {
      cost: 'Gratuit',
      co2: '10kg CO2/an',
      dataLocation: '🇪🇺 Europe'
    },
    alternativeId: 'figma',
    savings: { euros: 12, co2Kg: 20 }
  },

  // Pair 29: Design - Canva vs GIMP
  {
    id: 'canva',
    name: 'Canva',
    type: 'big-tech',
    category: 'Design Graphique',
    description: 'Outil australien mais données aux USA, freemium limité',
    icon: '🖌️',
    pillar: 'responsabilite',
    stats: {
      cost: '11€/mois',
      co2: '25kg CO2/an',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'gimp'
  },
  {
    id: 'gimp',
    name: 'GIMP + Inkscape',
    type: 'nird',
    category: 'Design Graphique',
    description: 'Suite graphique libre complète, fonctionne hors ligne',
    icon: '🖼️',
    pillar: 'inclusion',
    stats: {
      cost: 'Gratuit',
      co2: '5kg CO2/an',
      dataLocation: '💻 Local'
    },
    alternativeId: 'canva',
    savings: { euros: 11, co2Kg: 20 }
  },

  // Pair 30: Productivity - Notion vs Outline
  {
    id: 'notion',
    name: 'Notion',
    type: 'big-tech',
    category: 'Notes & Wiki',
    description: 'Espace de travail cloud, données aux USA',
    icon: '📝',
    pillar: 'responsabilite',
    stats: {
      cost: '8€/utilisateur/mois',
      co2: '20kg CO2/an',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'outline'
  },
  {
    id: 'outline',
    name: 'Outline',
    type: 'nird',
    category: 'Notes & Wiki',
    description: 'Wiki collaboratif open source, auto-hébergeable',
    icon: '📖',
    pillar: 'responsabilite',
    stats: {
      cost: '4€/utilisateur/mois',
      co2: '8kg CO2/an',
      dataLocation: '🇫🇷 Auto-hébergé'
    },
    alternativeId: 'notion',
    savings: { euros: 4, co2Kg: 12 }
  },

  // Pair 31: Project Management - Trello vs Wekan
  {
    id: 'trello',
    name: 'Trello',
    type: 'big-tech',
    category: 'Gestion Projet',
    description: 'Kanban Atlassian, données sur serveurs américains',
    icon: '📌',
    pillar: 'responsabilite',
    stats: {
      cost: '5€/utilisateur/mois',
      co2: '15kg CO2/an',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'wekan'
  },
  {
    id: 'wekan',
    name: 'Wekan',
    type: 'nird',
    category: 'Gestion Projet',
    description: 'Kanban open source, auto-hébergeable, RGPD friendly',
    icon: '📋',
    pillar: 'inclusion',
    stats: {
      cost: 'Gratuit',
      co2: '5kg CO2/an',
      dataLocation: '🇫🇷 Auto-hébergé'
    },
    alternativeId: 'trello',
    savings: { euros: 5, co2Kg: 10 }
  },

  // Pair 32: Hardware - iPhone vs Fairphone
  {
    id: 'iphone',
    name: 'iPhone',
    type: 'big-tech',
    category: 'Smartphone',
    description: 'Écosystème fermé, obsolescence programmée, non réparable',
    icon: '📱',
    pillar: 'durabilite',
    stats: {
      cost: '1200€',
      co2: '80kg CO2',
      dataLocation: '🇨🇳 Chine'
    },
    alternativeId: 'fairphone'
  },
  {
    id: 'fairphone',
    name: 'Fairphone',
    type: 'nird',
    category: 'Smartphone',
    description: 'Smartphone modulaire, réparable, matériaux éthiques',
    icon: '🌍',
    pillar: 'durabilite',
    stats: {
      cost: '700€',
      co2: '40kg CO2',
      dataLocation: '🇪🇺 Europe'
    },
    alternativeId: 'iphone',
    savings: { euros: 500, co2Kg: 40 }
  },

  // Pair 33: Hardware - Chromebook vs PiTop
  {
    id: 'chromebook',
    name: 'Chromebook',
    type: 'big-tech',
    category: 'Ordinateur Éducatif',
    description: 'Dépendance Google, collecte données élèves',
    icon: '💻',
    pillar: 'responsabilite',
    stats: {
      cost: '350€',
      co2: '200kg CO2',
      dataLocation: '🇺🇸 USA'
    },
    alternativeId: 'pitop'
  },
  {
    id: 'pitop',
    name: 'Pi-Top / Linux Laptop',
    type: 'nird',
    category: 'Ordinateur Éducatif',
    description: 'Ordinateur éducatif modulaire, apprend la programmation',
    icon: '🍓',
    pillar: 'durabilite',
    stats: {
      cost: '300€',
      co2: '80kg CO2',
      dataLocation: '💻 Local'
    },
    alternativeId: 'chromebook',
    savings: { euros: 50, co2Kg: 120 }
  }
];

// Utility functions
export const getCardById = (id: string): TechnologyCard | undefined => {
  return technologyCards.find(card => card.id === id);
};

export const getAlternative = (card: TechnologyCard): TechnologyCard | undefined => {
  if (card.alternativeId) {
    return getCardById(card.alternativeId);
  }
  return undefined;
};

// Get random selection of cards (balanced Big Tech / NIRD mix)
export const getRandomCards = (count: number): TechnologyCard[] => {
  const bigTechCards = technologyCards.filter(c => c.type === 'big-tech');
  const nirdCards = technologyCards.filter(c => c.type === 'nird');
  
  // Shuffle both arrays
  const shuffledBigTech = [...bigTechCards].sort(() => Math.random() - 0.5);
  const shuffledNird = [...nirdCards].sort(() => Math.random() - 0.5);
  
  // Take half from each type
  const halfCount = Math.ceil(count / 2);
  const selectedBigTech = shuffledBigTech.slice(0, halfCount);
  const selectedNird = shuffledNird.slice(0, count - halfCount);
  
  // Combine and shuffle final selection
  return [...selectedBigTech, ...selectedNird].sort(() => Math.random() - 0.5);
};

// Get cards by category
export const getCardsByCategory = (category: string): TechnologyCard[] => {
  return technologyCards.filter(card => card.category === category);
};

// Get cards by pillar
export const getCardsByPillar = (pillar: 'inclusion' | 'responsabilite' | 'durabilite'): TechnologyCard[] => {
  return technologyCards.filter(card => card.pillar === pillar);
};

// Get all unique categories
export const getAllCategories = (): string[] => {
  return [...new Set(technologyCards.map(card => card.category))];
};
