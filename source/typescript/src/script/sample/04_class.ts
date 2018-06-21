export let classes = function() {


  // 类的基础定义
  class Greeter {
    greeting: string;
    constructor(message: string) {
      this.greeting = message;
    }
    greet() {
      return "Hello, " + this.greeting;
    }
  }
  let greeter = new Greeter("world");

  // 继承
  class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
  }

  class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) { //方法参数声明默认值
      console.log("Slithering...");
      super.move(distanceInMeters);
    }
  }

  class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) { //方法参数声明默认值
      console.log("Galloping...");
      super.move(distanceInMeters);
    }
  }

  let sam = new Snake("Sammy the Python");
  let tom: Animal = new Horse("Tommy the Palomino");

  sam.move();
  tom.move(34);

  // 公共，私有与受保护的修饰符
  // 默认为public
  class Animal1 {
    public name: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
  }
  // 当成员被标记成private时，它就不能在声明它的类的外部访问。比如：
  class Animal2 {
    private name: string;
    constructor(theName: string) { this.name = theName; }
  }
  // new Animal2("Cat").name; // Error: 'name' is private;

  // protected修饰符与private修饰符的行为很相似，但有一点不同，protected成员在派生类中仍然可以访问。例如：
  class Person {
    protected name: string;
    // 构造函数也可以被标记成protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承.
    protected constructor(name: string) { this.name = name; }
  }

  class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
      super(name)
      this.department = department;
    }

    public getElevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
  }

  let howard = new Employee("Howard", "Sales");
  console.log(howard.getElevatorPitch());
  // console.log(howard.name); // error

  // readonly修饰符
  class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor(theName: string) {
      this.name = theName;
    }
  }
  let dad = new Octopus("Man with the 8 strong legs");
  // dad.name = "Man with the 3-piece suit"; // error! name is readonly.

  // 参数属性
  class Animal4 {
    // 构造器加入 private 快速定义成员属性
    constructor(private name: string) {
      this.name = name;
    }
    move(distanceInMeters: number) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
  }
  let animal4 = new Animal4('tom');
  animal4.move(10);

  // 存取器 get/set
  let passcode = "secret passcode";
  class Employee1 {
    private _fullName: string;
    get fullName(): string {
      return this._fullName;
    }
    set fullName(newName: string) {
      if (passcode && passcode == "secret passcode") {
        this._fullName = newName;
      }
      else {
        console.log("Error: Unauthorized update of employee!");
      }
    }
  }

  let employee = new Employee1();
  employee.fullName = "Bob Smith";
  if (employee.fullName) {
    console.log(employee.fullName);
  }

  // 静态属性
  class Grid {
    static origin = { x: 0, y: 0 };
    calculateDistanceFromOrigin(point: { x: number; y: number; }) {
      let xDist = (point.x - Grid.origin.x);
      let yDist = (point.y - Grid.origin.y);
      return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor(public scale: number) { }
  }

  let grid1 = new Grid(1.0);  // 1x scale
  let grid2 = new Grid(5.0);  // 5x scale

  console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
  console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));

  // 抽象类
  // 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 不同于接口，抽象类可以包含成员的实现细节。 abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。
  abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
      console.log('Department name: ' + this.name);
    }

    abstract printMeeting(): void; // 必须在派生类中实现
  }

  class AccountingDepartment extends Department {

    constructor() {
      super('Accounting and Auditing'); // constructors in derived classes must call super()
    }

    printMeeting(): void {
      console.log('The Accounting Department meets each Monday at 10am.');
    }

    generateReports(): void {
      console.log('Generating accounting reports...');
    }
  }

  let department: Department; // ok to create a reference to an abstract type
  // department = new Department(); // error: cannot create an instance of an abstract class
  department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
  department.printName();
  department.printMeeting();
  // department.generateReports(); // error: method doesn't exist on declared abstract type

}
