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



