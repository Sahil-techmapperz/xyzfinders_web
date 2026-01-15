import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-teal': '#005251',
                'brand-orange': '#FE8B53',
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                'jost': ['Jost', 'sans-serif'],
            },
        },
    },
    plugins: [],
} satisfies Config;
