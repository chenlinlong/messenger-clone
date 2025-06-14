import { authOptions } from "@/app/libs/authOptions";
import { pusher } from "@/app/libs/pusher";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    const rawBody = await request.text();
    const body = new URLSearchParams(rawBody);
    const socketId = body.get("socket_id");
    const channel = body.get("channel_name");

    if (!socketId || !channel) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = {
        user_id: session.user.email,
    };

    const authResponse = pusher.authorizeChannel(socketId, channel, data);

    return new NextResponse(JSON.stringify(authResponse), {
        status: 200,
    });
}
