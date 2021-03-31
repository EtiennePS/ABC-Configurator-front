import AbstractAbcService from "@/services/AbstractAbcService";
import CartLine from "@/models/CartLine";

class CartLineService extends AbstractAbcService {
    constructor() {
        super();
        this.model = CartLine;
        this.entityRoute = "/cartLines"
    }
}

const cartLineService = new CartLineService();
export default cartLineService;