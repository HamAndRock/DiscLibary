import {Container} from "inversify";
import "reflect-metadata";
import getDecorators from "inversify-inject-decorators";
import {ObjectService} from "../src/_services/object.service";
import {DiskManager} from "@/managers/disk.manager";

const container = new Container();

container.bind<ObjectService>(ObjectService).toSelf();
container.bind<DiskManager>(DiskManager).toSelf();

const {lazyInject} = getDecorators(container);

export {container, lazyInject}
