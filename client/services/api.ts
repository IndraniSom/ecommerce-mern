const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Product {
    id: number;
    name: string;
    // Add other product fields as necessary
}

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${API_URL}/product`);
    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error: ${response.status} - ${errorText}`);
        throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
    }
    const data: Product[] = await response.json();
    return data;
};
