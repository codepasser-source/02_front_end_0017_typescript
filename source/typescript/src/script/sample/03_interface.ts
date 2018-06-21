export let interfaces = function() {

  // 接口定义
  interface Person {
    name: string;
    age: number;

  }
  function printPerson(person: Person) {
    console.log(person.name, person.age);
  }

  let student = { name: 'tom', age: 12, class: 'l_2_1' }
  printPerson(student);

  // 可选属性
  interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any; // 索引签名
  }

  function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: "white", area: 100 };
    if (config.color) {
      // Error: Property 'clor' does not exist on type 'SquareConfig'
      //newSquare.color = config.clor;
      newSquare.color = config.color;
    }
    if (config.width) {
      newSquare.area = config.width * config.width;
    }
    return newSquare;
  }

  console.log(createSquare({ color: "black" }));

  // 注意传入createSquare的参数拼写为colour而不是color。 在JavaScript里，这会默默地失败。
  console.log(createSquare({ colour: "black" })); // 额外的属性检查, 索引签名后不会检查
  console.log(createSquare({ width: 100, opacity: 0.5 } as SquareConfig)); // 跳过检查的方式

  // 只读属性
  interface Point {
    readonly x: number;
    readonly y: number;
  }
  let p1: Point = { x: 10, y: 20 };
  // p1.x = 5; // error!

  // TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：

  function readOnly() {
    let a: number[] = [1, 2, 3, 4];
    let ro: ReadonlyArray<number> = a;
    // ro[0] = 12; // error!
    // ro.push(5); // error!
    // ro.length = 100; // error!
    // a = ro; // error ReadonlyArray赋值到一个普通数组也是不可以的
    a = ro as number[]; // 断言重写

  }

  // readonly vs const
  // 最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 const，若做为属性则使用readonly。

  // 函数类型
  interface SearchFunc {
    (source: string, subString: string): boolean;
  }
  let mySearch: SearchFunc;
  // 函数的参数名不需要与接口里定义的名字相匹配
  mySearch = function(src: string, sub: string): boolean {
    let result = src.search(sub);
    return result > -1;
  }
  // 函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的。 如果你不想指定类型，TypeScript的类型系统会推断出参数类型，因为函数直接赋值给了 SearchFunc类型变量。 函数的返回值类型是通过其返回值推断出来的（此例是 false和true）。 如果让这个函数返回数字或字符串，类型检查器会警告我们函数的返回值类型与 SearchFunc接口中的定义不匹配。
  mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
  }
  console.log(mySearch('123', '23'));


  // 索引签名
  interface StringArray {
    [index: number]: string;
  }

  let myArray: StringArray;
  myArray = ["Bob", "Fred"];
  let myStr: string = myArray[0];
  console.log(myStr);

  // 共有支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。 这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。 也就是说用 100（一个number）去索引等同于使用"100"（一个string）去索引，因此两者需要保持一致。
  class Animal {
    name: string;
  }
  class Dog extends Animal {
    breed: string;
  }

  // Error: indexing with a 'string' will sometimes get you a Dog!
  interface NotOkay {
    // [x: number]: Animal; // // Error: indexing with a 'string' will sometimes get you a Dog!
    [x: string]: Dog;
  }
  let animal1: NotOkay = { dog: { name: 'tom', breed: '123' } };
  console.log(animal1);

  // 你可以将索引签名设置为只读，这样就防止了给索引赋值：
  interface ReadonlyStringArray {
    readonly [index: number]: string;
  }
  let myArray1: ReadonlyStringArray = ["Alice", "Bob"];
  // myArray1[2] = "Mallory"; // error!


  // 接口方法实现
  interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
  }
  class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
      this.currentTime = d;
    }
    constructor(h: number, m: number) {
      this.currentTime = new Date();
    }
  }
  let clock: Clock;
  clock = new Clock(8, 10);
  console.log(clock);
  clock.setTime(new Date())
  console.log(clock);

  // 类静态部分与实例部分的区别
  interface ClockConstructor {
    new(hour: number, minute: number): ClockInterface;
  }
  class DigitalClock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
      this.currentTime = d;
    }
    constructor(h: number, m: number) {
      this.currentTime = new Date();
    }
  }
  class AnalogClock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
      this.currentTime = d;
    }
    constructor(h: number, m: number) {
      this.currentTime = new Date();
    }
  }

  // 继承接口
  interface Shape {
    color: string;
  }
  interface PenStroke {
    penWidth: number;
  }
  // 接口可以继承多个
  interface Square extends Shape, PenStroke {
    sideLength: number;
  }

  let square = <Square>{};
  square.color = "blue";
  square.sideLength = 10;
  square.penWidth = 5.0;
  console.log(square);

  // 混合类型
  //先前我们提过，接口能够描述JavaScript里丰富的类型。 因为JavaScript其动态灵活的特点，有时你会希望一个对象可以同时具有上面提到的多种类型。
  interface Counter {
    (start: number): string; // 方法参数声明
    interval: number;
    reset(): void; // 方法定义
  }

  function getCounter(): Counter {
    let counter = <Counter>function(start: number) { };
    counter.interval = 123;
    counter.reset = function() { };
    return counter;
  }

  let c = getCounter();
  c(10);
  c.reset();
  c.interval = 5.0;
  console.log(c);

  // 接口继承类
  class Control {
    private state: any;
  }

  interface SelectableControl extends Control {
    select(): void;
  }

  class Button extends Control {
    select() {

    }
  }

  class TextBox extends Control {
    select() { }
  }

  class Image {
    select() { }
  }

  class Location {
    select() { }
  }

  let btn: Button = new Button();
  btn.select();
}
