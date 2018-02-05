import {_helper} from '../api/_helper';

export default () => {
    return _helper.fetchGET(
        '/user/checkAuthenticate',
        {
        }
    )
    .then((response) => {
        if (response) {
            const { data, status } = response;
            if (status == 200) {
                return true;
            }
            else {
                return false;
            }
        }
    })
}

// export {checkAuthenticate}