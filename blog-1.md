# কেন `any` হলো Type Safety Hole এবং `unknown` কেন বেশি নিরাপদ?

## Introduction

TypeScript-এর সবচেয়ে শক্তিশালী বৈশিষ্ট্যগুলোর একটি হলো এর **Type Safety**। এটি ডেভেলপারকে কোড লেখার সময় ভুল ধরতে সাহায্য করে এবং বড় প্রজেক্টে বাগ কমায়। কিন্তু TypeScript-এ এমন একটি টাইপ আছে যা এই নিরাপত্তা ব্যবস্থাকে পুরোপুরি ভেঙে দিতে পারে সেটি হলো `any`।

অন্যদিকে, `unknown` টাইপ একই ধরনের ফ্লেক্সিবিলিটি দিলেও অনেক বেশি নিরাপদ। এই ব্লগে আমরা জানবো:

- কেন `any` কে “Type Safety Hole” বলা হয়
- কেন `unknown` নিরাপদ বিকল্প
- Type Narrowing কী এবং কেন এটি গুরুত্বপূর্ণ

---

# `any` কেন “Type Safety Hole”?

`any` ব্যবহার করলে TypeScript মূলত টাইপ চেক করা বন্ধ করে দেয়। অর্থাৎ, আপনি যেকোনো অপারেশন করতে পারবেন এবং TypeScript কোনো error দেখাবে না যদিও কোডটি runtime এ crash করে।

## উদাহরণ: `any` ব্যবহার

```ts
let value: any = "Hello TypeScript";

console.log(value.toUpperCase()); // কাজ করবে

value = 100;

console.log(value.toUpperCase()); 
// Runtime Error: value.toUpperCase is not a function
```

এখানে সমস্যা হলো:

- `value` প্রথমে string ছিল
- পরে number হয়ে গেছে
- কিন্তু TypeScript কোনো warning দেয়নি

কারণ `any` টাইপ compiler-কে বলে:

> “আমাকে trust করো, আমি জানি আমি কী করছি।”

ফলে TypeScript আর type safety enforce করতে পারে না।

---

# কেন `any` বিপজ্জনক?

`any` ব্যবহারের ফলে:

- Auto-completion দুর্বল হয়ে যায়
- Type checking বন্ধ হয়ে যায়
- Runtime error বাড়ে
- Refactoring কঠিন হয়ে যায়
- Large-scale application maintain করা কঠিন হয়

## আরেকটি উদাহরণ

```ts
function processData(data: any) {
  return data.map((item: string) => item.toUpperCase());
}

processData(123);
```

এখানে `123` এর উপর `.map()` চালানো হচ্ছে, যা invalid। কিন্তু TypeScript compile time এ কিছুই ধরতে পারেনি।

---

# `unknown` কেন নিরাপদ?

`unknown` হলো `any` এর safer alternative।

এটি যেকোনো ধরনের value accept করতে পারে, কিন্তু সরাসরি ব্যবহার করতে দেয় না যতক্ষণ না আপনি type check করেন।

## উদাহরণ: `unknown`

```ts
let value: unknown = "Hello";

console.log(value.toUpperCase());
```

উপরের কোডে TypeScript error দেখাবে:

```txt
Object is of type 'unknown'
```

কারণ TypeScript নিশ্চিত না যে `value` আসলে string কিনা।

এখন আমাদের type check করতে হবে।

---

# Type Narrowing কী?

Type Narrowing হলো এমন একটি প্রক্রিয়া যেখানে TypeScript runtime check ব্যবহার করে একটি broad type থেকে নির্দিষ্ট type নির্ধারণ করে।

সহজভাবে বললে:

> TypeScript কে বুঝিয়ে দেওয়া যে একটি variable আসলে কোন type-এর।

---

# Type Narrowing উদাহরণ

```ts
let value: unknown = "Hello TypeScript";

if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

এখানে:

- `typeof value === "string"` check করার পর
- TypeScript বুঝতে পারে `value` এখন string
- তাই `.toUpperCase()` safely ব্যবহার করা যায়

এটাই হলো **Type Narrowing**।

---

# Type Narrowing করার বিভিন্ন উপায়

## 1. `typeof` ব্যবহার

```ts
function print(value: unknown) {
  if (typeof value === "number") {
    console.log(value.toFixed(2));
  }
}
```

---

## 2. `instanceof` ব্যবহার

```ts
function logDate(value: unknown) {
  if (value instanceof Date) {
    console.log(value.getFullYear());
  }
}
```

---

## 3. Truthy/Falsy Check

```ts
function printMessage(message: unknown) {
  if (message) {
    console.log(message);
  }
}
```

---

## 4. Custom Type Guard

```ts
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function print(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase());
  }
}
```

এটি complex application-এ খুবই useful।

---

# কখন `unknown` ব্যবহার করবেন?

যখন data এর type আগে থেকে জানা থাকে না, তখন `unknown` ব্যবহার করা উচিত।

উদাহরণ:

- API response
- User input
- Third-party library data
- Dynamic JSON parsing

## উদাহরণ

```ts
async function fetchData(): Promise<unknown> {
  const response = await fetch("https://api.example.com/data");
  return response.json();
}
```

এরপর data ব্যবহার করার আগে type validate করতে হবে।

---

# `any` vs `unknown`

| Feature | `any` | `unknown` |
|---|---|---|
| Type Safety | ❌ নেই | ✅ আছে |
| Compile-time checking | ❌ বন্ধ | ✅ চালু |
| Runtime Error Risk | ⚠️ বেশি | ✅ কম |
| Direct property access | ✅ Allowed | ❌ Not allowed |
| Safe for large apps | ❌ না | ✅ হ্যাঁ |

---

# Best Practices

## `any` এড়িয়ে চলুন

যতটা সম্ভব `any` avoid করুন। এটি TypeScript-এর মূল সুবিধাকেই নষ্ট করে দেয়।

---

## `unknown` ব্যবহার করুন

যখন data uncertain হবে, `unknown` ব্যবহার করুন এবং পরে narrowing করুন।

---

## Strict Mode চালু রাখুন

`tsconfig.json` এ strict mode enable করুন:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

এটি type safety আরও শক্তিশালী করে।

---

# Conclusion

`any` TypeScript এর type system কে bypass করে দেয়, এজন্য একে “Type Safety Hole” বলা হয়। এটি দ্রুত কাজ করতে সাহায্য করলেও দীর্ঘমেয়াদে বড় সমস্যা তৈরি করতে পারে।

অন্যদিকে `unknown` একই flexibility দেয়, কিন্তু unsafe operation prevent করে। Type Narrowing ব্যবহার করে আপনি safely data handle করতে পারেন এবং runtime error কমাতে পারেন।

সংক্ষেপে:

- `any` = Unsafe freedom
- `unknown` = Safe flexibility

ভালো TypeScript developer হতে চাইলে `unknown` এবং Type Narrowing আয়ত্ত করা অত্যন্ত গুরুত্বপূর্ণ।

---
```