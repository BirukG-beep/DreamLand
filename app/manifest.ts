import type {MetadataRoute} from "next";
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "DreamLand Hotel",
        short_name: "DreamLand",
        description: "Experience the perfect blend of comfort and nature at DreamLand Hotel, your ideal getaway in Bishoftu. Nestled amidst stunning landscapes, our hotel offers a tranquil retreat with modern amenities. Enjoy breathtaking views, cozy accommodations, and easy access to nearby attractions. Whether you're seeking relaxation or adventure, DreamLand Hotel is your gateway to an unforgettable stay in Bishoftu.",
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#c8a96e",
        icons: [
            {
                src: "/icon-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icon-512x512.png",
                sizes: "512x512",
                type: "image/png",
            }
        ],
    }
}