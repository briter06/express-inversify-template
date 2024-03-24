import "reflect-metadata"
import { createRequest, createResponse } from "node-mocks-http"
import { HelloController } from "./hello.controller"
import { HelloService } from "@services/hello/hello.service"

describe("HelloController", () => {
    let helloController: HelloController

    beforeEach(() => {
        helloController = new HelloController(new HelloService())
    })

    test("Test greet", async () => {
        const request = createRequest({
            body: {
                name: "User",
            },
        })
        const response = createResponse()
        const result = await helloController.greet(
            request,
            response,
            () => ({})
        )
        expect(result.data).toBeDefined()
        expect(result.data).toEqual("Hello User")
    })
})
