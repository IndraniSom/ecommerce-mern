import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const formData = await req.formData();
        const { id } = params;
        const blogs = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${id}`, {
            method: 'PUT',
            body: formData
        });

        const data = await blogs.json();
        if (!blogs.ok)
            throw new Error(data.message)
        const message = data.message;
        return NextResponse.json(message, { status: 200 });
    } catch (error: any) {
        console.error("Error creating blogs:", error);
        return NextResponse.json(
            { message: error.message || "Error creating blogs" },
            { status: 500 }
        );
    }
}