import { get, put} from '../technique/api';

export default {
    getAll : async (url) => await get(url),
}
