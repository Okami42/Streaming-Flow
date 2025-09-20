// Configuration GitHub
export const GITHUB_CONFIG = {
  token: process.env.GITHUB_TOKEN || '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',
  owner: process.env.GITHUB_OWNER || 'Okami42',
  repo: process.env.GITHUB_REPO || 'Streaming-Flow', 
  branch: process.env.GITHUB_BRANCH || 'main'
};

// Interface pour les fichiers GitHub
export interface GitHubFile {
  path: string;
  content: string;
  sha?: string;
}

// Fonction pour encoder en base64
export function encodeBase64(content: string): string {
  return Buffer.from(content, 'utf-8').toString('base64');
}

// Fonction pour décoder depuis base64
export function decodeBase64(content: string): string {
  return Buffer.from(content, 'base64').toString('utf-8');
}
