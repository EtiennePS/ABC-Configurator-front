import AbstractAbcService from "@/services/AbstractAbcService";
import Item from "@/models/Item";

class ItemService extends AbstractAbcService {
    constructor() {
        super();
        this.model = Item;
        this.entityRoute = "/items"
    }
}

const itemService = new ItemService();
export default itemService;