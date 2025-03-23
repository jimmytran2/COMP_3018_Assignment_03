const response = await fetch("http://localhost:3000/api/v1/branches", {
  method: "GET",
  headers: {},
});
const data = await response.json();
console.log(data);

// const response = await fetch("http://localhost:3000/api/v1/branches", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     id: "123",
//     name: "China",
//     address: "123 Great Wall St",
//     phone: "1234567890",
//   }),
// });
// const data = await response.json();
// console.log(data);
