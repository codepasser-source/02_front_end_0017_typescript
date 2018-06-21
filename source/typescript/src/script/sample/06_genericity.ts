export let genericity = function() {

  interface GenericIdentityFn {
    <T>(arg: T): T;
  }

  function identity<T>(arg: T): T {
    return arg;
  }
  let output = identity<string>('string type');
  console.log(output);

  let output1 = identity("myString");  // type of output will be 'string'
  console.log(output1);

  function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
  }

  // 泛型接口
  let myIdentity: { <T>(arg: T): T } = identity;
  let myIdentity1: GenericIdentityFn = identity;

  // 泛型类
  class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
  }
  let myGenericNumber = new GenericNumber<number>();
  myGenericNumber.zeroValue = 0;
  myGenericNumber.add = function(x, y) { return x + y; };

  // 高级例子
  class BeeKeeper {
    hasMask: boolean;
  }

  class ZooKeeper {
    nametag: string;
  }

  class Animal {
    numLegs: number;
  }

  class Bee extends Animal {
    keeper: BeeKeeper;
  }

  class Lion extends Animal {
    keeper: ZooKeeper;
  }

  function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
  }

  //createInstance(Lion).keeper.nametag;  // typechecks!
  //createInstance(Bee).keeper.hasMask;   // typechecks!

}
