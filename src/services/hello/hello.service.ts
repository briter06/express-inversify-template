import { TYPE } from "@config/ioc/types"
import { IHelloService } from "."
import { provide } from "inversify-binding-decorators"

@provide(TYPE.IHelloService)
export class HelloService implements IHelloService {
    public greet(name: string) {
        return `Hello ${name}`
    }
}
