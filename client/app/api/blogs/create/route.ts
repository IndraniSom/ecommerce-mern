import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        const blogs = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/create`, {
            method: 'POST',
            headers:{
                'x-Auth-Token': `${req.cookies.get('token')?.value}`
            },
            body: formData,
            credentials: 'include',
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