import { Container } from "inversify"
import { buildProviderModule } from "inversify-binding-decorators"

// set up container
const container = new Container()

// import controllers
import "@controllers/hello/hello.controller"

// import services
import "@services/hello/hello.service"

container.load(buildProviderModule())

export { container }
