import {Inject} from '../utils/utils';
import R from 'ramda';

const endpoint = 'localhost:3000';

const ResourceFactory = (endpoint, resourcePath) => {
    class Resource {
        constructor (
            $resource
        ) {
            return R.partial($resource, `${endpoint}/${resourcePath}`);
        }
    }

    Resource.$inject = ['$resource'];
    return Resource;
};

export default function (resourcePath) {
    return new ResourceFactory(endpoint, resourcePath);
}
