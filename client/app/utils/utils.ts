'use strict';

export function Inject(injectable) {
    return (prototype, method, argumentPosition) => {
        prototype.$inject = prototype.$inject || [];
        prototype.$inject[argumentPosition] = injectable;
    };
}

export default Inject;
