import "reflect-metadata"
import { HelloService } from "./hello.service"

describe("HelloService tests", () => {
    test("HelloService construction", () => {
        const loggerService: HelloService = new HelloService()
        expect(loggerService).toBeDefined()
    })

    test("HelloService greet", () => {
        const helloService: HelloService = new HelloService()
        expect(helloService.greet("User")).toEqual("Hello User")
    })
})
