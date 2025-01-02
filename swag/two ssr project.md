# Integrating Two SSR Projects Without Modifying Business Logic

This document outlines how to integrate two SSR (Server-Side Rendering) projects without modifying their internal logic. We will explore several methods to merge these projects seamlessly.

## Methods of Integration

### 1. Proxy Integration
Proxy integration involves routing requests to different SSR services using a reverse proxy (like **Nginx** or **http-proxy-middleware** in Node.js). This ensures that each SSR project operates independently while being accessible through a unified endpoint.

#### Steps:
- Set up a reverse proxy service (e.g., **Nginx** or **http-proxy-middleware**).
- Route requests to different paths (e.g., `/projectA` and `/projectB`) to their respective SSR services.
- This way, both projects share the same domain and URL structure, but the internal logic remains untouched.

#### Example (Nginx):
```nginx
server {
    listen 80;
    
    location /projectA/ {
        proxy_pass http://localhost:3001/;  # Proxy requests to Project A
    }

    location /projectB/ {
        proxy_pass http://localhost:3002/;  # Proxy requests to Project B
    }
}
