import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { error } from "console";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string }}
) {
    try {
        const { userId } = auth();
        const { courseId } = params;
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 });
        }

        const course = await db.course.update({
            where: {
                id: params.courseId,
                userId
            },
            data: {
                ...values,
            }
        })

        return NextResponse.json(course);

    } catch {
        console.log("[COURSE_ID", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}