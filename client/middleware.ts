import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const fetchUserProfile = async (token: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-Auth-Token': `${token}`,
            },
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            console.error('Failed to fetch user profile');
        }
    } catch (error) {
        console.error('Error fetching user profile', error);
    }
};

export async function middleware(request: NextRequest) {    
    const token = request.cookies.get('token');
    const user = token ? await fetchUserProfile(token.value) : null;
    
    if (user && user.role === 'vendor') {    
        return NextResponse.next();
    }
        
    return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
    matcher: ['/blogs/dashboard'], // Apply middleware to /blogs/dashboard route
};
