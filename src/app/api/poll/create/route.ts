import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PollInputValidator } from "@/lib/validators/poll-input-validator";
import { Option } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

type pollOption = Omit<Option, "id" | "createdAt" | "updatedAt">;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, options } = PollInputValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const poll = await db.poll.create({
      data: {
        title,
        votes: 0,
        creator: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    const pollOptions: pollOption[] = options.map((text) => {
      return {
        pollId: poll?.id,
        text: text,
        vote: 0,
      };
    });

    pollOptions.map(async (pollOption) => {
      await db.option.create({
        data: pollOption,
      });
    });

    console.log(poll, pollOptions);

    return new NextResponse("OK", {
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
