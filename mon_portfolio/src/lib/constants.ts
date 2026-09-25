import { ProjectType } from '@/types';

export const PROJECT_TYPES: { value: ProjectType; label: string; icon: string }[] = [
  { value: 'academique', label: 'Académique', icon: 'graduation-cap' },
  { value: 'personnel', label: 'Personnel', icon: 'heart' },
  { value: 'professionnel', label: 'Professionnel', icon: 'briefcase' },
  { value: 'hackathon', label: 'Hackathon', icon: 'zap' },
];

export const SKILL_LEVELS = [
  { value: 1, label: 'Débutant', color: 'gray' },
  { value: 2, label: 'Novice', color: 'blue' },
  { value: 3, label: 'Intermédiaire', color: 'yellow' },
  { value: 4, label: 'Avancé', color: 'orange' },
  { value: 5, label: 'Expert', color: 'red' },
];

export const SOCIAL_LINKS = [
  { key: 'github', label: 'GitHub', icon: 'github', color: 'hover:text-gray-400' },
  { key: 'linkedin', label: 'LinkedIn', icon: 'linkedin', color: 'hover:text-blue-400' },
  { key: 'twitter', label: 'Twitter/X', icon: 'twitter', color: 'hover:text-sky-400' },
  { key: 'email', label: 'Email', icon: 'mail', color: 'hover:text-red-400' },
] as const;

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;