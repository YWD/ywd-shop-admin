export const assignObjectValue = (obj1: { [key: string]: any }, obj2: { [key: string]: any }) => {
  for (const key in obj1) {
    if (Reflect.has(obj2, key)) {
      obj1[key] = obj2[key]
    }
  }
}
