// Problem 1 
const filterEvenNumbers = (numbers: number[]): number[] => {

    return numbers.filter((num) => num % 2 === 0);
    
};


// Problem 2
const reverseString = (text: string): string => {

    return text.split("").reverse().join("");
};


// Problem 3
type StringOrNumber = string | number;

const checkType = (value: StringOrNumber): string => {
    if (typeof value === 'string') {
        return "String";
    }
    else {
        return "Number";
    }
        
}


// Problem 4
const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => {
    return obj[key];
}

//sample input
const user = {
    id: 1, 
    name: 'John Doe',
    age:21,
}

const userName = getProperty(user, 'name')


