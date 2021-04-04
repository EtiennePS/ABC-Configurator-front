import AbstractAbcService from "@/services/AbstractAbcService";
import Item from "@/models/Item";

class ItemService extends AbstractAbcService {
    constructor() {
        super();
        this.model = Item;
        this.entityRoute = "/items"
    }

    getById(id, onSuccess, onFail, onDone, options) {
        this.doGet(this.entityRoute + "/id/" + id, onSuccess, onFail, onDone, options);
    }
}

const itemService = new ItemService();
export default itemService;