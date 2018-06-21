export let variable = function() {

    // 当用let声明一个变量，它使用的是词法作用域或块作用域。
    // 不同于使用 var声明的变量那样可以在包含它们的函数外访问，块作用域变量在包含它们的块或for循环之外是不能访问的。
    function f(input: boolean) {
        let a = 100;

        if (input) {
            // Still okay to reference 'a'
            var b = a + 1;
            return b;
        }

        // let Error: 'b' doesn't exist here
        // return b;
    };
    console.log(f(true));

    // const 声明是声明变量的另一种方式。
    // 它们与let声明相似，但是就像它的名字所表达的，它们被赋值后不能再改变。 换句话说，它们拥有与 let相同的作用域规则，但是不能对它们重新赋值。
    const numLivesForCat = 9;
    const kitty = {
        name: "Aurora",
        numLives: numLivesForCat,
    };

    // Error
    //kitty = {
    //    name: "Danielle",
    //    numLives: numLivesForCat
    //};

    // all "okay"
    kitty.name = "Rory";
    kitty.name = "Kitty";
    kitty.name = "Cat";
    kitty.numLives--;

    // 数组解构
    function f1() {
        let input: [number, number];
        input = [1, 2];
        let [first, second] = input;
        console.log(first); // outputs 1
        console.log(second); // outputs 2
        function f2([first, second]: [number, number]) {
            console.log(first);
            console.log(second);
        }
        f2(input);
    };
    f1();

    function f3() {
        let [pre, ...rest] = [1, 2, 3, 4];
        console.log(pre); // outputs 1
        console.log(rest); // outputs [ 2, 3, 4 ]
        let [pre1] = [1, 2, 3, 4];
        console.log(pre1); // outputs 1
    };
    f3();


    // 对象解构
    let o = {
        a: "foo",
        b: 12,
        c: "bar"
    };
    // let { a, b } = o;
    // let { a, ...passthrough } = o;
    // let total = passthrough.b + passthrough.c.length;
    // console.log(a, passthrough, total);
    // 属性重命名
    let { a: a1, b: b1 } = o;
    console.log(a1, b1, o);

    let { a, b }: { a: string, b: number } = o;
    console.log(a, b);

    // 默认值
    // 默认值可以让你在属性为 undefined 时使用缺省值：
    function keepWholeObject(wholeObject: { a: string, b?: number }) {
        let { a, b = 1001 } = wholeObject;
        console.log(wholeObject, a, b);
    }
    keepWholeObject({ a: '1', b: undefined });

    // 函数声明 解构
    type C = { a: string, b?: number }
    function f4({ a, b = 1333 }: C): void {
        console.log(a, b);
    }
    f4({ a: '123' });

    function f5({ a = '123', b = 123 } = { a: "", b: 0 }): void {
        console.log(a, b);
    };
    f5({});
    f5();

    // 展开
    function f6() {
        let first = [1, 2];
        let second = [3, 4];
        let bothPlus = [0, ...first, ...second, 5];
        console.log(bothPlus);
    };
    f6();

    function f7() {
        let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
        let search = { ...defaults, food: "rich" };
        console.log(defaults);
        console.log(search);
    }
    f7();

    function f8() {
        let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
        let search = { food: "rich", ...defaults };
        console.log(defaults);
        console.log(search);
    }
    f8();

    // 对象展开还有其它一些意想不到的限制。 首先，它只包含自身的可枚举的属性。 首先，当你展开一个对象实例时，你会丢失其方法：
    class Student {
        age: number;

        name: string;

        constructor(age: number, name: string) {
            this.age = age;
            this.name = name;
        }

        m() {
        }
    }
    let st = new Student(12, 'tom');
    let clone = { ...st };
    console.log(clone.age, clone.name); // ok
    // console.log(clone.m()); // error!

};
