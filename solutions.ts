// Problem 1
const filterEvenNumbers = (numbers: number[]): number[] => {
  return numbers.filter((num) => num % 2 === 0);
};

filterEvenNumbers([1, 2, 3, 4, 5, 6]);

// Problem 2
const reverseString = (text: string): string => {
  return text.split("").reverse().join("");
};

reverseString("typescript");


// Problem 3
type StringOrNumber = string | number;

const checkType = (value: StringOrNumber): string => {
  if (typeof value === "string") {
    return "String";
  } else {
    return "Number";
  }
};

checkType("Hello");
checkType(42);

// Problem 4
const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key];
};


//sample input
const user = { id: 1, name: "John Doe", age: 21 };
getProperty(user, "name");



// Problem 5
interface Book {
  title: string;
  author: string;
  publishedYear: number;
    
}

const toggleReadStatus = (book: Book) => {
    return {
        ...book,
        isRead: true,
    }
}

// Sample Input:
const myBook = { title: "TypeScript Guide", author: "Jane Doe", publishedYear: 2024 };
toggleReadStatus(myBook)


// Problem 6
class Person{
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name
        this.age = age

    }
}
 
class Student extends Person {
  grade: string;

  constructor(name: string, age: number, grade: string) {
    super(name, age);
    this.grade = grade;
  }

    getDetails(): string {
      return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`
  }
}

// Sample Input:
const student = new Student("Alice", 20, "A");
student.getDetails()
 


// Problem 7
const getIntersection = (array1: number[], array2: number[]): number[] => {
   return array1.filter((num)=> array2.includes(num))
}


getIntersection([1, 2, 3, 4, 5], [3, 4, 5, 6, 7])
