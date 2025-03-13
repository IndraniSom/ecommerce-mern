import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const page = searchParams.get('page') || '1'; // Default to page 1 if not provided
        const limit = searchParams.get('limit') || '10'; // Default to 5 blogs per page if not provided
        const blogs = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs?page=${page}&limit=${limit}`);

        const data = await blogs.json();
        if(!blogs.ok)        
            throw new Error(data.message)        
        const blogData = {
            blogs: data.blogs,
            totalBlogs: data.totalBlogs
        }               
        return NextResponse.json(blogData, { status: 200 });
    } catch (error:any) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json(
            { message:error.message || "Error fetching blogs" },
            { status: 500 }
        );
    }
}