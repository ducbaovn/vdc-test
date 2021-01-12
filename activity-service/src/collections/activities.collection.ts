export const ActivityCollection = {
  name: "activities",
  schema: {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["method", "url", "userId", "time"],
        properties: {
          resource: {
            bsonType: "string",
            description: "url must be a string and is required",
          },
          method: {
            enum: ["GET", "POST", "PATCH", "PUT", "DELETE"],
            description: "HTTP Method",
          },
          url: {
            bsonType: "string",
            description: "url must be a string and is required",
          },
          userId: {
            bsonType: "string",
            description: "userId must be a string and is required",
          },
          time: {
            bsonType: "date",
            description: "must be a date",
          },
        },
      },
    },
  },
};
