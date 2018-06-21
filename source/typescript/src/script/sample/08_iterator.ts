export let iterator = function() {

  let someArray = [1, "string", false];

  for (let entry of someArray) {
    console.log(entry); // 1, "string", false
  }


  // for..of和for..in均可迭代一个列表；但是用于迭代的值却不同，for..in迭代的是对象的 键 的列表，而for..of则迭代对象的键对应的值。
  for (let i in someArray) {
    console.log(i); // "0", "1", "2",
  }

  for (let i of someArray) {
    console.log(i); // "4", "5", "6"
  }
}
