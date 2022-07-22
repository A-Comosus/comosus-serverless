type GitHubOrgInfo = {
  members: GitHubOrgMember[];
  repos: GitHubOrgRepo[];
} & GitHubOrg;

type GitHubOrg = {
  avatar_url: string;
  login: string;
  url: string;
  description: string;
  html_url: string;
  created_at: string;
  updated_at: string;
};

type GitHubOrgMember = {
  avatar_url: string;
  login: string;
  html_url: string;
};

type GitHubOrgRepo = {
  name: string;
  html_url: string;
  description: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  languages: object;
};
