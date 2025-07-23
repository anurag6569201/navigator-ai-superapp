import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))',
					dark: 'hsl(var(--primary-dark))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				glass: {
					DEFAULT: 'hsl(var(--glass))',
					border: 'hsl(var(--glass-border))'
				},
				shard: {
					grey: 'hsl(var(--shard-grey))',
					glow: 'hsl(var(--shard-glow))'
				},
				particle: {
					blue: 'hsl(var(--particle-blue))',
					trail: 'hsl(var(--particle-trail))'
				},
				flow: {
					path: 'hsl(var(--flow-path))'
				},
				chaos: {
					ambient: 'hsl(var(--chaos-ambient))'
				}
			},
			backgroundImage: {
				'gradient-crystal': 'var(--gradient-crystal)',
				'gradient-space': 'var(--gradient-space)',
				'gradient-shard': 'var(--gradient-shard)'
			},
			boxShadow: {
				'crystal': 'var(--shadow-crystal)',
				'shard': 'var(--shadow-shard)',
				'glow-intense': 'var(--glow-intense)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'crystal-pulse': {
					'0%, 100%': { 
						transform: 'scale(1)',
						filter: 'drop-shadow(0 0 20px hsl(var(--primary) / 0.3))'
					},
					'50%': { 
						transform: 'scale(1.05)',
						filter: 'drop-shadow(0 0 40px hsl(var(--primary) / 0.6))'
					}
				},
				'shard-float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'50%': { transform: 'translateY(-10px) rotate(2deg)' }
				},
				'particle-flow': {
					'0%': { transform: 'translateX(-100vw)', opacity: '0' },
					'10%': { opacity: '1' },
					'90%': { opacity: '1' },
					'100%': { transform: 'translateX(100vw)', opacity: '0' }
				},
				'glow-intensity': {
					'0%, 100%': { filter: 'drop-shadow(0 0 10px hsl(var(--primary) / 0.3))' },
					'50%': { filter: 'drop-shadow(0 0 30px hsl(var(--primary) / 0.8))' }
				},
				'fade-in-up': {
					'0%': { 
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'calm-glow': {
					'0%, 100%': { 
						textShadow: '0 0 20px hsl(var(--calm-thread) / 0.3)',
						filter: 'drop-shadow(0 0 10px hsl(var(--calm-thread) / 0.4))'
					},
					'50%': { 
						textShadow: '0 0 40px hsl(var(--calm-thread) / 0.6)',
						filter: 'drop-shadow(0 0 20px hsl(var(--calm-thread) / 0.7))'
					}
				},
				'chaos-float': {
					'0%, 100%': { transform: 'translate(0px, 0px) rotate(0deg)' },
					'33%': { transform: 'translate(5px, -3px) rotate(1deg)' },
					'66%': { transform: 'translate(-3px, 5px) rotate(-1deg)' }
				},
				'draw-line': {
					from: { strokeDashoffset: '1000' },
					to: { strokeDashoffset: '0' }
				},
				'fade-up': {
					from: { 
						opacity: '0', 
						transform: 'translateY(30px)' 
					},
					to: { 
						opacity: '1', 
						transform: 'translateY(0)' 
					}
				}

			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'crystal-pulse': 'crystal-pulse 3s ease-in-out infinite',
				'shard-float': 'shard-float 4s ease-in-out infinite',
				'particle-flow': 'particle-flow 8s linear infinite',
				'glow-intensity': 'glow-intensity 2s ease-in-out infinite',
				'fade-in-up': 'fade-in-up 0.8s ease-out',
				'chaos-float': 'chaos-float 3s ease-in-out infinite',
				'calm-glow': 'calm-glow 2s ease-in-out infinite',
				'draw-line': 'draw-line 2s ease-in-out forwards',
				'fade-up': 'fade-up 0.6s ease-out forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
