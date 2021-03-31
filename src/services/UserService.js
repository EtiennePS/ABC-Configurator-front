import AbstractAbcService from "@/services/AbstractAbcService";
import User from "@/models/user";

class UserService extends AbstractAbcService {
    constructor() {
        super();
        this.model = User;
        this.entityRoute = "/users"
    }

    create(data, onSuccess, onFail, onDone, options) {
        this.doPost(data, this.entityRoute + "/register", onSuccess, onFail, onDone, options);
    }

    authenticate(data, onSuccess, onFail, onDone, options) {
        this.doPost(data, this.entityRoute + "/authenticate", onSuccess, onFail, onDone, options);
    }

    getById(id, onSuccess, onFail, onDone, options) {
        this.doGet(this.entityRoute + "/id/" + id, onSuccess, onFail, onDone, options);
    }

    getByName(name, onSuccess, onFail, onDone, options) {
        this.doGet(this.entityRoute + "/name/" + name, onSuccess, onFail, onDone, options);
    }
}

const userService = new UserService();
export default userService;