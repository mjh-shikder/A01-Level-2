# কীভাবে `Pick` এবং `Omit` Utility Types কোড ডুপ্লিকেশন কমায় এবং DRY Principle বজায় রাখে

## পরিচিতি

বড় TypeScript প্রজেক্টে একই ধরনের interface বারবার লিখতে গেলে কোড দ্রুত বিশৃঙ্খল হয়ে যায়। বিশেষ করে যখন একটি “master interface” থেকে বিভিন্ন ছোট version বা “slice” তৈরি করতে হয়, তখন duplicate code তৈরি হওয়া খুব সাধারণ ব্যাপার।

এই সমস্যার সমাধানে TypeScript আমাদের দেয় powerful utility types  `Pick` এবং `Omit`।

এগুলো ব্যবহার করে আমরা existing interface থেকে নির্দিষ্ট property নিয়ে নতুন type তৈরি করতে পারি, আবার অপ্রয়োজনীয় property বাদও দিতে পারি। ফলে কোড হয় আরও clean, maintainable এবং DRY (Don't Repeat Yourself)।

---

# DRY Principle কী?

DRY এর পূর্ণরূপ হলো:

> **Don't Repeat Yourself**

অর্থাৎ একই logic বা structure বারবার না লিখে reusable way তে তৈরি করা।

যখন আমরা একই interface copy paste করি, তখন future এ change maintain করা কঠিন হয়ে যায়।  
এক জায়গায় update করলে অন্য জায়গায় ভুলে যেতে পারি।

এই সমস্যা সমাধানে `Pick` এবং `Omit` অনেক সাহায্য করে।

---

# Master Interface উদাহরণ

ধরুন আমাদের একটি `User` interface আছে।

```ts
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}
```

এখন এই interface থেকে বিভিন্ন পরিস্থিতিতে different version দরকার হতে পারে।

যেমন:

- Public user profile
- Login response
- Admin panel data
- User update form

এখানে `Pick` এবং `Omit` খুব useful।

---

# `Pick` Utility Type

`Pick` ব্যবহার করা হয় কোনো interface থেকে নির্দিষ্ট property নির্বাচন করার জন্য।

## Syntax

```ts
Pick<Type, Keys>
```

---

## Example: Public User Profile

ধরুন frontend এ আমরা শুধু `id`, `name`, এবং `email` পাঠাতে চাই।

```ts
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}
```

এখন `Pick` ব্যবহার করি:

```ts
type PublicUser = Pick<User, "id" | "name" | "email">;
```

এখন `PublicUser` হবে:

```ts
{
  id: number;
  name: string;
  email: string;
}
```

---

## কেন এটি ভালো?

যদি আমরা manually লিখতাম:

```ts
interface PublicUser {
  id: number;
  name: string;
  email: string;
}
```

তাহলে duplicate code তৈরি হতো।

আর future এ যদি `User` interface এ কোনো type change হয়, তখন multiple জায়গায় update করতে হবে।

কিন্তু `Pick` ব্যবহার করলে source একটাই থাকে।

---

# `Omit` Utility Type

`Omit` হলো `Pick` এর বিপরীত।

এটি নির্দিষ্ট property বাদ দিয়ে নতুন type তৈরি করে।

## Syntax

```ts
Omit<Type, Keys>
```

---

## Example: Client Safe User Data

ধরুন আমরা `password` frontend এ পাঠাতে চাই না।

```ts
type SafeUser = Omit<User, "password">;
```

এখন `SafeUser` এ সব property থাকবে, শুধু `password` বাদ যাবে।

```ts
{
  id: number;
  name: string;
  email: string;
  role: string;
}
```

---

# Real World Use Case

ধরুন একটি registration form এ user তৈরি হবে।

Backend database model:

```ts
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}
```

কিন্তু registration form এ `id` এবং `createdAt` লাগবে না।

তখন:

```ts
type CreateUserPayload = Omit<User, "id" | "createdAt">;
```

ফলে duplicate interface লেখার দরকার নেই।

---

# `Pick` এবং `Omit` কীভাবে DRY বজায় রাখে

## ১. Duplicate Interface কমায়

একই structure বারবার লিখতে হয় না।

---

## ২. Centralized Type Management

সব changes master interface থেকেই control করা যায়।

```ts
interface User {
  name: string;
}
```

যদি পরে:

```ts
name: string | null
```

করা হয়, তাহলে সব derived type automatically update হবে।

---

## ৩. Maintainability বাড়ায়

Codebase বড় হলেও type management সহজ থাকে।

---

## ৪. Bug কমায়

Manual duplicate type লিখলে mismatch হওয়ার chance থাকে।

Utility types সেই risk কমায়।

---

# `Pick` বনাম `Omit`

| Utility Type | কাজ |
|---|---|
| `Pick` | নির্দিষ্ট property নেওয়া |
| `Omit` | নির্দিষ্ট property বাদ দেওয়া |

---

# Combined Example

```ts
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  createdAt: Date;
}
```

## শুধু কিছু field দরকার

```ts
type ProductCard = Pick<Product, "title" | "price">;
```

## কিছু field বাদ দিতে চাই

```ts
type ProductFormData = Omit<Product, "id" | "createdAt">;
```

---

# Conclusion

TypeScript এর `Pick` এবং `Omit` utility types শুধু syntax shortcut নয় — এগুলো clean architecture তৈরির powerful tool।

এগুলো ব্যবহার করলে:

- Code duplication কমে
- Maintainability বাড়ে
- Types centralized থাকে
- DRY principle বজায় থাকে
- Large project manage করা সহজ হয়

যেকোনো modern TypeScript project এ reusable এবং scalable code লিখতে চাইলে `Pick` এবং `Omit` অবশ্যই ব্যবহার করা উচিত।

```ts
type CleanCode = Pick<Success, "scalability" | "maintainability">;
```