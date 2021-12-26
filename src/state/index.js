import {createGlobalState} from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
    localUrl: 'localhost:5000',
    serverUrl: 'cmsapplication-env.eba-vunugdq3.eu-central-1.elasticbeanstalk.com',
    url: 'cmsapplication-env.eba-vunugdq3.eu-central-1.elasticbeanstalk.com'
});

export {useGlobalState, setGlobalState};