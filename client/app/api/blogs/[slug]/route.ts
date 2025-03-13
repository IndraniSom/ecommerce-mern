import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const slug = req.nextUrl.pathname.split('/').pop();
        
        const blogs = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${slug}`,{
            headers:{
                'x-Auth-Token': `${req.cookies.get('token')?.value}`
            },
            credentials: "include"
        });

        const data = await blogs.json();
        if(!blogs.ok)        
            throw new Error(data.message)        
        return NextResponse.json({blog: data.blog}, { status: 200 });
    } catch (error:any) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json(
            { message:error.message || "Error fetching blogs" },
            { status: 500 }
        );
    }
}

export const DELETE = async (req: NextRequest, { params }: { params: { slug: string } }) => {
    try {
        const { slug } = params;
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${slug}`, {
            method: "DELETE",
            headers:{
                'x-Auth-Token': `${req.cookies.get('token')?.value}`
            },
        });

        if (!response.ok) {
            throw new Error(`Error deleting blog: ${response.statusText}`);
        }

        return NextResponse.json({ message: "Blog deleted successfully" });
    } catch (error: any) {
        console.error("Error Deleting Blog:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
