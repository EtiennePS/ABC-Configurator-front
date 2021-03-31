import AbstractAbcService from "@/services/AbstractAbcService";
import Option from "@/models/Option";

class OptionService extends AbstractAbcService {
    constructor() {
        super();
        this.model = Option;
        this.entityRoute = "/options"
    }
}

const optionService = new OptionService();
export default optionService;