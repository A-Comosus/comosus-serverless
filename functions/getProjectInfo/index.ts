import { Handler } from "aws-lambda";
import {
  getOrg,
  getTeamMembers,
  getOrgMember,
  getMembers,
  getRepos,
  getRepoLanguages,
} from "./githubAPI";

export const handler: Handler = async () => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "content-type": "application/json",
  };

  try {
    console.log("Receiving request to get project info from Github...");

    console.log("Fetching organisation info...");
    const org = await getOrg();
    console.log("Fetching team member info...");
    const teams = await getTeamMembers();
    console.log("Fetching repo info...");
    const repos = await getRepoLanguages(await getRepos());

    console.log("Github data processed and returning pproject info...");
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        org,
        teams,
        repos,
      }),
    };
  } catch (err) {
    const message = `Exception found when collating github info... [${err.message}]`;
    console.error(message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message }),
    };
  }
};
