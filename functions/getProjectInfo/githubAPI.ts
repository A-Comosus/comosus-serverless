import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    authorization: `token ${process.env.GITHUB_PAT}`,
  },
});

export async function getOrg() {
  const {
    data: {
      avatar_url,
      login,
      url,
      description,
      html_url,
      created_at,
      updated_at,
    },
  } = await axiosClient.get(`/orgs/a-comosus`);

  return {
    avatar_url,
    login,
    url,
    description,
    html_url,
    created_at,
    updated_at,
  };
}

export async function getTeams() {
  const { data } = await axiosClient.get("/orgs/a-comosus/teams");

  return data.map(({ name, slug, description }) => ({
    name,
    slug,
    description,
  }));
}

export async function getTeamMembers() {
  const teams = await getTeams();
  return await Promise.all(
    teams.map(async (team) => {
      const { data: _members } = await axiosClient.get(
        `/orgs/a-comosus/teams/${team.slug}/members`
      );

      const members = await Promise.all(
        _members.map(async ({ login: _login }) => {
          const member = await axiosClient.get(`/users/${_login}`);

          const {
            login,
            name,
            avatar_url,
            html_url,
            blog,
            location,
            email,
            bio,
            twitter_username,
            created_at,
            updated_at,
          } = member.data;

          return {
            login,
            name,
            avatar_url,
            html_url,
            blog,
            location,
            email,
            bio,
            twitter_username,
            created_at,
            updated_at,
          };
        })
      );

      return { ...team, members };
    })
  );
}

export async function getRepos() {
  const { data } = await axiosClient.get("/orgs/a-comosus/repos");

  return data.map(
    ({ name, html_url, description, created_at, updated_at, pushed_at }) => ({
      name,
      html_url,
      description,
      created_at,
      updated_at,
      pushed_at,
    })
  );
}

export async function getRepoLanguages(repos: GitHubOrgRepo[]) {
  const languageColor = {
    TypeScript: "#3396F1",
    JavaScript: "#9DDE66",
    SCSS: "#E082B2",
    Shell: "#FDF07F",
    Solidity: "#AA6746",
  };

  const languageResponses = await Promise.all(
    repos.map(({ name }) => {
      return axiosClient.get(`/repos/a-comosus/${name}/languages`);
    })
  );

  const languages = languageResponses.map(({ data }) => {
    const arr: any[] = [];
    const max: number = Object.keys(data)
      .map((key) => data[key])
      .reduce((prev, curr) => prev + curr);

    for (const [key, value] of Object.entries(data)) {
      arr.push({
        language: key,
        weight: (value as number) / max,
        defaultColor: languageColor[key],
      });
    }
    return arr;
  });

  return repos.map((repo, index) => ({
    ...repo,
    languages: languages[index],
  }));
}
