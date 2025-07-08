export type ThemeColor = 'pink' | 'blue' | 'purple' | 'green' | 'amber';

export interface ThemeOption {
  id: ThemeColor;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  bgGradientFrom: string;
  bgGradientTo: string;
  buttonGradientFrom: string;
  buttonGradientTo: string;
}

export const themes: Record<ThemeColor, ThemeOption> = {
  pink: {
    id: 'pink',
    name: 'Rose',
    primaryColor: '#EC4899',
    secondaryColor: '#3B82F6',
    bgGradientFrom: '#EC4899',
    bgGradientTo: '#3B82F6',
    buttonGradientFrom: '#EC4899',
    buttonGradientTo: '#BE185D',
  },
  blue: {
    id: 'blue',
    name: 'Bleu',
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    bgGradientFrom: '#3B82F6',
    bgGradientTo: '#8B5CF6',
    buttonGradientFrom: '#3B82F6',
    buttonGradientTo: '#1D4ED8',
  },
  purple: {
    id: 'purple',
    name: 'Violet',
    primaryColor: '#8B5CF6',
    secondaryColor: '#EC4899',
    bgGradientFrom: '#8B5CF6',
    bgGradientTo: '#EC4899',
    buttonGradientFrom: '#8B5CF6',
    buttonGradientTo: '#6D28D9',
  },
  green: {
    id: 'green',
    name: 'Vert',
    primaryColor: '#10B981',
    secondaryColor: '#3B82F6',
    bgGradientFrom: '#10B981',
    bgGradientTo: '#3B82F6',
    buttonGradientFrom: '#10B981',
    buttonGradientTo: '#059669',
  },
  amber: {
    id: 'amber',
    name: 'Ambre',
    primaryColor: '#F59E0B',
    secondaryColor: '#EC4899',
    bgGradientFrom: '#F59E0B',
    bgGradientTo: '#EC4899',
    buttonGradientFrom: '#F59E0B',
    buttonGradientTo: '#D97706',
  },
};

export const defaultTheme: ThemeColor = 'pink';
