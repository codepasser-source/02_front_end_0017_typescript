
export let enums = function() {

  enum Direction {
    Up = 1,
    Down,
    Left,
    Right
  }

  const enum Directions {
    Up,
    Down,
    Left,
    Right
  }

  let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
  console.log(Direction.Up);
  console.log(directions);

}
