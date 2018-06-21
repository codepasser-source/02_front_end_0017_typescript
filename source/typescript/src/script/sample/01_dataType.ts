
import { sayHello } from "./00_helloWorld";

export let types = function() {
  // 你可能已经注意到了，我们使用let关键字来代替大家所熟悉的JavaScript关键字var。
  // let关键字是JavaScript的一个新概念，TypeScript实现了它。 我们会在以后详细介绍它，
  // 很多常见的问题都可以通过使用 let来解决，所以尽可能地使用let来代替var吧。

  let isDone: boolean = false;
  let decLiteral: number = 6;
  let hexLiteral: number = 0xf00d;
  let binaryLiteral: number = 0b1010;
  let octalLiteral: number = 0o744;
  let name: string = 'smith';
  let age: number = 20;

  let sentence: string = `Hello, my name is ${name}.
    I'll be ${age + 1} years old next month.`

  let array: number[] = [1, 2, 3];
  let list: Array<number> = [1, 2, 3];

  console.log(typeof isDone, isDone);
  console.log(typeof decLiteral, decLiteral);
  console.log(typeof hexLiteral, hexLiteral);
  console.log(typeof binaryLiteral, binaryLiteral);
  console.log(typeof octalLiteral, octalLiteral);
  console.log(typeof name, name);
  console.log(sentence);
  console.log(typeof array, array);
  console.log(typeof list, list);

  // Declare a tuple type
  let tuple: [string, number];
  // Initialize it
  tuple = ['hello', 10]; // OK
  // Initialize it incorrectly
  // x = [10, 'hello']; // Error
  console.log(typeof tuple, tuple);
  console.log(tuple[0].substr(1)); // OK
  tuple[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
  console.log(tuple[3].toString()); // OK, 'string' 和 'number' 都有 toString
  //tuple[6] = true; // Error, 布尔不是(string | number)类型

  // 默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从 1开始编号：
  enum Color { Red = 1, Green, Blue }
  let color: Color = Color.Green;
  let colorName: string = Color[2];
  console.log(typeof color, color, colorName);

  // 有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。
  let notSure: any = 4;
  // notSure.ifItExists(); // okay, ifItExists might exist at runtime
  notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)
  // let prettySure: Object = 4;
  // prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.

  let anyArray: any[] = [1, true, "free"];
  anyArray[1] = 100;
  console.log(typeof anyArray, anyArray);

  function warnUser(): void {
    alert("This is my warning message");
  }

  let unusable: void = undefined;
  // unusable = null;
  console.log(typeof unusable, unusable);

  // 返回never的函数必须存在无法达到的终点
  function error(message: string): never {
    throw new Error(message);
  }
  // 推断的返回值类型为never
  function fail() {
    return error("Something failed");
  }

  // 返回never的函数必须存在无法达到的终点
  function infiniteLoop(): never {
    while (true) {
    }
  }

  // 类型断言
  let someValue: any = "this is a string";
  let strLength: number = (<string>someValue).length;


  sayHello("123");
};
