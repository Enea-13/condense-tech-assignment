function usingGenerics() {
  function transformArray<T>(array: T[], callback: (value: T) => T): T[] {
    return array.map(callback);
  }

  // test cases
  const numberArray = [1, 2, 3, 4, 5];
  const doubledArray = transformArray(numberArray, (num) => num * 2);
  console.log(doubledArray);

  const stringArray = ["apple", "banana", "cherry"];
  const uppercasedArray = transformArray(stringArray, (str) =>
    str.toUpperCase()
  );
  console.log(uppercasedArray);
}

usingGenerics();
