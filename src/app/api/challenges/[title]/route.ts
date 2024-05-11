import { NextResponse } from "next/server";
import Data from "../../challenges.json";
import stringToSlug from "../../../../utils/slug";

export async function GET(request: Request, context: any) {
  const { params } = context;
  const { title } = params;

  const challenge = Data.challenges.find(
    (challenge) => stringToSlug(challenge.title) === title
  );

  if (challenge) {
    return new NextResponse(JSON.stringify(challenge));
  }

  const challengeById = Data.challenges.find(
    (challenge) => challenge.id == title
  );

  if (challengeById) {
    return new NextResponse(JSON.stringify(challengeById));
  }
  return new NextResponse("Challenge not found", { status: 404 });
}
