import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PollInputValidator } from "@/lib/validators/poll-input-validator";
import { VoteInputValidator } from "@/lib/validators/vote-input-validator";
import { Option } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { optionId, pollId } = VoteInputValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const vote = await db.vote.create({
      data: {
        optionId: optionId,
        voterId: session.user.id,
        pollId: pollId,
        voted: true,
      },
    });

    await db.poll.update({
      where: {
        id: pollId,
      },
      data: {
        votes: { increment: 1 },
      },
    });

    await db.option.update({
      where: {
        id: optionId,
      },
      data: {
        vote: { increment: 1 },
      },
    });

    return new NextResponse(JSON.stringify(vote), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not post to subreddit at this time. Please try later",
      { status: 500 }
    );
  }
}
