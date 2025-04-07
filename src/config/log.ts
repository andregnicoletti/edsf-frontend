if (import.meta.env.MODE === "production") {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}
