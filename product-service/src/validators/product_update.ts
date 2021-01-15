export const updateProductSchema = {
  id: "/updateProduct",
  type: "object",
  properties: {
    id: { type: "string"},
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
  }
}