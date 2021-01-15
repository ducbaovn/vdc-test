export const createProductSchema = {
  id: "/createProduct",
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1
    },
    price: {
      type: "integer",
      minimum: 0
    },
    brand: {"type": "string"},
    color: {"type": "string"},
    description: {"type": "string"}
  },
  required: ["name", "price"]
}