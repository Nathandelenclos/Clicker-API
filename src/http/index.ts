import {Home} from "./Controllers/Home";
import {Auth} from "./Controllers/Auth";
import {Register} from "./Controllers/Register";

export default {
    controllers: [
        new Home(),
        new Auth(),
        new Register(),
    ]
}
