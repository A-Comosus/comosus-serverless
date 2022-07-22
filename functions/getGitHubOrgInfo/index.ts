import { Handler } from "aws-lambda";
import { getOrg, getOrgMember, getRepos, getRepoLanguages } from "./githubAPI";

export const handler: Handler = async () => {
  const headers = {
    "content-type": "application/json",
  };

  try {
    console.log("Receiving request to get Github organisation info...");

    const orgInfo = await getOrg();
    const members = await getOrgMember();
    const repos = await getRepoLanguages(await getRepos());

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ...orgInfo,
        members,
        repos,
      }),
    };
  } catch (err) {
    console.error(JSON.stringify(err, null, 2));
  }
};
