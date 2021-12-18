export default function isIn(id: string, array?: string[]) {
  return array ? array.includes(id) : false;
}
