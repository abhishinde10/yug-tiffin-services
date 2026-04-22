import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',

      includeAssets: [
        'favicon.ico',
        'icon-192.png',
        'icon-512.png'
      ],

      manifest: {
        name: 'Yug Tiffin Services',
        short_name: 'YugTiffin',
        description: 'Tiffin Service App',
        theme_color: '#ff6b00',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        categories: ['food', 'business'],

        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },

      workbox: {
        //Precache build files (CSS, JS, images)
        globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg}'],

        runtimeCaching: [
          // API caching (your backend)
          {
            urlPattern: /^https:\/\/yug-backend-3v83\.onrender\.com\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 300 // 5 min
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },

          // Images caching
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },

          //Static files (CSS/JS)
          {
            urlPattern: /\.(?:js|css)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-cache'
            }
          }
        ]
      },

      devOptions: {
        enabled: true
      }
    })
  ]
})