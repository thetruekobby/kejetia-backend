const swaggerAutogen = require("swagger-autogen")()

const outputFile = "./swagger-output.json" // output file
const endpointsFiles = ["./index.ts"] // API endpoints files array

const doc = {
  info: {
    title: "KEJETIA API",
    description: "Api documentation for Kejetia app API",
  },
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated")
})
