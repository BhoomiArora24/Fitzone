import heroImg from '../assets/Hero.png'
// ============================================================
// Central content + image config. Edit here, nothing else.
// ============================================================

// >>> REPLACE EVERY URL BELOW with your own photography <<<
export const images = {
  // REPLACE: woman SPRINTING left->right (white crop top, grey shorts), dark concrete wall, warm light from the left. Subject should sit in the right 55% of the frame.
  hero: heroImg,
  // OPTIONAL: transparent PNG of dark plant leaves (shown at far-left of hero, ~15% opacity). Leave '' to hide.
  plant: '',
  // REPLACE: woman lifting a dumbbell in a modern gym
  personalTraining: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
  // REPLACE: woman seated cross-legged on a yoga mat in a bright studio
  mindBody: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80',
  // REPLACE: healthy plated meal – chicken, greens, avocado
  wellnessCoaching: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
  // REPLACE: wide shot, woman on yoga mat at sunset in the mountains, subject on the right
  lifestyleBanner: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2000&q=80',
  // REPLACE: four small square face crops
  clientAvatars: [
    'https://i.pravatar.cc/80?img=47',
    'https://i.pravatar.cc/80?img=32',
    'https://i.pravatar.cc/80?img=12',
    'https://i.pravatar.cc/80?img=5',
  ],
}

export const brand = { name: 'FitZone', tagline: 'Gym & Fitness Club' }

export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Trainers', href: '#coaches' },
  { label: 'Training Clubs', href: '#teams' },
  { label: 'Inside The Gym', href: '#gallery' },
  { label: 'Contact', href: '/contact' },
]

export const hero = {
  eyebrow: 'Forged in sweat.',
  eyebrowAccent: 'Built for results.',
  lines: ['Build', 'Power.'],
  accentLine: 'Transform your body.',
  body: 'State-of-the-art gym equipment, certified personal trainers, and science-backed workout programs engineered to sculpt your peak physique.',
  cta: { label: 'Claim Your Free Gym Pass', href: '/free-pass' },
  proof: { label: 'Trusted by 1,500+ active members', rating: '4.9/5' },
}

export const programs = {
  label: 'Signature training',
  title: 'Programs designed for real results',
  link: { label: 'View all programs', href: '/programs' },
  items: [
    { id: 'personalTraining', icon: 'dumbbell', title: 'Personal Training', alt: 'Member lifting a dumbbell in the gym', href: '/programs', tone: 'olive',
      text: '1-on-1 coaching customized for your body composition, progressive overload, and peak strength.' },
    { id: 'mindBody', icon: 'lotus', title: 'Mobility & Recovery', alt: 'Member stretching on a gym mat', href: '/programs', tone: 'terracotta',
      text: 'Targeted mobility routines, joint care, and active recovery to prevent injury and accelerate muscle repair.' },
    { id: 'wellnessCoaching', icon: 'leaf', title: 'Nutrition Protocols', alt: 'Macro-balanced meal with high protein', href: '/programs', tone: 'olive',
      text: 'Custom calorie and macronutrient strategies to fuel heavy lifts, strip fat, and maximize muscle growth.' },
  ],
}

export const banner = {
  script: "Excuses don't burn calories.",
  lines: ['Lift heavier.', 'Build power.'],
  script2: 'Consistency beats motivation every single day.',
  cta: { label: 'Join The Club', href: '/contact' },
  alt: 'Fitness athlete training at the gym',
  perks: ['Modern strength & cardio equipment', 'Proven body transformations', 'Elite certified trainers'],
}

export const footer = {
  connect: "Let's connect",
  statement: ["The strongest project you'll ever work on is", 'you.'],
  newsletterTitle: 'Get weekly workout & nutrition tips',
  social: [
    { name: 'Instagram', href: '#' },
    { name: 'Facebook', href: '#' },
    { name: 'TikTok', href: '#' },
  ],
}
