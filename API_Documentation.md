# Digital Atelier - REST API Documentation (Postman Guide)

This document provides the complete API structure for the Digital Atelier project. You can use these details to test your APIs in Postman and submit this as your API Documentation.

> **Base URL:** `http://localhost:5000`
> **Authorization:** Most routes require a Bearer Token. First, hit the Login API, copy the `token` from the response, and paste it in Postman under **Authorization > Bearer Token** for the protected routes.

---

## 1. Authentication APIs (`/api/auth`)

### 1.1 Register User
- **Method:** `POST`
- **Endpoint:** `/api/auth/register`
- **Access:** Public
- **Body (raw JSON):**
```json
{
  "firstName": "Het",
  "lastName": "Rathod",
  "email": "het@example.com",
  "password": "password123"
}
```

### 1.2 Login User
- **Method:** `POST`
- **Endpoint:** `/api/auth/login`
- **Access:** Public
- **Body (raw JSON):**
```json
{
  "email": "het@example.com",
  "password": "password123"
}
```
*(Copy the generated token from the response to use in the APIs below)*

### 1.3 Get Current User (Profile)
- **Method:** `GET`
- **Endpoint:** `/api/auth/me`
- **Access:** Private (Needs Bearer Token)
- **Body:** None

---

## 2. Project & Settings APIs (`/api/projects`)

### 2.1 Get All Projects
- **Method:** `GET`
- **Endpoint:** `/api/projects`
- **Access:** Private

### 2.2 Create New Project
- **Method:** `POST`
- **Endpoint:** `/api/projects`
- **Access:** Private
- **Body (raw JSON):**
```json
{
  "name": "My E-Commerce Site",
  "description": "A bespoke digital boutique.",
  "elements": []
}
```

### 2.3 Update Project Settings
- **Method:** `PUT`
- **Endpoint:** `/api/projects/PROJECT_ID_HERE`
- **Access:** Private
- **Body (raw JSON):**
```json
{
  "name": "My E-Commerce Site Updated",
  "domain": "https://myboutique.com",
  "seoTitle": "Premium Fashion Boutique",
  "seoDescription": "Buy the best clothes online."
}
```

### 2.4 Delete Project
- **Method:** `DELETE`
- **Endpoint:** `/api/projects/PROJECT_ID_HERE`
- **Access:** Private

---

## 3. Store Management / Products APIs (`/api/products`)

### 3.1 Get All Products
- **Method:** `GET`
- **Endpoint:** `/api/products`
- **Access:** Private

### 3.2 Add New Product
- **Method:** `POST`
- **Endpoint:** `/api/products`
- **Access:** Private
- **Body (raw JSON):**
```json
{
  "name": "Silk Evening Gown",
  "price": 299.99,
  "stock": 15,
  "category": "Dresses",
  "image": "https://example.com/image.jpg"
}
```

---

## 4. Pages Management APIs (`/api/pages`)

### 4.1 Get All Pages
- **Method:** `GET`
- **Endpoint:** `/api/pages`
- **Access:** Private

### 4.2 Create New Page
- **Method:** `POST`
- **Endpoint:** `/api/pages`
- **Access:** Private
- **Body (raw JSON):**
```json
{
  "name": "Contact Us",
  "slug": "contact",
  "projectId": "PROJECT_ID_HERE",
  "status": "PUBLISHED"
}
```

---

## 5. Assets Library APIs (`/api/assets`)

### 5.1 Get All Assets
- **Method:** `GET`
- **Endpoint:** `/api/assets`
- **Access:** Private

### 5.2 Upload/Create Asset
- **Method:** `POST`
- **Endpoint:** `/api/assets`
- **Access:** Private
- **Body (raw JSON):**
```json
{
  "name": "Hero Background Image",
  "type": "IMAGE",
  "src": "https://example.com/hero.jpg",
  "size": "2.4 MB",
  "dimensions": "1920x1080 px",
  "altText": "A beautiful hero background"
}
```

---

## 6. Performance Analytics API (`/api/analytics`)

### 6.1 Get Analytics Data
- **Method:** `GET`
- **Endpoint:** `/api/analytics`
- **Access:** Private
- **Body:** None (Returns chart data and KPIs like Total Visitors, Bounce Rate)

---

## 7. Templates Engine API (`/api/templates`)

### 7.1 Get All System Templates
- **Method:** `GET`
- **Endpoint:** `/api/templates`
- **Access:** Private
- **Body:** None (Returns the list of pre-built templates like 'Minimalist Muse', 'Digital Noir')
